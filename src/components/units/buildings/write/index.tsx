"use client";

import axios from "axios";
import { useState } from "react";
import { db } from "@/pages/api/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import DaumPostcodeEmbed from "react-daum-postcode";
import { useSelectedMarkerMaps } from "@/src/hooks/useSelectedMarkerMaps";

import { Button } from "@mui/material";
import SelectControl from "@/src/components/commons/inputs/select/control";
import ModalBasic from "@/src/components/commons/modal/basic";
import TextFieldBasic from "@/src/components/commons/inputs/textField/basic";
import UnitBasic from "@/src/components/commons/units/basic";
import TitleUnderline from "@/src/components/commons/titles/underline";
import RadioControl from "@/src/components/commons/inputs/radio/control";

import { v4 as uuidv4 } from "uuid";

import type { Address } from "react-daum-postcode";
import type { IWriteFormData } from "./types";
import type { IGeocodeData } from "@/src/types";
import * as S from "./styles";

export default function BuildingWrite(): JSX.Element {
  const router = useRouter();
  const { register, handleSubmit, control, watch, setValue } = useForm<IWriteFormData>({});

  // 모달창
  const [open, setOpen] = useState(false);
  const onToggle = (): void => {
    setOpen((prev) => !prev);
  };

  // 셀렉터
  const selecteItems = ["아파트"];
  const selectedType = watch("type");

  const getFirestoreCollectionName = (type: string | null): string => {
    switch (type) {
      case "아파트":
        return "apartment";
      default:
        return "";
    }
  };

  // 등록 버튼 클릭 시 데이터를 Firestore에 추가하는 함수입니다
  const onClickSubmit = async (data: IWriteFormData): Promise<void> => {
    if (selectedType === null) return;
    const collectionName = getFirestoreCollectionName(selectedType);
    const docRef = await addDoc(collection(db, collectionName), {
      ...data, // 컬렉션에 데이터를 추가합니다
      _id: uuidv4(), // 고유한 _id 생성
      type: selectedType,
    });
    console.log(docRef);
    router.push("/buildings");
  };

  // 조회 버튼 클릭 시 Firestore에서 데이터를 가져오는 함수입니다
  const onClickFetch = async (): Promise<void> => {
    if (selectedType === null) return;
    const collectionName = getFirestoreCollectionName(selectedType);
    const querySnapshot = await getDocs(collection(db, collectionName)); // 컬렉션을 참조합니다
    const datas = querySnapshot.docs.map((el) => el.data()); // 각 문서의 데이터를 추출하여 배열에 저장합니다
    console.log(datas);
  };

  const [selectedAddress, setSelectedAddress] = useState<string>("");
  const [geocodeData, setGeocodeData] = useState<IGeocodeData | null>(null);
  // 주소 검색 완료 시 실행되는 콜백 함수입니다
  const onCompleteAddressSearch = async (data: Address): Promise<void> => {
    const selectedAddress = data.address; // 검색된 주소를 선택하고
    setSelectedAddress(selectedAddress); // 상태 변수에 설정합니다
    setValue("address", selectedAddress); // 폼의 'address' 필드에 선택된 주소를 설정합니다
    onToggle(); // 주소 검색 완료 후 모달 닫기

    try {
      const response = await axios.get<IGeocodeData>(`/api/fetchSelectGeocode?address=${encodeURIComponent(selectedAddress)}`);
      setGeocodeData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching geocode data:", error);
    }
  };

  useSelectedMarkerMaps(geocodeData);

  return (
    <>
      <S.Form onSubmit={handleSubmit(onClickSubmit)}>
        <TitleUnderline label="매물 정보" />
        <SelectControl required label="매물유형" name="type" control={control} notice="매물 유형을 선택하세요" selecteItems={selecteItems} />
        <S.InputWrap>
          <div>
            <S.InputWrap>
              <TextFieldBasic required role="input-address" label="주소" value={selectedAddress} register={register("address")} />
              <ModalBasic btnText="주소 찾기" open={open} onToggle={onToggle}>
                <DaumPostcodeEmbed onComplete={onCompleteAddressSearch} />
              </ModalBasic>
            </S.InputWrap>
            <S.InputWrap>
              <TextFieldBasic required role="input-addressDetail" label="상세 주소" register={register("addressDetail")} />
            </S.InputWrap>
          </div>
          <div id="map" style={{ width: "400px", height: "200px" }}></div>
        </S.InputWrap>

        <S.InputWrap>
          <TextFieldBasic required role="input-area" type="number" label="매물 크기" register={register("area")} />
          <UnitBasic label="m²" />
          <TextFieldBasic required role="input-roomCount" type="number" label="방 개수" register={register("roomCount")} />
          <UnitBasic label="개" />
        </S.InputWrap>

        <TitleUnderline label="거래 정보" />
        <S.InputWrap>
          <TextFieldBasic required role="input-price" type="number" label="매매가" register={register("price")} />
          <UnitBasic label="만원" />
        </S.InputWrap>
        <S.InputWrap>
          <TextFieldBasic required role="input-manageCost" type="number" label="관리비" register={register("manageCost")} />
          <UnitBasic label="만원" />
        </S.InputWrap>

        <TitleUnderline label="추가 정보" />
        <S.InputWrap>
          <TextFieldBasic required role="input-addressDetail" type="number" label="층" register={register("floor")} />
          <UnitBasic label="층" />
        </S.InputWrap>
        <S.InputWrap>
          <TextFieldBasic required role="input-bathroom" type="number" label="욕실 수" register={register("bathroomCount")} />
          <UnitBasic label="개" />
        </S.InputWrap>
        <RadioControl label="엘리베이터" selectLabel1="없음" selectLabel2="있음" name="elevator" control={control} />

        <Button role="submit-button" type="submit" variant="contained">
          등록하기
        </Button>
        <Button onClick={onClickFetch} variant="outlined">
          조회하기
        </Button>
      </S.Form>
    </>
  );
}
