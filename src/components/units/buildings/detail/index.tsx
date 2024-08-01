"use client";

// import Head from "next/head";
import { db } from "@/pages/api/cloudFirestore";
import { collection, getDocs } from "firebase/firestore";
import { usePathname } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import type { IFirebaseData } from "@/src/types";
import * as S from "./styles";
import TitleUnderline from "@/src/components/commons/titles/underline";
import { isBillion, isTenMillion } from "@/src/commons/libraries/utils/regex";

export default function BuildingDetail(): JSX.Element {
  const [fbData, setFbData] = useState<IFirebaseData[]>();

  const fetchData = async (): Promise<void> => {
    try {
      const querySnapshot = await getDocs(collection(db, "apartment")); // 컬렉션을 참조합니다
      const datas = querySnapshot.docs.map((el) => el.data() as IFirebaseData); // 각 문서의 데이터를 추출하여 배열에 저장합니다
      setFbData(datas);
    } catch (error) {
      console.error("Error fetching documents: ", error);
    }
  };

  const pathname = usePathname();
  // id값 뽑는 정규식
  const extractIdFromPathname = (path: string | null): string | null => {
    // 정규 표현식 패턴을 사용하여 ID를 추출합니다
    const regex = /\/buildings\/([a-f0-9-]{36})\/$/;
    const match = path?.match(regex);
    // 정규 표현식이 일치하면 ID를 반환하고, 그렇지 않으면 null을 반환합니다
    return match !== null && match !== undefined ? match?.[1] : null;
  };
  const id = extractIdFromPathname(pathname);

  useEffect(() => {
    void fetchData();
  }, []);
  return (
    <>
      {/* <Head>
        <meta property="og:title" content={apartment.name} />
        <meta property="og:description" content={apartment.remarks} />
        <meta property="og:image" content={apartment.images?.[0]} />
      </Head> */}
      <S.Container>
        <S.MainImg>MainImg</S.MainImg>
        <S.BuildingInfo>
          {fbData
            ?.filter((el) => el._id === id)
            .map((el) => (
              <Fragment key={el._id}>
                <S.InfoItem>
                  <TitleUnderline label="가격 정보" />
                  <S.InfoContent>
                    <S.InfoContentItem>
                      <S.InfoLabel>가격</S.InfoLabel>
                      {isBillion(el.price)}&nbsp;
                      {isTenMillion(el.price)} 원
                    </S.InfoContentItem>
                    <S.InfoContentItem>
                      <S.InfoLabel>관리비</S.InfoLabel>
                      <span>매월 {el.manageCost}만 원</span>
                    </S.InfoContentItem>
                  </S.InfoContent>
                </S.InfoItem>

                <S.InfoItem>
                  <TitleUnderline label="상세 정보" />
                  <S.InfoContent>
                    <S.InfoContentItem>
                      <S.InfoLabel>건물 이름</S.InfoLabel>
                      <span>{el.addressDetail}</span>
                    </S.InfoContentItem>
                    <S.InfoContentItem>
                      <S.InfoLabel>해당 층</S.InfoLabel>
                      <span>{el.floor}</span>
                    </S.InfoContentItem>
                  </S.InfoContent>
                </S.InfoItem>
              </Fragment>
            ))}
        </S.BuildingInfo>
      </S.Container>
    </>
  );
}
