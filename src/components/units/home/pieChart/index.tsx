import { useEffect, useRef } from "react";
import * as d3 from "d3";
import * as S from "./styles";

const data = [
  { type: "아파트", value: 10 },
  { type: "오피스텔", value: 6 },
  { type: "빌라", value: 3 },
];

export default function PieChart() {
  const svgRef = useRef();

  useEffect(() => {
    const width = 300;
    const height = 300;
    const radius = Math.min(width, height) / 2;

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const color = d3
      .scaleOrdinal()
      .domain(data.map((d) => d.type))
      .range(["#ff6b6b", "#4ecdc4", "#1a535c"]);

    const pie = d3.pie().value((d) => d.value);
    const arc = d3.arc().innerRadius(0).outerRadius(radius);

    svg
      .selectAll("path")
      .data(pie(data))
      .enter()
      .append("path")
      .attr("d", arc)
      .attr("fill", (d) => color(d.data.type))
      .attr("stroke", "#fff")
      .style("stroke-width", "2px");

    svg
      .selectAll("text")
      .data(pie(data))
      .enter()
      .append("text")
      .attr("transform", (d) => `translate(${arc.centroid(d)})`)
      .attr("text-anchor", "middle")
      .attr("font-size", "14px")
      .attr("fill", "#fff")
      .text((d) => d.data.type);
  }, []);

  return <S.SvgEl ref={svgRef}></S.SvgEl>;
}
