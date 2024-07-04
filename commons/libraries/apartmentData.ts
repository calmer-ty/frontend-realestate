import { regionAllData } from "./regionData"; // regionAllData 함수를 가져옵니다

export const apartmentData = async (): Promise<any> => {
  // regionAllData 함수를 사용하여 모든 지역 데이터를 가져옵니다
  try {
    const regionResults = await regionAllData(); // regionAllData 함수 호출 및 결과를 기다립니다
    regionResults.forEach((result) => {
      console.log("apartmentData의 각각 result :", result); // 각 지역 데이터에 대한 로깅
    });
    console.log("여기서 아파트 로직 모두 짜기"); // 아파트 데이터에 대한 로직을 구현할 예정임을 로깅합니다
    return regionResults; // 모든 지역 데이터 배열을 반환합니다
  } catch (error) {
    console.error(`지역 데이터를 가져오는 중 에러 발생:`, error); // 지역 데이터를 가져오는 과정에서 발생한 에러를 콘솔에 로깅합니다
  }
};
