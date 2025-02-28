// import { useEffect, useRef } from "react";
// import * as d3 from "d3";
// import * as S from "./styles";

// // 타입 정의를 생략하거나 `any`를 사용하여 타입 검사 피하기
// const data = [
//   { type: "아파트", value: 10 },
//   { type: "오피스텔", value: 6 },
//   { type: "빌라", value: 3 },
// ];

// export default function PieChart() {
//   const svgRef = useRef(null); // 초기값 null로 설정

//   useEffect(() => {
//     if (svgRef.current === null) return; // ref가 null이면 실행 안 함

//     const width = 300;
//     const height = 300;
//     const radius = Math.min(width, height) / 2;

//     const svg = d3
//       .select(svgRef.current)
//       .attr("width", width)
//       .attr("height", height)
//       .append("g")
//       .attr("transform", `translate(${width / 2}, ${height / 2})`);

//     const color = d3
//       .scaleOrdinal()
//       .domain(data.map((d) => d.type))
//       .range(["#ff6b6b", "#4ecdc4", "#1a535c"]);

//     const pie = d3.pie().value((d: any) => d.value); // `any`로 타입 검사 피하기
//     const arc = d3.arc().innerRadius(0).outerRadius(radius);

//     svg
//       .selectAll("path")
//       .data(pie(data))
//       .enter()
//       .append("path")
//       .attr("d", arc)
//       .attr("fill", (d: any) => color(d.data.type)) // `any`로 타입 검사 피하기
//       .attr("stroke", "#fff")
//       .style("stroke-width", "2px");

//     svg
//       .selectAll("text")
//       .data(pie(data))
//       .enter()
//       .append("text")
//       .attr("transform", (d: any) => `translate(${arc.centroid(d)})`) // `any`로 타입 검사 피하기
//       .attr("text-anchor", "middle")
//       .attr("font-size", "14px")
//       .attr("fill", "#fff")
//       .text((d: any) => d.data.type); // `any`로 타입 검사 피하기
//   }, []);

//   return <S.SvgEl ref={svgRef}></S.SvgEl>;
// }
