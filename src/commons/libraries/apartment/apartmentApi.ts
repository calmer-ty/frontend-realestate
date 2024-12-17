import axios from "axios";
import { getCurrentDate } from "@/src/commons/libraries/utils/currentDate";
import type { IApartment, IApartmentItem } from "@/src/commons/types";
import type { AxiosResponse } from "axios";

import pLimit from "p-limit";
const limit = pLimit(10);

// interface GroupedData {
//   [key: string]: IApartmentItem[]; // IApartmentItem[] 타입의 배열을 값으로 가지는 객체
// }

const API_KEY = process.env.NEXT_PUBLIC_GOVERNMENT_PUBLIC_DATA;

export const apartmentApi = async (regionCode: string): Promise<IApartmentItem[]> => {
  const currentDate = getCurrentDate();
  // 캐시에 없는 경우 실제 데이터를 요청합니다
  // const apiUrlBak = `https://apis.data.go.kr/1613000/RTMSDataSvcAptTrade/getRTMSDataSvcAptTrade?serviceKey=${API_KEY}&LAWD_CD=${regionCode}&DEAL_YMD=${currentDate}&pageNo=1&numOfRows=10`;
  const apiUrl = `https://apis.data.go.kr/1613000/RTMSDataSvcAptTrade/getRTMSDataSvcAptTrade?serviceKey=${API_KEY}&LAWD_CD=${regionCode}&DEAL_YMD=${currentDate}`;
  const numOfRows = 10;

  try {
    const initialResponse = await axios.get<IApartment>(`${apiUrl}&pageNo=1&numOfRows=${numOfRows}`);
    // // console.log("initialResponse === ", initialResponse.data.response?.body?.totalCount);
    const totalCount = initialResponse.data.response?.body?.totalCount;
    if (totalCount === undefined) {
      console.log("totalCount === ", totalCount);
      throw new Error("totalCount 값을 가져올 수 없습니다.");
    }

    // // 총 페이지 수 계산
    const totalPages = Math.ceil(totalCount / numOfRows);

    const request: Array<Promise<AxiosResponse<IApartment>>> = [];
    for (let pageNo = 1; pageNo <= totalPages; pageNo++) {
      const apartmentUrl = `${apiUrl}&pageNo=${pageNo}&numOfRows=${numOfRows}`;

      request.push(limit(() => axios.get<IApartment>(apartmentUrl))); // limit으로 요청 제한
    }

    // console.log("request === ", request);
    const aptItemArray: IApartmentItem[] = [];

    const responses = await Promise.all(request);
    responses.forEach((response) => {
      const items = response.data.response?.body?.items?.item ?? [];

      // items가 배열이 아닌 경우 처리
      if (!Array.isArray(items)) {
        console.error("items는 배열이 아닙니다:", items);
        return; // 배열이 아니면 반복문을 종료하고 다음 응답으로 넘어갑니다.
      }

      items.forEach((item) => {
        // 값이 비어있지 않은 경우에만 추가
        if (item.estateAgentSggNm !== " " || item.estateAgentSggNm != null) {
          aptItemArray.push(item);
        }
      });
    });
    // console.log("aptItemArray === ", aptItemArray);
    // return aptItemArray;
    // const filteredItems = getLatestAptData(aptItemArray);
    // console.log("filteredItems === ", filteredItems);

    // const response = await axios.get<IApartment>(apiUrlBak);
    // const dataItem = response.data.response?.body?.items?.item ?? [];
    // return dataItem;
  } catch (error) {
    console.error("API 요청 중 오류 발생:", error);
    throw new Error("아파트 API 로딩 실패");
  }
};

// const getLatestAptData = (items: IApartmentItem[]): IApartmentItem[] => {
//   const grouped: Record<string, IApartmentItem> = {};
//   const discardedItems: IApartmentItem[] = []; // 버려진 항목을 추적할 배열

//   items.forEach((item) => {
//     const key = `${item.umdNm}_${item.jibun}_${item.aptNm}`; // 동, 지번, 아파트명 기준으로 그룹화
//     if (grouped[key] == null) {
//       grouped[key] = item;
//     } else {
//       // rgstDate 값을 '24.11.21' -> '241121' 형식으로 변환
//       const formatDateToNumber = (dateStr: string): number => {
//         return parseInt(dateStr.replace(/\./g, ""), 10); // '.'을 제거하고 숫자로 변환
//       };
//       const currentRgstDateNumber = formatDateToNumber(grouped[key].rgstDate ?? "");
//       const newRgstDateNumber = formatDateToNumber(item.rgstDate ?? "");

//       if (newRgstDateNumber > currentRgstDateNumber) {
//         discardedItems.push(grouped[key]); // 버려진 데이터 기록
//         grouped[key] = item; // 최신 데이터를 업데이트
//       } else {
//         discardedItems.push(item); // 최신 데이터가 아니면 버려진 데이터로 처리
//       }
//     }
//   });

//   console.log("버려진 데이터:", discardedItems); // 버려진 데이터 출력

//   return Object.values(grouped);
// };
