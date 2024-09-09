"use client";

import LoadingSpinner from "@/src/components/commons/loadingSpinner";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useFirebase } from "@/src/hooks/firebase/useFirebase";
import type { IFirebaseData } from "@/src/commons/types";
import * as S from "./styles";
import Image from "next/image";
import BasicUnImage from "@/src/components/commons/unImages/basic";

export default function BuildingList(): JSX.Element {
  const { data: session, status } = useSession();
  const userId = session?.user?.id;

  const [buildingData, setBuildingData] = useState<IFirebaseData[]>([]); // 상태로 데이터를 저장
  const { readFirebaseDatas } = useFirebase();

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const data = await readFirebaseDatas("apartment");
      setBuildingData(data);
    };
    void fetchData(); // 컴포넌트가 렌더링될 때 함수 호출
  }, [readFirebaseDatas]);

  const filteredData = buildingData.filter((el) => el.user?._id === userId);

  return (
    <S.Container>
      {status === "authenticated" ? (
        <>
          <h2>{session.user.name} 님의 등록하신 매물 목록</h2>
          <ul>
            {filteredData.map((el, index) => (
              <li key={`${el._id}_${index}`}>
                <p>{index}</p>
                {el.imageUrls?.[0] !== undefined ? <Image src={el.imageUrls?.[0] ?? ""} alt={el.address} /> : <BasicUnImage width="200px" height="100px" />}
                <p>
                  {el.type} | 방 {el.roomCount}개 | 욕실 {el.bathroomCount}개
                </p>
                <p>{el.address}</p>
                <p>{el.addressDetail}</p>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <LoadingSpinner size={100} />
      )}
    </S.Container>
  );
}
