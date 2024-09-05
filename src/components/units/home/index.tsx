"use client";

import { useEffect, useState } from "react";

import { useFirebase } from "@/src/hooks/firebase/useFirebase";

import BuildingTypeItem from "./buildingTypeItem";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import MapsHomeWorkIcon from "@mui/icons-material/MapsHomeWork";
import HomeIcon from "@mui/icons-material/Home";

import type { IFirebaseData } from "@/src/commons/types";
import * as S from "./styles";
import RecommendedList from "./recommendedList";

export default function Home(): JSX.Element {
  const [firebaseDatas, setFirebaseDatas] = useState<IFirebaseData[]>([]);
  const { readFirebaseDatas } = useFirebase();

  // firebaseDatas
  useEffect(() => {
    const readBuildings = async (): Promise<void> => {
      // 임시로 아파트만 랜덤 렌더링
      const datas = await readFirebaseDatas("apartment");
      setFirebaseDatas(datas);
    };
    void readBuildings();
  }, [readFirebaseDatas]);

  return (
    <S.Container>
      <S.MapOptions>
        <div className="inner">
          <BuildingTypeItem href="apartment" title="아파트" description="거래된 목록들이 지도에!" icon={<LocationCityIcon fontSize="large" color="primary" />} />
          <BuildingTypeItem title="주택/빌라" icon={<HomeIcon fontSize="large" color="primary" />} />
          <BuildingTypeItem title="오피스텔" icon={<MapsHomeWorkIcon fontSize="large" color="primary" />} />
        </div>
      </S.MapOptions>
      <RecommendedList firebaseDatas={firebaseDatas} />
    </S.Container>
  );
}
