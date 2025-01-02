"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { useFirestore } from "@/src/hooks/firebase/useFirestore";
import { useBuildingList } from "./hooks/useBuildingList";

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
import type { SyntheticEvent } from "react";
import type { IFirestore } from "@/src/commons/types";
import * as S from "./styles";

export default function BuildingList(): JSX.Element {
  const { data: session, status } = useSession();
  const { buildings, deletedBuildings, setBuildings, archiveFirestore, deleteFirestore, readFirestoresRealTime } = useFirestore();
  const userId = (session?.user as { id?: string })?.id;

  const { registrantBuildings, registrantDeletedBuildings } = useBuildingList(buildings, deletedBuildings, userId, readFirestoresRealTime);

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
                    {registrantBuildings.map((el, index) => (
                      <ListItem key={`${el._id}_${index}`} el={el} index={index} onDeleteModalOpen={onDeleteModalOpen} isDeleted={false} />
                    ))}
                  </ul>
                </TabPanel>
                <TabPanel value="2">
                  <ul>
                    {registrantDeletedBuildings.map((el, index) => (
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
        selectedBuilding={selectedBuilding}
      />
    </>
  );
}
