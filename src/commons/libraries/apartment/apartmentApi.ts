import axios from "axios";
import { getCurrentDate } from "@/src/commons/libraries/utils/currentDate";
import type { IApartment, IApartmentItem } from "@/src/commons/types";
import type { AxiosResponse } from "axios";
import { DEFAULT_NUMBER_VALUE } from "../../constants";

// import pLimit from "p-limit";
// const limit = pLimit(100);

const API_KEY = process.env.NEXT_PUBLIC_GOVERNMENT_PUBLIC_DATA;

const fieldsToExclude = ["cdealDay", "cdealType", "landLeaseholdGbn", "sggCd"]; // 제외할 필드들

export const apartmentApi = async (regionCode: string): Promise<IApartmentItem[]> => {
  const currentDate = getCurrentDate();
  // 캐시에 없는 경우 실제 데이터를 요청합니다
  const apiUrl = `https://apis.data.go.kr/1613000/RTMSDataSvcAptTrade/getRTMSDataSvcAptTrade?serviceKey=${API_KEY}&LAWD_CD=${regionCode}&DEAL_YMD=${currentDate}`;
  const numOfRows = 100;

  try {
    const initialResponse = await axios.get<IApartment | undefined>(`${apiUrl}&pageNo=1&numOfRows=${numOfRows}`);
    const totalCount = initialResponse.data?.response?.body?.totalCount ?? NaN;

    if (totalCount === undefined) {
      throw new Error("totalCount 값을 가져올 수 없습니다.");
    }

    // // 총 페이지 수 계산
    const totalPages = Math.max(1, Math.ceil(totalCount / numOfRows));

    const request: Array<Promise<AxiosResponse<IApartment | undefined>>> = [];
    for (let pageNo = 1; pageNo <= totalPages; pageNo++) {
      const apartmentUrl = `${apiUrl}&pageNo=${pageNo}&numOfRows=${numOfRows}`;

      // request.push(limit(() => axios.get<IApartment | undefined>(apartmentUrl))); // limit으로 요청 제한
      request.push(axios.get<IApartment | undefined>(apartmentUrl)); // limit으로 요청 제한
    }

    const responses = await Promise.all(request);

    const aptItemArray: IApartmentItem[] = [];
    responses.forEach((response) => {
      // item 값이 단일로 있는 경우 배열이 아닌데, 이때 배열로 처리하여 forEach문이 돌아가게 한다.

      const itemRaw = response.data?.response?.body?.items?.item ?? [];
      const item = Array.isArray(itemRaw) ? itemRaw : [itemRaw];

      item?.forEach((el) => {
        // estateAgentSggNm 2개 이상 일 때, 필터링
        if (el?.estateAgentSggNm?.includes(",") === true) {
          const filteredSggNm = el.estateAgentSggNm.split(",").slice(1).join(",").trim();
          return filteredSggNm;
        }

        // 필터링해야 할 특정 값들 제외하기
        const filteredEl: Partial<IApartmentItem> = {};
        Object.keys(el).forEach((key) => {
          if (!fieldsToExclude.includes(key)) {
            filteredEl[key] = el[key];
          }
        });

        // 값이 비어있지 않은 경우에만 추가
        if (el?.estateAgentSggNm !== " " || el.estateAgentSggNm != null) {
          aptItemArray.push(filteredEl);
        }
      });
    });

    // 최신 데이터만 필터링
    const latestData = getLatestData(aptItemArray);

    return latestData;
  } catch (error) {
    console.error("API 요청 중 오류 발생:", error);
    throw new Error("아파트 API 로딩 실패");
  }
};

const getLatestData = (items: IApartmentItem[]): IApartmentItem[] => {
  const grouped: Record<string, IApartmentItem> = {};
  // const discardedItems: IApartmentItem[] = []; // 버려진 항목을 추적할 배열

  items.forEach((item) => {
    const key = `${item.umdNm}_${item.jibun}_${item.aptNm}`; // 동, 지번, 아파트명 기준으로 그룹화
    if (grouped[key] == null) {
      grouped[key] = item;
    } else {
      const existingItem = grouped[key];

      const isNewer =
        // 연도 비교
        (item.dealYear ?? DEFAULT_NUMBER_VALUE) > (existingItem.dealYear ?? DEFAULT_NUMBER_VALUE) ||
        // 연도가 같고, 월 비교
        (item.dealYear === existingItem.dealYear && (item.dealMonth ?? DEFAULT_NUMBER_VALUE) > (existingItem.dealMonth ?? DEFAULT_NUMBER_VALUE)) ||
        // 연도, 월이 같고, 날 비교
        (item.dealYear === existingItem.dealYear && item.dealMonth === existingItem.dealMonth && (item.dealDay ?? DEFAULT_NUMBER_VALUE) > (existingItem.dealDay ?? DEFAULT_NUMBER_VALUE));

      if (isNewer) {
        grouped[key] = item;
      }
    }
  });

  return Object.values(grouped);
};
