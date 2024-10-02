"use client";

import Link from "next/link";
import Image from "next/image";
import BasicUnImage from "@/src/components/commons/unImages/basic";
import LoadingSpinner from "@/src/components/commons/loadingSpinner";
import BasicModal from "@/src/components/commons/modal/basic";
import { Button } from "@mui/material";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { useFirestore } from "@/src/hooks/firestore/useFirestore";
import { isBillion, isTenMillion } from "@/src/commons/libraries/utils/regex";
import { convertTimestamp } from "@/src/commons/libraries/utils/convertTimestamp";

import type { IFirestoreData } from "@/src/commons/types";
import * as S from "./styles";
import { engToKor } from "@/src/commons/libraries/utils/convertCollection";

export default function BuildingList(): JSX.Element {
  const { data: session, status } = useSession();
  const [buildingData, setBuildingData] = useState<IFirestoreData[]>([]); // 상태로 데이터를 저장
  const { deleteFirestoreData, readFirestoreDatas } = useFirestore();
  const userId = (session?.user as { id?: string })?.id;

  const fetchData = useCallback(async (): Promise<void> => {
    const collections = ["apartment", "house", "officetel"];
    try {
      const dataPromises = collections.map((collection) => readFirestoreDatas(collection));
      const results = await Promise.all(dataPromises);
      const allData = results.flat(); // 모든 데이터를 평탄화하여 병합
      setBuildingData(allData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [readFirestoreDatas]);

  useEffect(() => {
    void fetchData();
  }, [fetchData]);

  // 삭제 모달
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBuilding, setSelectedBuilding] = useState<IFirestoreData | null>(null);

  const onModalToggle = (): void => {
    setModalOpen((prev) => !prev);
  };
  const onDeleteModalOpen = (building: IFirestoreData): void => {
    setSelectedBuilding(building); // 클릭된 매물 데이터 저장
    setModalOpen(true); // 모달 열기
  };
  const onDeleteBuildingItem = (): void => {
    if (selectedBuilding !== null) {
      void deleteFirestoreData(selectedBuilding.type, selectedBuilding._id);
      setModalOpen(false);
      void fetchData();
    }
  };

  const filteredData = buildingData.filter((el) => el.user?._id === userId);

  return (
    <>
      <S.Container>
        {status === "authenticated" ? (
          <>
            <h2>{session.user?.name} 님의 등록하신 매물 목록</h2>
            <S.Registered>
              {filteredData.map((el, index) => (
                <li key={`${el._id}_${index}`}>
                  <div className="topContents">
                    <Link href={`/${el.type}/${el._id}/edit/`}>
                      <Button variant="outlined">수정</Button>
                    </Link>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => {
                        onDeleteModalOpen(el);
                      }}
                    >
                      삭제
                    </Button>
                  </div>
                  <div className="bottomContents">
                    <p>{index}</p>
                    {el.imageUrls?.[0] !== undefined ? (
                      <Image src={el.imageUrls?.[0] ?? ""} alt={el.address} width={200} height={120} />
                    ) : (
                      <BasicUnImage width="200px" height="120px" fontSize="28px" />
                    )}
                    <S.RegisteredInfo>
                      <h3>
                        <p>
                          {el.type}
                          <i></i>방 {el.roomCount}개, 욕실 {el.bathroomCount}개
                        </p>
                        <p className="price">
                          매매 {el.price === 0 ? `${isBillion(el.price)}억` : ""} {isTenMillion(el.price)}원
                        </p>
                      </h3>
                      <p className="address">
                        {el.address} {el.addressDetail}
                      </p>
                      <p className="desc">{el.desc}</p>
                    </S.RegisteredInfo>
                    <S.RegisteredAd>
                      <h3>광고 정보</h3>
                      <p>
                        {(() => {
                          const { year, month, day, hours, minutes, seconds } = convertTimestamp(el.createdAt?.seconds ?? 0);
                          return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
                        })()}
                      </p>
                    </S.RegisteredAd>
                  </div>
                </li>
              ))}
            </S.Registered>
          </>
        ) : (
          <LoadingSpinner size={100} />
        )}
      </S.Container>

      {/* 매물 삭제 모달 */}
      <BasicModal open={modalOpen} onToggle={onModalToggle}>
        {selectedBuilding !== null ? (
          <>
            <h2>이 매물을 삭제하시겠습니까? </h2>
            <p>
              {engToKor(selectedBuilding.type)} - {selectedBuilding.address}
              {selectedBuilding.addressDetail}
            </p>
            <Button type="button" variant="outlined" onClick={onModalToggle}>
              취소
            </Button>
            <Button variant="contained" color="error" onClick={onDeleteBuildingItem}>
              삭제
            </Button>
          </>
        ) : null}
      </BasicModal>
    </>
  );
}
