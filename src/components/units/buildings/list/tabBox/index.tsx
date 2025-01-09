"use client";

import { useState } from "react";

import ListItem from "./listItem";

// 탭 MUI
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import { DEFAULT_NUMBER_VALUE } from "@/src/commons/constants";
import type { SyntheticEvent } from "react";
import type { ITabBoxProps } from "./types";
import * as S from "./styles";

export default function TabBox(props: ITabBoxProps): JSX.Element {
  const { myBuildings, myDeletedBuildings, onDeleteModalOpen } = props;

  const sortedMyBuildings = myBuildings.sort((a, b) => {
    const aCreatedAt = a.createdAt?.seconds ?? DEFAULT_NUMBER_VALUE; // createdAt이 없으면 0으로 처리
    const bCreatedAt = b.createdAt?.seconds ?? DEFAULT_NUMBER_VALUE;

    return aCreatedAt - bCreatedAt;
  });
  const sortedMyDeleteBuildings = myDeletedBuildings.sort((a, b) => {
    const aDeletedAt = a.deletedAt?.seconds ?? DEFAULT_NUMBER_VALUE; // DeletedAt이 없으면 0으로 처리
    const bDeletedAt = b.deletedAt?.seconds ?? DEFAULT_NUMBER_VALUE;

    return aDeletedAt - bDeletedAt;
  });

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
          <ul>
            {sortedMyBuildings.map((el, index) => (
              <ListItem key={`${el._id}_${index}`} el={el} index={index} onDeleteModalOpen={onDeleteModalOpen} isDeleted={false} />
            ))}
          </ul>
        </TabPanel>
        <TabPanel value="2">
          <ul>
            {sortedMyDeleteBuildings.map((el, index) => (
              <ListItem key={`${el._id}_${index}`} el={el} index={index} isDeleted={true} />
            ))}
          </ul>
        </TabPanel>
      </TabContext>
    </S.Container>
  );
}
