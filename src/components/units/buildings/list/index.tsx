"use client";

import { useSession } from "next-auth/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useFirestore } from "@/src/hooks/firebase/useFirestore";

import LoadingSpinner from "@/src/components/commons/loadingSpinner";
import ListItem from "./listItem";
import DeleteModal from "./deleteModal";
// 탭 MUI
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
// TYPE
import type { MutableRefObject, SyntheticEvent } from "react";
import type { IFirestore } from "@/src/commons/types";
import * as S from "./styles";

// 광고기한 초 - 60초 * 60분 * 24시간
const DAY_LIMIT = 60 * 60 * 24;

const getExpiredBuildings = (buildings: IFirestore[], archivedIds: Set<string>): IFirestore[] =>
  buildings.filter((el) => el._id !== undefined && Date.now() / 1000 > (el.createdAt?.seconds ?? 0) + DAY_LIMIT && !archivedIds.has(el._id));

const processExpiredBuilding = (
  building: IFirestore,
  archiveFirestore: (building: IFirestore) => Promise<void>,
  deleteFirestore: (selectedType: string, docId: string) => Promise<void>,
  archivedIds: MutableRefObject<Set<string>>
): void => {
  if (building._id !== undefined && building.type !== undefined) {
    void archiveFirestore(building);
    void deleteFirestore(building.type, building._id);
    archivedIds.current.add(building._id);
  }
};
const filterBuildingsByUser = (buildings: IFirestore[], userId: string | undefined): IFirestore[] => buildings.filter((el) => el.user?._id === userId);

export default function BuildingList(): JSX.Element {
  const { data: session, status } = useSession();
  const { archiveFirestore, deleteFirestore, readFirestores } = useFirestore();

  const [buildings, setBuildings] = useState<IFirestore[]>([]);
  const [deletedBuildings, setDeletedBuildings] = useState<IFirestore[]>([]);

  const userId = (session?.user as { id?: string })?.id;
  const archivedIds = useRef<Set<string>>(new Set());

  const filteredBuildings = useMemo(() => filterBuildingsByUser(buildings, userId), [buildings, userId]);

  // 매물 리스트 데이터 렌더링
  useEffect(() => {
    const expiredBuildings = getExpiredBuildings(filteredBuildings, archivedIds.current);
    // 시간 초과가 되면 기존 정보 삭제 및 아카이브 등록
    expiredBuildings.forEach((building) => {
      processExpiredBuilding(building, archiveFirestore, deleteFirestore, archivedIds);
    });
  }, [filteredBuildings, archiveFirestore, deleteFirestore]);

  // Firestore 패치
  const fetchData = useCallback(async (): Promise<void> => {
    const collections = ["apartment", "house", "office"];
    const deletedCollections = ["deleted_apartment"];

    try {
      const buildings = (await Promise.all(collections.map(readFirestores))).flat();
      const deletedBuildings = (await Promise.all(deletedCollections.map(readFirestores))).flat();

      setBuildings(buildings);
      setDeletedBuildings(deletedBuildings);
    } catch (error) {
      console.error("Firebase 패치 오류가 있습니다: ", error);
    }
  }, [readFirestores]);

  useEffect(() => {
    void fetchData();
  }, [fetchData]);

  // 삭제 모달
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBuilding, setSelectedBuilding] = useState<IFirestore | null>(null);

  const onDeleteModalOpen = (building: IFirestore): void => {
    setSelectedBuilding(building); // 클릭된 매물 데이터 저장
    setModalOpen(true); // 모달 열기
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
                  <ul>
                    {filteredBuildings.map((el, index) => (
                      <ListItem key={`${el._id}_${index}`} el={el} index={index} onDeleteModalOpen={onDeleteModalOpen} isDeleted={false} />
                    ))}
                  </ul>
                </TabPanel>
                <TabPanel value="2">
                  <ul>
                    {deletedBuildings.map((el, index) => (
                      <ListItem key={`${el._id}_${index}`} el={el} index={index} isDeleted={true} />
                    ))}
                  </ul>
                </TabPanel>
              </TabContext>
            </Box>
          </>
        ) : (
          <LoadingSpinner size={100} />
        )}
      </S.Container>

      {/* 매물 삭제 모달 */}
      <DeleteModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        setBuildings={setBuildings}
        archiveFirestore={archiveFirestore}
        deleteFirestore={deleteFirestore}
        fetchData={fetchData}
        selectedBuilding={selectedBuilding}
      />
    </>
  );
}
