import { useEffect, useMemo, useRef } from "react";
import * as d3 from "d3";

import { shortenCityName } from "@/src/commons/libraries/utils/regex";
import { useAllGeocodeData } from "@/src/hooks/useAllGeocodeData";

import type { IGeocodeEtcData } from "@/src/commons/types";
import LoadingSpinner from "../../commons/loadingSpinner";

export default function ChartTest(): JSX.Element {
  // 데이터 프리로딩
  const { geocodeResults, loading, fetchData } = useAllGeocodeData("apartment");

  useEffect(() => {
    fetchData().catch((err) => {
      // handle errors if necessary
      console.error("Error fetching data:", err);
    });
  }, [fetchData]);
  console.log("loading", loading);

  // 도시별 개수를 집계하는 함수
  const countCities = (results: IGeocodeEtcData[]): Record<string, number> => {
    const counts: Record<string, number> = {};

    results.forEach((el) => {
      const city = shortenCityName(el.address.split(" ")[0], { useSpecialRules: true });
      counts[city] = (counts[city] ?? 0) + 1;
    });

    return counts;
  };

  // 도시별 개수 집계 및 출력
  const cityCounts = useMemo(() => countCities(geocodeResults), [geocodeResults]);

  const svgRef = useRef<SVGSVGElement | null>(null);
  const data = useMemo(
    () =>
      Object.entries(cityCounts).map(([city, count]) => ({
        city,
        value: count,
      })),
    [cityCounts]
  );

  useEffect(() => {
    if (svgRef.current === null) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // 기존의 SVG 내용을 초기화

    const width = 800;
    const height = 400;
    const margin = { top: 20, right: 30, bottom: 40, left: 40 };

    svg.attr("width", width).attr("height", height);

    const x = d3
      .scaleBand<string>()
      .domain(data.map((d) => d.city)) // d.city를 사용하여 X축 도메인 설정
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const yMax = d3.max(data, (d) => d.value) ?? 0;

    const y = d3
      .scaleLinear()
      .domain([0, yMax])
      .nice()
      .range([height - margin.bottom, margin.top]);

    const xAxis = (g: d3.Selection<SVGGElement, unknown, null, undefined>): d3.Selection<SVGGElement, unknown, null, undefined> =>
      g.attr("transform", `translate(0,${height - margin.bottom})`).call(d3.axisBottom(x).tickSizeOuter(0));

    const yAxis = (g: d3.Selection<SVGGElement, unknown, null, undefined>): d3.Selection<SVGGElement, unknown, null, undefined> =>
      g.attr("transform", `translate(${margin.left},0)`).call(d3.axisLeft(y));

    svg.append("g").call(xAxis);
    svg.append("g").call(yAxis);

    svg
      .selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => x(d.city) ?? margin.left) // x 위치를 city로 설정
      .attr("y", (d) => y(d.value))
      .attr("width", x.bandwidth())
      .attr("height", (d) => y(0) - y(d.value))
      .attr("fill", "steelblue");
  }, [data]);
  return (
    <>
      {loading ? (
        <LoadingSpinner size={80} />
      ) : (
        <>
          <h2>지역별 아파트 거래현황</h2>
          <svg ref={svgRef} style={{ backgroundColor: "#fff" }}></svg>
        </>
      )}
    </>
  );
}
