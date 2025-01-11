import { useEffect } from "react";
import $ from "jquery";

// const HOME_PATH = window.HOME_PATH ?? ".";
const HOME_PATH = typeof window !== "undefined" ? window.HOME_PATH ?? "." : ".";
const urlPrefix = HOME_PATH + "/data/region";
const urlSuffix = ".json";
const regionGeoJson: any[] = [];
let loadCount = 0;

console.log(loadCount); // loadCount 값 확인

// interface IUseRegionProps {
//   map: boolean;
// }

export const useRegion = ({ map }: { map: any }): void => {
  useEffect(() => {
    // const map = new window.naver.maps.Map(document.getElementById("map"), {
    //   zoom: 7,
    //   mapTypeId: "normal",
    //   center: new window.naver.maps.LatLng(36.4203004, 128.31796),
    // });

    if (map == null) return; // 맵 객체가 없는 경우 바로 종료

    window.naver.maps.Event.once(map, "init", async function () {
      // 지도 초기화 이후 실행
      console.log("맵이 초기화되었습니다!");
      for (let i = 1; i < 18; i++) {
        let keyword = i + "";
        console.log("AJAX 요청 준비:", keyword);

        if (keyword.length === 1) {
          keyword = "0" + keyword;
        }

        // jQuery 상태 확인
        console.log("jQuery 상태:", typeof $ !== "undefined" ? "로드됨" : "로드되지 않음");

        console.log("AJAX 요청 준비:", keyword); // AJAX 요청 전 확인

        // $.ajax({
        //   url: urlPrefix + keyword + urlSuffix,
        //   success: (function (idx) {
        //     return function (geojson: any) {
        //       console.log("AJAX Success, idx:", idx, "geojson:", geojson);
        //       regionGeoJson[idx] = geojson;

        //       loadCount++;

        //       if (loadCount === 17) {
        //         console.log("All regions loaded");
        //         startDataLayer();
        //       }
        //     };
        //   })(i - 1),
        //   error: function (jqXHR, textStatus, errorThrown) {
        //     console.error("AJAX Error:", textStatus, errorThrown);
        //   },
        // });
        try {
          const geojson = await $.ajax({
            url: urlPrefix + keyword + urlSuffix,
          });
          regionGeoJson[i - 1] = geojson;
          loadCount++;
          if (loadCount === 17) {
            startDataLayer();
          }
        } catch (error) {
          console.error("AJAX 요청 실패:", error);
        }
      }
    });

    const tooltip = document.createElement("div");
    tooltip.style.position = "absolute";
    tooltip.style.zIndex = "1000";
    tooltip.style.padding = "5px 10px";
    tooltip.style.backgroundColor = "#fff";
    tooltip.style.border = "solid 2px #000";
    tooltip.style.fontSize = "14px";
    tooltip.style.pointerEvents = "none";
    tooltip.style.display = "none";
    document.getElementById("map")?.appendChild(tooltip);

    const startDataLayer = (): void => {
      map.data.setStyle(function (feature: any) {
        const styleOptions = {
          fillColor: "#ff0000",
          fillOpacity: 0.0001,
          strokeColor: "#ff0000",
          strokeWeight: 2,
          strokeOpacity: 0.4,
        };

        if (feature.getProperty("focus") === true) {
          styleOptions.fillOpacity = 0.6;
          styleOptions.fillColor = "#0f0";
          styleOptions.strokeColor = "#0f0";
          styleOptions.strokeWeight = 4;
          styleOptions.strokeOpacity = 1;
        }

        return styleOptions;
      });

      regionGeoJson.forEach(function (geojson) {
        console.log("geojson: ", geojson); // 각 geojson 데이터 확인
        map.data.addGeoJson(geojson);
      });

      map.data.addListener("click", function (e: any) {
        const feature = e.feature;

        if (feature.getProperty("focus") !== true) {
          feature.setProperty("focus", true);
        } else {
          feature.setProperty("focus", false);
        }
      });

      map.data.addListener("mouseover", function (e: any) {
        const feature = e.feature;
        const regionName = feature.getProperty("area1");
        console.log("feature: ", feature); // feature 객체 확인

        tooltip
          .css({
            display: "",
            left: e.offset.x,
            top: e.offset.y,
          })
          .text(regionName);

        map.data.overrideStyle(feature, {
          fillOpacity: 0.6,
          strokeWeight: 4,
          strokeOpacity: 1,
        });
      });

      map.data.addListener("mouseout", function (e: any) {
        tooltip.hide().empty();
        map.data.revertStyle();
      });
    };
  }, [map]); // 빈 배열로 컴포넌트가 처음 마운트될 때만 실행
};
