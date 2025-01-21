"use client";

import { useState } from "react";

import ListItem from "./listItem";

// 탭 MUI
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import NoDataMessage from "@/src/components/commons/noDataMessage";

import { DEFAULT_NUMBER_VALUE } from "@/src/commons/constants";
import * as S from "./styles";

import type { SyntheticEvent } from "react";
import type { IFirestore } from "@/src/commons/types";
import LoadingSpinner from "@/src/components/commons/loadingSpinner";
interface ITabBoxProps {
  myBuildings: IFirestore[];
  myDeletedBuildings: IFirestore[];
  onDeleteModalOpen: (building: IFirestore) => void;
  loading: boolean;
}

const sortByCreatedAt = (items: IFirestore[], key: "createdAt" | "deletedAt"): IFirestore[] => {
  return items.sort((a, b) => {
    const aTime = a[key]?.seconds ?? DEFAULT_NUMBER_VALUE;
    const bTime = b[key]?.seconds ?? DEFAULT_NUMBER_VALUE;
    return aTime - bTime;
  });
};
// const sortedMyBuildings = myBuildings.sort((a, b) => {
//   const aCreatedAt = a.createdAt?.seconds ?? DEFAULT_NUMBER_VALUE; // createdAt이 없으면 0으로 처리
//   const bCreatedAt = b.createdAt?.seconds ?? DEFAULT_NUMBER_VALUE;

//   return aCreatedAt - bCreatedAt;
// });
// const sortedMyDeleteBuildings = myDeletedBuildings.sort((a, b) => {
//   const aDeletedAt = a.deletedAt?.seconds ?? DEFAULT_NUMBER_VALUE; // DeletedAt이 없으면 0으로 처리
//   const bDeletedAt = b.deletedAt?.seconds ?? DEFAULT_NUMBER_VALUE;

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

  return (
    <S.Container>
      <TabContext value={tabValue}>
        <TabList onChange={onChangeTabs} aria-label="lab API tabs example">
          <Tab label="광고중" value="1" />
          <Tab label="광고종료" value="2" />
        </TabList>

        <TabPanel value="1">
          {loading ? (
            <LoadingSpinner size={100} />
          ) : sortedMyBuildings.length === 0 ? (
            <NoDataMessage text="등록한 매물이 없습니다. 매물을 등록해 보세요." />
          ) : (
            <ul>
              {sortedMyBuildings.map((el, index) => (
                <ListItem key={`${el._id}_${index}`} el={el} index={index} onDeleteModalOpen={onDeleteModalOpen} isDeleted={false} />
              ))}
            </ul>
          )}
        </TabPanel>
        <TabPanel value="2">
          {loading ? (
            <LoadingSpinner size={100} />
          ) : sortedMyDeletedBuildings.length === 0 ? (
            <NoDataMessage text="삭제된 매물이 없습니다." />
          ) : (
            <ul>
              {sortedMyDeletedBuildings.map((el, index) => (
                <ListItem key={`${el._id}_${index}`} el={el} index={index} onDeleteModalOpen={onDeleteModalOpen} isDeleted={true} />
              ))}
            </ul>
          )}
        </TabPanel>
      </TabContext>
    </S.Container>
  );
}
// <NoDataMessage text="등록한 매물이 없습니다. 매물을 등록해 보세요." />
// {/* sortedMyDeletedBuildings.length === 0 */}
