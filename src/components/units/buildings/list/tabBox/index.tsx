"use client";

import { useState } from "react";

import ListItem from "./listItem";
// 탭 MUI
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

// TYPE
import type { SyntheticEvent } from "react";
import type { ITabBoxProps } from "./types";

export default function TabBox(props: ITabBoxProps): JSX.Element {
  const { myBuildings, myDeletedBuildings, onDeleteModalOpen } = props;
  // 탭 로직
  const [tabValue, setTabValue] = useState("1");
  const onChangeTabs = (event: SyntheticEvent, tabNewValue: string): void => {
    setTabValue(tabNewValue);
  };

  return (
    <Box sx={{ width: "1020px", typography: "body1" }}>
      <TabContext value={tabValue}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={onChangeTabs} aria-label="lab API tabs example">
            <Tab label="광고중" value="1" />
            <Tab label="광고종료" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <ul>
            {myBuildings.map((el, index) => (
              <ListItem key={`${el._id}_${index}`} el={el} index={index} onDeleteModalOpen={onDeleteModalOpen} isDeleted={false} />
            ))}
          </ul>
        </TabPanel>
        <TabPanel value="2">
          <ul>
            {myDeletedBuildings.map((el, index) => (
              <ListItem key={`${el._id}_${index}`} el={el} index={index} isDeleted={true} />
            ))}
          </ul>
        </TabPanel>
      </TabContext>
    </Box>
  );
}
