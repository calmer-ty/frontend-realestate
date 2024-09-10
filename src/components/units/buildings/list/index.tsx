"use client";

import Image from "next/image";
import BasicUnImage from "@/src/components/commons/unImages/basic";
import LoadingSpinner from "@/src/components/commons/loadingSpinner";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useFirebase } from "@/src/hooks/firebase/useFirebase";
import { isBillion, isTenMillion } from "@/src/commons/libraries/utils/regex";
// import { convertTimestamp } from "@/src/commons/libraries/utils/convertTimestamp";
import type { IFirebaseData } from "@/src/commons/types";
import * as S from "./styles";
import Link from "next/link";

export default function BuildingList(): JSX.Element {
  const { data: session, status } = useSession();
  const [buildingData, setBuildingData] = useState<IFirebaseData[]>([]); // 상태로 데이터를 저장
  const { readFirebaseDatas } = useFirebase();
  const userId = (session?.user as { id?: string })?.id;

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const collections = ["apartment", "house", "officetel"];
      try {
        const dataPromises = collections.map((collection) => readFirebaseDatas(collection));
        const results = await Promise.all(dataPromises);
        const allData = results.flat(); // 모든 데이터를 평탄화하여 병합
        // const data = await readFirebaseDatas(collections);
        // setBuildingData(data);
        setBuildingData(allData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    void fetchData();
  }, [readFirebaseDatas]);

  const filteredData = buildingData.filter((el) => el.user?._id === userId);
  console.log(filteredData);

  return (
    <S.Container>
      {status === "authenticated" ? (
        <>
          <h2>{session.user?.name} 님의 등록하신 매물 목록</h2>
          <S.Registered>
            {filteredData.map((el, index) => (
              <li key={`${el._id}_${index}`}>
                <Link href={`/${el.type}/${el._id}/edit/`}>
                  <p>{index}</p>
                  {el.imageUrls?.[0] !== undefined ? <Image src={el.imageUrls?.[0] ?? ""} alt={el.address} width={200} height={120} /> : <BasicUnImage width="200px" height="120px" />}
                  <div className="infos">
                    <p className="basic">
                      {el.type}
                      <i></i>방 {el.roomCount}개, 욕실 {el.bathroomCount}개
                    </p>
                    <p className="price">
                      매매 {el.price === 0 ? `${isBillion(el.price)}억` : ""} {isTenMillion(el.price)}원
                    </p>
                    <p className="address">
                      {el.address} {el.addressDetail}
                    </p>
                    <p className="desc">{el.desc}</p>
                  </div>
                  {/* <div className="ad">
                  광고 정보
                  {convertTimestamp(el.createdAt?.seconds).year}-{convertTimestamp(el.createdAt?.seconds).month}-{convertTimestamp(el.createdAt?.seconds).day}-
                  {convertTimestamp(el.createdAt?.seconds).hours}:{convertTimestamp(el.createdAt?.seconds).minutes}:{convertTimestamp(el.createdAt?.seconds).seconds}
                </div> */}
                </Link>
              </li>
            ))}
          </S.Registered>
        </>
      ) : (
        <LoadingSpinner size={100} />
      )}
    </S.Container>
  );
}
