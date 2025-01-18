import { loadScript } from "@/src/commons/libraries/utils/maps/init";
import { useCallback, useRef } from "react";

interface IUseClusterScriptLoaderReturn {
  loadClusterScript: (map: any) => void;
}

export const useClusterScriptLoader = (updateMarkers: (map: any) => void): IUseClusterScriptLoaderReturn => {
  const isClusterScriptLoadedRef = useRef(false);

  const loadClusterScript = useCallback(
    (map: any) => {
      if (isClusterScriptLoadedRef.current) {
        // console.log("클러스터 스크립트가 이미 로드되었습니다.");

        // 기존 리스너 제거 후 등록
        window.naver.maps.Event.clearListeners(map, "idle");
        window.naver.maps.Event.addListener(map, "idle", () => {
          updateMarkers(map);
        });
        updateMarkers(map);
        return;
      }

      const MARKER_CLUSTERING_SCRIPT_URL = "/libraries/markerClustering.js";
      loadScript(MARKER_CLUSTERING_SCRIPT_URL, () => {
        try {
          // console.log("클러스터를 실행합니다.");
          isClusterScriptLoadedRef.current = true; // 스크립트가 로드되었음을 기록

          window.naver.maps.Event.addListener(map, "idle", () => {
            updateMarkers(map);
          });
          updateMarkers(map);
        } catch (error) {
          console.error("클러스터 스크립트 로드 중 오류 발생:", error);
        }
      });
    },
    [updateMarkers]
  );
  return { loadClusterScript };
};
