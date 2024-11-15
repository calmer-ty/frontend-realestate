"use client";

import { useSession } from "next-auth/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useFirestore } from "@/src/hooks/firestore/useFirestore";
import { DEFAULT_STRING_VALUE } from "@/src/commons/libraries/utils/constants";

import LoadingSpinner from "@/src/components/commons/loadingSpinner";
import ListItem from "./item";
import DeleteModal from "./deleteModal";
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
  // const filteredBuildings = buildings.filter((el) => el.user?._id === userId);
  const filteredBuildings = useMemo(() => {
    console.log("filteredBuildings 재계산");
    return buildings.filter((el) => el.user?._id === userId);
  }, [buildings, userId]);

  // console.log("filteredBuildings:::", filteredBuildings);

  // 매물 리스트 데이터 렌더링
  useEffect(() => {
    const currentDate = Math.floor(Date.now() / 1000); // 현재 날짜를 초 단위로

    const expiredBuildings = filteredBuildings.filter((el) => {
      const createdAtSeconds = el.createdAt?.seconds ?? 0;
      return currentDate > createdAtSeconds + DEADLINE && !archivedIds.current.has(el._id);
    });

    expiredBuildings.forEach((el) => {
      void archiveFirestore(el);
      archivedIds.current.add(el._id);

      deleteFirestore(el.type ?? DEFAULT_STRING_VALUE, el._id ?? DEFAULT_STRING_VALUE).catch((error) => {
        console.error(`Error deleting document ${el._id}:`, error);
      });
    });

    // filteredBuildings.forEach((el) => {
    //   // const createdAtSeconds = el.createdAt?.seconds ?? 0;
    //   if (currentDate > createdAtSeconds + DEADLINE && !archivedIds.current.has(el._id)) {
    //     // 삭제된 데이터 아카이브 및 원본 삭제
    //     void archiveFirestore(el);
    //     archivedIds.current.add(el._id); // 아카이브된 ID 추가

    //     // 여기서 deleteFirestore를 호출하여 원본 데이터 삭제
    //     deleteFirestore(el.type ?? DEFAULT_STRING_VALUE, el._id ?? DEFAULT_STRING_VALUE).catch((error) => {
    //       console.error(`Error deleting document ${el._id}:`, error);
    //     });
    //   }
    // });
  }, [filteredBuildings, archiveFirestore, deleteFirestore]);

  // Firestore fetch
  const fetchData = useCallback(async (): Promise<void> => {
    const collections = ["apartment", "house", "office"];
    const deletedCollections = ["deleted_apartment"];

    // const fetchCollections = async (collections: string[]): Promise<IFirestore[]> => {
    //   const promises = collections.map((collection) => readFirestores(collection));
    //   const results = await Promise.all(promises);
    //   return results.flat();
    // };

    try {
      // const buildings = await fetchCollections(collections);
      // const deletedBuildings = await fetchCollections(deletedCollections);
      const buildings = (await Promise.all(collections.map(readFirestores))).flat();
      const deletedBuildings = (await Promise.all(deletedCollections.map(readFirestores))).flat();

      setBuildings(buildings);
      setDeletedBuildings(deletedBuildings);
    } catch (error) {
      console.error("Error fetching data:", error);
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
