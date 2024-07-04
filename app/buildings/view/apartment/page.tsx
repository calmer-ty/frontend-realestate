"use client";

import axios from "axios";
import { useEffect } from "react";

export default function ApartmentPage(): JSX.Element {
  useEffect(() => {
    // 페이지가 로드될 때 데이터를 가져오는 함수를 정의합니다
    const fetchData = async (): Promise<void> => {
      try {
        // API 엔드포인트로부터 아파트 데이터를 비동기적으로 가져옵니다
        const response = await axios.get<any>("/api/fetchApartment");
        console.log("Fetched region data:", response.data); // 가져온 데이터를 콘솔에 로깅합니다
      } catch (error) {
        console.error("Error fetching data:", error); // 데이터 가져오기 실패 시 에러를 콘솔에 로깅합니다
      }
    };
    void fetchData(); // fetchData 함수를 호출하고 반환 값을 무시합니다 (Promise<void>를 처리하기 위함)
  }, []); // useEffect의 두 번째 매개변수는 의존성 배열로, 빈 배열을 넘겨 페이지가 로드될 때 한 번만 실행됩니다
  return <>ApartmentPage</>;
}
