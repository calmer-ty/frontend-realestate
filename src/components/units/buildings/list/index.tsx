"use client";

import { useSession } from "next-auth/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useFirestore } from "@/src/hooks/firestore/useFirestore";
import { engToKor } from "@/src/commons/libraries/utils/convertCollection";
import { DEFAULT_STRING_VALUE } from "@/src/commons/libraries/utils/constants";

import { Button } from "@mui/material";
import LoadingSpinner from "@/src/components/commons/loadingSpinner";
import BasicModal from "@/src/components/commons/modal/basic";
import ListItem from "./item";
// 탭 MUI
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
// TYPE
import type { SyntheticEvent } from "react";
import type { IFirestore } from "@/src/commons/types";
import * as S from "./styles";

const DEADLINE = 86400;

export default function BuildingList(): JSX.Element {
  const { data: session, status } = useSession();
  const { archiveFirestore, deleteFirestore, readFirestores } = useFirestore();
  const [buildings, setBuildings] = useState<IFirestore[]>([]);
  const [deletedBuildings, setDeletedBuildings] = useState<IFirestore[]>([]);
  const userId = (session?.user as { id?: string })?.id;
  const archivedIds = useRef(new Set());
  const filteredBuildings = buildings.filter((el) => el.user?._id === userId);

  // Firestore fetch
  const fetchData = useCallback(async (): Promise<void> => {
    const collections = ["apartment", "house", "office"];
    const deletedCollections = ["deleted_apartment"];
    const fetchCollections = async (collections: string[]): Promise<IFirestore[]> => {
      const promises = collections.map((collection) => readFirestores(collection));
      const results = await Promise.all(promises);
      return results.flat();
    };
    try {
      const buildings = await fetchCollections(collections);
      const deletedBuildings = await fetchCollections(deletedCollections);

      setBuildings(buildings);
      setDeletedBuildings(deletedBuildings);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [readFirestores]);

  useEffect(() => {
    void fetchData();
  }, [fetchData]);

  // 매물 리스트 데이터 렌더링
  useEffect(() => {
    const currentDate = Math.floor(Date.now() / 1000); // 현재 날짜를 초 단위로

    filteredBuildings.forEach((el) => {
      const createdAtSeconds = el.createdAt?.seconds ?? 0;
      if (currentDate > createdAtSeconds + DEADLINE && !archivedIds.current.has(el._id)) {
        // 삭제된 데이터 아카이브 및 원본 삭제
        void archiveFirestore(el);
        archivedIds.current.add(el._id); // 아카이브된 ID 추가

        // 여기서 deleteFirestore를 호출하여 원본 데이터 삭제
        deleteFirestore(el.type ?? DEFAULT_STRING_VALUE, el._id ?? DEFAULT_STRING_VALUE).catch((error) => {
          console.error(`Error deleting document ${el._id}:`, error);
        });
      }
    });
  }, [filteredBuildings, archiveFirestore, deleteFirestore]);

  // 삭제 모달
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBuilding, setSelectedBuilding] = useState<IFirestore | null>(null);

  const onModalToggle = (): void => {
    setModalOpen((prev) => !prev);
  };
  const onDeleteModalOpen = (building: IFirestore): void => {
    setSelectedBuilding(building); // 클릭된 매물 데이터 저장
    setModalOpen(true); // 모달 열기
  };

  const onDeleteBuildingItem = (): void => {
    if (selectedBuilding !== null) {
      // 1. 먼저 상태를 클라이언트에서 업데이트 (성능 최적화)
      setBuildings((prev) => prev.filter((el) => el._id !== selectedBuilding._id));

      // 3. 삭제된 데이터에 저장
      void archiveFirestore(selectedBuilding);
      // 4. Firestore에서 데이터 삭제 및 동기화
      void deleteFirestore(selectedBuilding.type ?? DEFAULT_STRING_VALUE, selectedBuilding._id ?? DEFAULT_STRING_VALUE)
        .then(() => {
          // 3. Firestore와 동기화 후 데이터를 다시 가져오면 좋음
          void fetchData();
        })
        .catch((error) => {
          console.error(`Error deleting document ${selectedBuilding._id}:`, error);
        });

      // 모달 닫기
      setModalOpen(false);
    }
  };

  // 탭 로직
  const [tabValue, setTabValue] = useState("1");
  const onChangeTabs = (event: SyntheticEvent, tabNewValue: string): void => {
    setTabValue(tabNewValue);
  };

  return (
    <>
      <S.Container>
        {status === "authenticated" ? (
          <>
            <Box sx={{ width: "100%", typography: "body1" }}>
              <TabContext value={tabValue}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList onChange={onChangeTabs} aria-label="lab API tabs example">
                    <Tab label="광고중" value="1" />
                    <Tab label="광고종료" value="2" />
                  </TabList>
                </Box>
                <TabPanel value="1">
                  <ListItem isDeleted={false} data={filteredBuildings} onDeleteModalOpen={onDeleteModalOpen} />
                </TabPanel>
                <TabPanel value="2">
                  <ListItem isDeleted={true} data={deletedBuildings} />
                </TabPanel>
              </TabContext>
            </Box>
          </>
        ) : (
          <LoadingSpinner size={100} />
        )}
      </S.Container>

      {/* 매물 삭제 모달 */}
      <BasicModal open={modalOpen} onToggle={onModalToggle}>
        {selectedBuilding !== null ? (
          <>
            <h2>이 매물을 삭제하시겠습니까? </h2>
            <p>
              {engToKor(selectedBuilding.type ?? DEFAULT_STRING_VALUE)} - {selectedBuilding.address}
              {selectedBuilding.addressDetail}
            </p>
            <Button type="button" variant="outlined" onClick={onModalToggle}>
              취소
            </Button>
            <Button variant="contained" color="error" onClick={onDeleteBuildingItem}>
              삭제
            </Button>
          </>
        ) : null}
      </BasicModal>
    </>
  );
}
