import { getApartmentData } from "../apartment/apartmentData";
import { geocodeApi } from "./geocodeApi";
import { getCachedGeocodeData, setGeocodeCache } from "./geocodeCache";
import { DEFAULT_STRING_VALUE } from "../../constants";
import type { IApartmentItem, IApartmentLocation, IGeocodeData, ILocationData } from "@/src/commons/types";

// 아파트 데이터를 가공하여 필요한 항목을 추출하고 반환하는 함수
// - 법정동, 도로명, 건물명, 거래금액 등과 같은 정보를 하나의 객체로 반환합니다.
const mapToItemData = (item: IApartmentItem): ILocationData => {
  return {
    address: `${item.estateAgentSggNm} ${item.umdNm} ${item.jibun}`,
    // address_road: `${location} ${item.도로명 ?? DEFAULT_STRING_VALUE.trim()} ${Number(item.도로명건물본번호코드).toString()}${roadSubCode}`,
    buildingName: item.aptNm,
    price: Number(item.dealAmount?.replace(/,/g, "")),
    area: item.excluUseAr,
    floor: item.floor,
    dealYear: item.dealYear,
    dealMonth: item.dealMonth,
    dealDay: item.dealDay,
    buildYear: item.buildYear,
  };
};

// 캐시를 확인한 후 지오코딩을 수행하는 함수
// - 캐시가 있을 경우 해당 데이터를 반환하고, 없으면 API 요청 후 결과를 캐싱합니다.
const getGeocodeData = async (address: string): Promise<IGeocodeData | null> => {
  const cacheKey = `geocode_${address}`;
  const cachedData = getCachedGeocodeData(cacheKey);

  if (cachedData !== undefined) {
    // console.log(`주소 ${itemDatas.address}에 대한 지오코딩 데이터 캐시 히트`);
    return cachedData;
  }

  try {
    const geocodeResult = await geocodeApi(address ?? DEFAULT_STRING_VALUE);
    if (geocodeResult !== null) {
      const result = {
        latitude: geocodeResult.latitude,
        longitude: geocodeResult.longitude,
      };

      setGeocodeCache(cacheKey, result);
      return result;
    } else {
      console.log(`allGeocodeData: 주소 ${address}에 대한 지오코딩 결과 없음`);
      return null;
    }
  } catch (error) {
    console.error(`Error geocoding address ${address}:`, error);
    return null;
  }
};

// 전체 지오코딩 데이터를 가져오는 메인 함수
// - 지정된 건물 유형의 데이터를 가져와 지오코딩하고, 중복 데이터를 제거합니다.
export const getAllGeocodeData = async (buildingType: string): Promise<IGeocodeData[]> => {
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
      const items: IApartmentItem[] = result?.response?.response?.body?.items?.item ?? [];
      console.log("items === ", items);
      return items.map(async (item) => {
        const itemData = mapToItemData(item);
        // console.log("itemData === ", itemData);
        const geocodeResult = await getGeocodeData(itemData.address ?? "");
        return {
          ...geocodeResult,
          ...itemData,
        };
      });
    }) ?? [];

  // 모든 지오코딩 요청 완료 후 null 값을 제외한 유효한 데이터 필터링
  const processedGeocodeData = (await Promise.all(geocodePromises)).filter((result) => result !== null);

  // // 중복된 주소와 면적, 층 정보를 가진 항목을 제거하여 고유한 데이터만 남김
  // const uniqueGeocodeResults = geocodeResults.filter((result, index, self) => {
  //   if (result === null) {
  //     return false;
  //   }
  //   const key = `${result.address}_${result.area}_${result.floor}`;
  //   // 같은 주소와 면적과 층을 가진 데이터 중 첫 번째 데이터만 유지합니다
  //   return index === self.findIndex((t) => t !== null && `${t.address}_${t.area}_${t.floor}` === key);
  // });

  return processedGeocodeData;
};
