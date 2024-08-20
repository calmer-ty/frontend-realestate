"use client"; // 이 파일이 클라이언트 컴포넌트임을 명시합니다

import axios from "axios"; // axios HTTP 클라이언트를 가져옵니다
import { useEffect } from "react"; // React의 useEffect 훅을 가져옵니다

export default function TestPage(): JSX.Element {
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

  return <div>Check the console for region data.</div>; // 화면에 표시할 JSX 요소입니다
}
