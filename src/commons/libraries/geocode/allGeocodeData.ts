import { getApartmentData } from "../apartment/apartmentData";
import { geocodeApi } from "./geocodeApi";
import { getCachedGeocodeData, setGeocodeCache } from "./geocodeCache";
import { DEFAULT_STRING_VALUE } from "../utils/constants";
import type { IApartmentItem, IApartmentLocation, IGeocodeEtc } from "@/src/commons/types";

// TYPE
interface ICreateItemData {
  address: string;
  address_road: string;
  buildingName: string | undefined;
  price: number;
  area: number | undefined;
  floor: number | undefined;
  dealYear: string | undefined;
  dealMonth: string | undefined;
  dealDay: string | undefined;
  constructionYear: number | undefined;
}

// 숫자를 필터링하여 문자열로 반환하는 함수
// - code가 0이 아닌 경우 prefix와 함께 문자열로 반환합니다.
const filterCode = (code: number, prefix = ""): string => {
  return code !== 0 ? `${prefix}${code.toString()}` : "";
};

// 아파트 데이터를 가공하여 필요한 항목을 추출하고 반환하는 함수
// - 법정동, 도로명, 건물명, 거래금액 등과 같은 정보를 하나의 객체로 반환합니다.
const createItemData = (item: IApartmentItem, location: string): ICreateItemData => {
  const dongMainCode = filterCode(Number(item.법정동본번코드));
  const dongSubCode = filterCode(Number(item.법정동부번코드), "-");
  const roadSubCode = filterCode(Number(item.도로명건물부번호코드), "-");

  return {
    address: `${location} ${item.법정동 ?? DEFAULT_STRING_VALUE.trim()} ${dongMainCode}${dongSubCode}`,
    address_road: `${location} ${item.도로명 ?? DEFAULT_STRING_VALUE.trim()} ${Number(item.도로명건물본번호코드).toString()}${roadSubCode}`,
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

// 캐시를 확인한 후 지오코딩을 수행하는 함수
// - 캐시가 있을 경우 해당 데이터를 반환하고, 없으면 API 요청 후 결과를 캐싱합니다.
const getGeocodeData = async (itemData: IGeocodeEtc): Promise<IGeocodeEtc | null> => {
  const cacheKey = `geocode_${itemData.address}`;
  const cachedData = getCachedGeocodeData(cacheKey);

  if (cachedData !== undefined) {
    // console.log(`주소 ${itemDatas.address}에 대한 지오코딩 데이터 캐시 히트`);
    return cachedData;
  }

  try {
    const geocodeResult = await geocodeApi(itemData.address ?? DEFAULT_STRING_VALUE);
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

// 전체 지오코딩 데이터를 가져오는 메인 함수
// - 지정된 건물 유형의 데이터를 가져와 지오코딩하고, 중복 데이터를 제거합니다.
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

  // 각 아파트 항목을 지오코딩하여 데이터를 생성하는 작업을 비동기적으로 수행
  const geocodePromises =
    results?.flatMap((result) => {
      const dataItems: IApartmentItem[] = result?.response?.response?.body?.items?.item ?? [];
      return dataItems.map(async (item) => {
        const itemData = createItemData(item, result.locatadd_nm ?? DEFAULT_STRING_VALUE);
        return await getGeocodeData(itemData);
      });
    }) ?? [];

  // 모든 지오코딩 요청 완료 후 null 값을 제외한 유효한 데이터 필터링
  const geocodeResults = (await Promise.all(geocodePromises)).filter((result): result is IGeocodeEtc => result !== null);

  // 중복된 주소와 면적, 층 정보를 가진 항목을 제거하여 고유한 데이터만 남김
  const uniqueGeocodeResults = geocodeResults.filter((result, index, self) => {
    if (result === null) {
      return false;
    }
    const key = `${result.address}_${result.area}_${result.floor}`;
    // 같은 주소와 면적과 층을 가진 데이터 중 첫 번째 데이터만 유지합니다
    return index === self.findIndex((t) => t !== null && `${t.address}_${t.area}_${t.floor}` === key);
  });

  return uniqueGeocodeResults;
};
