"use client";
import BuildingTypeItem from "./buildingTypeItem";
import RecommendedList from "./recommendedList";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import MapsHomeWorkIcon from "@mui/icons-material/MapsHomeWork";
import HomeIcon from "@mui/icons-material/Home";
import { useEffect, useState } from "react";
import { useFirestore } from "@/src/hooks/firestore/useFirestore";
import type { IFirestoreData } from "@/src/commons/types";
import * as S from "./styles";

export default function Home(): JSX.Element {
  const [firestoreDatas, setFirestoreDatas] = useState<IFirestoreData[]>([]);
  const { readFirestoreDatas } = useFirestore();

  // firestoreDatas
  useEffect(() => {
    const readBuildings = async (): Promise<void> => {
      // 임시로 아파트만 랜덤 렌더링
      const datas = await readFirestoreDatas("apartment");
      setFirestoreDatas(datas);
    };
    void readBuildings();
  }, [readFirestoreDatas]);

  return (
    <S.Container>
      <S.MapOptions>
        <div className="inner">
          <BuildingTypeItem href="apartment" title="아파트" description="거래된 목록들이 지도에!" icon={<LocationCityIcon fontSize="large" color="primary" />} />
          <BuildingTypeItem title="주택/빌라" icon={<HomeIcon fontSize="large" color="primary" />} />
          <BuildingTypeItem title="오피스텔" icon={<MapsHomeWorkIcon fontSize="large" color="primary" />} />
        </div>
      </S.MapOptions>
      <RecommendedList firestoreDatas={firestoreDatas} />
    </S.Container>
  );
}
