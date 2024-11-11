import { getApartmentData } from "../apartment/apartmentData";
import { geocodeApi } from "./geocodeApi";
import { getCachedGeocodeData, setGeocodeCache } from "./geocodeCache";
import type { IApartmentItem, IApartmentLocation, IGeocodeEtc } from "@/src/commons/types";

// 숫자를 필터링하여 문자열로 반환하는 함수
const filterCode = (code: number, prefix = ""): string => {
  return code !== 0 ? `${prefix}${code.toString()}` : "";
};

// item에서 필요한 데이터를 추출하여 객체로 반환하는 함수
const createItemData = (item: IApartmentItem, location: string) => {
  const dongMainCode = filterCode(Number(item.법정동본번코드));
  const dongSubCode = filterCode(Number(item.법정동부번코드), "-");
  const roadSubCode = filterCode(Number(item.도로명건물부번호코드), "-");

  return {
    address: `${location} ${item.법정동 ?? "값 없음".trim()} ${dongMainCode}${dongSubCode}`,
    address_road: `${location} ${item.도로명 ?? "값 없음".trim()} ${Number(item.도로명건물본번호코드).toString()}${roadSubCode}`,
    buildingName: item.아파트,
    price: Number(item.거래금액?.replace(/,/g, "")),
    area: item.전용면적,
    floor: item.층,
    dealYear: item.년,
    dealMonth: item.월,
    dealDay: item.일,
    constructionYear: item.건축년도,
  };
};

// 캐시 확인 후 지오코딩을 수행하는 함수
const getGeocodeData = async (itemData: IGeocodeEtc): Promise<IGeocodeEtc | null> => {
  const cacheKey = `geocode_${itemData.address}`;
  const cachedData = getCachedGeocodeData(cacheKey);

  if (cachedData !== undefined) {
    // console.log(`주소 ${itemDatas.address}에 대한 지오코딩 데이터 캐시 히트`);
    return cachedData;
  }

  try {
    const geocodeResult = await geocodeApi(itemData.address ?? "값 없음");
    if (geocodeResult !== null) {
      const result = {
        ...itemData,
        latitude: geocodeResult.latitude,
        longitude: geocodeResult.longitude,
      };

      setGeocodeCache(cacheKey, result);
      return result;
    } else {
      console.log(`allGeocodeData: 주소 ${itemData.address}에 대한 지오코딩 결과 없음`);
      return null;
    }
  } catch (error) {
    console.error(`Error geocoding address ${itemData.address}:`, error);
    return null;
  }
};

// 메인 함수
export const getAllGeocodeData = async (buildingType: string): Promise<IGeocodeEtc[]> => {
  let results: IApartmentLocation[];

  switch (buildingType) {
    case "apartment":
      results = await getApartmentData();
      break;
    // 다른 buildingType에 대한 분기 추가 가능
    default:
      console.error("Unsupported building type:", buildingType);
      return [];
  }

  const geocodePromises =
    results?.flatMap((result) => {
      const dataItems: IApartmentItem[] = result?.response?.response?.body?.items?.item ?? [];

      return dataItems.map(async (item) => {
        const itemData = createItemData(item, result.locatadd_nm ?? "값 없음");
        return await getGeocodeData(itemData);
      });
    }) ?? [];

  // const geocodeResults = (await Promise.all(geocodePromises)).filter((result): result is IGeocodeEtc => result !== null);
  // 주소와 면적이 같은 경우 중복을 제거하고 하나만 선택합니다
  // const uniqueGeocodeResults = geocodeResults.filter((result, index, self) => {
  //   if (result === null) {
  //     return false;
  //   }
  //   const key = `${result.address}_${result.area}_${result.floor}`;
  //   // 같은 주소와 면적과 층을 가진 데이터 중 첫 번째 데이터만 유지합니다
  //   return index === self.findIndex((t) => t !== null && `${t.address}_${t.area}_${t.floor}` === key);
  // });

  return uniqueGeocodeResults;
};
