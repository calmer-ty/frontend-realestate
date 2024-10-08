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

// 탭
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import type { IFirestoreData } from "@/src/commons/types";
import * as S from "./styles";
import { engToKor } from "@/src/commons/libraries/utils/convertCollection";

export default function BuildingList(): JSX.Element {
  const [buildings, setBuildings] = useState<IFirestoreData[]>([]);
  const [expiredBuildings, setExpiredBuildings] = useState<IFirestoreData[]>([]); // 기한이 지난 매물 상태

  const { deleteFirestoreData, readFirestoreDatas } = useFirestore();
  const { data: session, status } = useSession();

  const userId = (session?.user as { id?: string })?.id;
  const filteredBuildings = buildings.filter((el) => el.user?._id === userId);

  const fetchData = useCallback(async (): Promise<void> => {
    const collections = ["apartment", "house", "officetel"];
    try {
      const dataPromises = collections.map((collection) => readFirestoreDatas(collection));
      const results = await Promise.all(dataPromises);
      setBuildings(results.flat());
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
      void deleteFirestoreData(selectedBuilding.type ?? "값 없음", selectedBuilding._id ?? "값 없음");
      setModalOpen(false);
      void fetchData();
    }
  };

  useEffect(() => {
    const currentDate = Math.floor(Date.now() / 1000); // 현재 날짜를 초 단위로

    filteredBuildings.forEach((el) => {
      const createdAtSeconds = el.createdAt?.seconds ?? 0;
      if (currentDate > createdAtSeconds + 3) {
        // 새로운 상태가 이전 상태와 다른 경우에만 업데이트
        setExpiredBuildings((prev) => {
          if (!prev.some((expired) => expired._id === el._id)) {
            return [...prev, el];
          }
          return prev; // 중복되는 경우 상태를 변경하지 않음
        });
      }
      // deleteFirestoreData(el.type, el._id).catch((error) => {
      //   console.error(`Error deleting document ${el._id}:`, error);
      // });
    });
  }, [
    filteredBuildings,
    // deleteFirestoreData
  ]);

  // 탭 로직
  const [tabValue, setTabValue] = useState("1");

  const onChangeTabs = (event: React.SyntheticEvent, tabNewValue: string): void => {
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
                    <Tab label="전체" value="1" />
                    <Tab label="광고중" value="2" />
                    <Tab label="광고종료" value="3" />
                  </TabList>
                </Box>
                <TabPanel value="1">
                  <S.BuildingList>
                    {filteredBuildings.map((el, index) => (
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
                            <Image src={el.imageUrls?.[0] ?? "값 없음"} alt={el.address ?? "값 없음"} width={200} height={120} />
                          ) : (
                            <BasicUnImage width="200px" height="120px" fontSize="28px" />
                          )}
                          <S.BuildingInfo>
                            <h3>
                              <p>
                                {el.type}
                                <i></i>방 {el.roomCount}개, 욕실 {el.bathroomCount}개
                              </p>
                              <p className="price">
                                매매 {el.price === 0 ? `${isBillion(el.price)}억` : ""} {isTenMillion(el.price ?? NaN)}원
                              </p>
                            </h3>
                            <p className="address">
                              {el.address} {el.addressDetail}
                            </p>
                            <p className="desc">{el.desc}</p>
                          </S.BuildingInfo>
                          <S.BuildingAd>
                            <h3>광고 정보</h3>

                            <p>
                              <span>광고 기한 </span>
                              {(() => {
                                const createdAtSeconds = el.createdAt?.seconds ?? 0;
                                const { year, month, day } = convertTimestamp(createdAtSeconds + 2592000);
                                return `${year}-${month}-${day}`;
                              })()}
                            </p>
                            <p>
                              <span>광고 시작 </span>
                              {(() => {
                                const { year, month, day, hours, minutes, seconds } = convertTimestamp(el.createdAt?.seconds ?? 0);
                                return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
                              })()}
                            </p>
                          </S.BuildingAd>
                        </div>
                      </li>
                    ))}
                  </S.BuildingList>
                </TabPanel>
                <TabPanel value="2">
                  <S.BuildingList>
                    {filteredBuildings.map((el, index) => (
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
                            <Image src={el.imageUrls?.[0] ?? "값 없음"} alt={el.address ?? "값 없음"} width={200} height={120} />
                          ) : (
                            <BasicUnImage width="200px" height="120px" fontSize="28px" />
                          )}
                          <S.BuildingInfo>
                            <h3>
                              <p>
                                {el.type}
                                <i></i>방 {el.roomCount}개, 욕실 {el.bathroomCount}개
                              </p>
                              <p className="price">
                                매매 {el.price === 0 ? `${isBillion(el.price)}억` : ""} {isTenMillion(el.price ?? NaN)}원
                              </p>
                            </h3>
                            <p className="address">
                              {el.address} {el.addressDetail}
                            </p>
                            <p className="desc">{el.desc}</p>
                          </S.BuildingInfo>
                          <S.BuildingAd>
                            <h3>광고 정보</h3>

                            <p>
                              <span>광고 기한 </span>
                              {(() => {
                                const createdAtSeconds = el.createdAt?.seconds ?? 0;
                                const { year, month, day } = convertTimestamp(createdAtSeconds + 2592000);
                                return `${year}-${month}-${day}`;
                              })()}
                            </p>
                            <p>
                              <span>광고 시작 </span>
                              {(() => {
                                const { year, month, day, hours, minutes, seconds } = convertTimestamp(el.createdAt?.seconds ?? 0);
                                return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
                              })()}
                            </p>
                          </S.BuildingAd>
                        </div>
                      </li>
                    ))}
                  </S.BuildingList>
                </TabPanel>
                <TabPanel value="3">
                  <S.BuildingList>
                    {expiredBuildings.map((el, index) => (
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
                            <Image src={el.imageUrls?.[0] ?? "값 없음"} alt={el.address ?? "값 없음"} width={200} height={120} />
                          ) : (
                            <BasicUnImage width="200px" height="120px" fontSize="28px" />
                          )}
                          <S.BuildingInfo>
                            <h3>
                              <p>
                                {el.type}
                                <i></i>방 {el.roomCount}개, 욕실 {el.bathroomCount}개
                              </p>
                              <p className="price">
                                매매 {el.price === 0 ? `${isBillion(el.price)}억` : ""} {isTenMillion(el.price ?? NaN)}원
                              </p>
                            </h3>
                            <p className="address">
                              {el.address} {el.addressDetail}
                            </p>
                            <p className="desc">{el.desc}</p>
                          </S.BuildingInfo>
                          <S.BuildingAd>
                            <h3>광고 정보</h3>

                            <p>
                              <span>광고 기한 </span>
                              {(() => {
                                const createdAtSeconds = el.createdAt?.seconds ?? 0;
                                const { year, month, day } = convertTimestamp(createdAtSeconds + 2592000);
                                return `${year}-${month}-${day}`;
                              })()}
                            </p>
                            <p>
                              <span>광고 시작 </span>
                              {(() => {
                                const { year, month, day, hours, minutes, seconds } = convertTimestamp(el.createdAt?.seconds ?? 0);
                                return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
                              })()}
                            </p>
                          </S.BuildingAd>
                        </div>
                      </li>
                    ))}
                  </S.BuildingList>
                </TabPanel>
              </TabContext>
            </Box>
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
              {engToKor(selectedBuilding.type ?? "값 없음")} - {selectedBuilding.address}
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
