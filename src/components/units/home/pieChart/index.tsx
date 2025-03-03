// import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

// import * as S from "./styles";
// import { useCallback, useEffect, useState } from "react";
// import type { IGeocodeData } from "@/src/commons/types";
// import axios from "axios";
// import { REGION_DATA } from "@/src/commons/constants/regionData";

// const data = [
//   { name: "아파트", value: 10 },
//   { name: "오피스텔", value: 6 },
//   { name: "빌라", value: 3 },
// ];

// const COLORS = ["#ff6b6b", "#4ecdc4", "#1a535c"];

// export default function PieChartComponent(): JSX.Element {
//   const [allGeocodeData, setAllGeocodeData] = useState<IGeocodeData[]>([]);
//   const [allGeocodeDataLoading, setAllGeocodeDataLoading] = useState<boolean>(true);
//   const [allGeocodeDataError, setAllGeocodeDataError] = useState<string | null>(null);

//   const fetchAllGeocodeData = useCallback(
//     async () => {
//       setAllGeocodeDataLoading(true); // 데이터 요청 시작 시 로딩 상태 true로 설정
//       setAllGeocodeDataError(null); // 이전 에러 상태 초기화
//       try {
//         const requests = REGION_DATA.map(({ regionCode, city, district }) =>
//           axios.get<IGeocodeData[]>("/api/fetchBuilding", {
//             params: { regionCode, regionName: `${city} ${district}`, buildingType: "apartment" },
//           })
//         );

//         // ✅ 3. 병렬로 요청 실행
//         const responses = await Promise.all(requests);
//         const allData = responses.flatMap((res) => res.data);

//         // 데이터가 하나라도 있으면 정상 응답으로 간주
//         if (responses.length > 0) {
//           setAllGeocodeData(allData);
//         } else {
//           throw new Error("No data received");
//         }
//       } catch (err) {
//         console.error("Error fetching data:", err);
//         setAllGeocodeDataError("데이터를 불러오는 중 오류가 발생했습니다.");
//       } finally {
//         setAllGeocodeDataLoading(false); // 데이터 요청이 끝났으므로 로딩 상태 false로 설정
//       }
//     },
//     [] // buildingType이 변경될 때만 함수가 재정의됨
//   );

//   useEffect(() => {
//     void fetchAllGeocodeData();
//   }, [fetchAllGeocodeData]); // 의존성 배열이 비어 있으므로 컴포넌트 마운트 시 1회 실행
//   // console.log("allGeocodeData: ", allGeocodeData);

//   return (
//     <S.Container>
//       <h4>최근 한달간 거래량</h4>
//       <PieChart width={280} height={340}>
//         <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={120} fill="#8884d8" label>
//           {data.map((entry, index) => (
//             <Cell key={`cell-${index}`} fill={COLORS[index]} />
//           ))}
//         </Pie>
//         <Tooltip />
//         <Legend />
//       </PieChart>
//     </S.Container>
//   );
// }
