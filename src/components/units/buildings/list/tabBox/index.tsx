"use client";

import { useState } from "react";

import ListItem from "./listItem";

// 탭 MUI
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import NoDataMessage from "@/src/components/commons/noDataMessage";
import LoadingSpinner from "@/src/components/commons/loadingSpinner";

import * as S from "./styles";

import type { SyntheticEvent } from "react";
import type { IFirestore } from "@/src/commons/types";
interface ITabBoxProps {
  myBuildings: IFirestore[];
  myDeletedBuildings: IFirestore[];
  onDeleteModalOpen: (building: IFirestore) => void;
  loading: boolean;
}

const sortByCreatedAt = (items: IFirestore[], key: "createdAt" | "deletedAt"): IFirestore[] => {
  return items.sort((a, b) => {
    const aTime = a[key]?.seconds;
    const bTime = b[key]?.seconds;
    return aTime - bTime;
  });
};
// const sortedMyBuildings = myBuildings.sort((a, b) => {
//   const aCreatedAt = a.createdAt?.seconds; // createdAt이 없으면 0으로 처리
//   const bCreatedAt = b.createdAt?.seconds;

//   return aCreatedAt - bCreatedAt;
// });
// const sortedMyDeleteBuildings = myDeletedBuildings.sort((a, b) => {
//   const aDeletedAt = a.deletedAt?.seconds; // DeletedAt이 없으면 0으로 처리
//   const bDeletedAt = b.deletedAt?.seconds;

//   return aDeletedAt - bDeletedAt;
// });

export default function TabBox(props: ITabBoxProps): JSX.Element {
  const { myBuildings, myDeletedBuildings, onDeleteModalOpen, loading } = props;

  const sortedMyBuildings = sortByCreatedAt(myBuildings, "createdAt");
  const sortedMyDeletedBuildings = sortByCreatedAt(myDeletedBuildings, "deletedAt");

  // 탭 로직
  const [tabValue, setTabValue] = useState("1");
  const onChangeTabs = (event: SyntheticEvent, tabNewValue: string): void => {
    setTabValue(tabNewValue);
  };
  console.log("tabValue: ", tabValue);

  return (
    <S.Container>
      <TabContext value={tabValue}>
        <TabList onChange={onChangeTabs} aria-label="lab API tabs example">
          <Tab label="광고중" value="1" />
          <Tab label="광고종료" value="2" />
        </TabList>

        {tabValue === "1" && (
          <TabPanel value="1">
            {loading ? (
              <LoadingSpinner size={100} />
            ) : sortedMyBuildings.length !== 0 ? (
              <ul>
                {sortedMyBuildings.map((el, index) => (
                  <ListItem key={`${el._id}_${index}`} el={el} index={index} onDeleteModalOpen={onDeleteModalOpen} isDeleted={false} />
                ))}
              </ul>
            ) : (
              <div className="noDataInner">
                <NoDataMessage text="등록한 매물이 없습니다. 매물을 등록해 보세요." />
              </div>
            )}
          </TabPanel>
        )}
        {tabValue === "2" && (
          <TabPanel value="2">
            {loading ? (
              <LoadingSpinner size={100} />
            ) : sortedMyDeletedBuildings.length !== 0 ? (
              <ul>
                {sortedMyDeletedBuildings.map((el, index) => (
                  <ListItem key={`${el._id}_${index}`} el={el} index={index} onDeleteModalOpen={onDeleteModalOpen} isDeleted={true} />
                ))}
              </ul>
            ) : (
              <div className="noDataInner">
                <NoDataMessage text="삭제된 매물이 없습니다." />
              </div>
            )}
          </TabPanel>
        )}
      </TabContext>
    </S.Container>
  );
}
