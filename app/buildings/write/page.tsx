"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { firebaseApp } from "@/pages/api/firebase";
import { collection, addDoc, getDocs, getFirestore } from "firebase/firestore";

import { Button } from "@mui/material";
import DaumPostcodeEmbed from "react-daum-postcode";
import TextFieldReadOnly from "@/src/components/commons/inputs/textField/readOnly";

import type { Address } from "react-daum-postcode";
import type { IWriteFormData, IWritePageProps } from "./types";
import * as S from "./styles";
import ComboBoxControl from "@/src/components/commons/inputs/autoComplete/comboBox/control";
import BasicModal from "@/src/components/commons/modal/basic";

export default function WritePage({ firestore }: IWritePageProps): JSX.Element {
  const { register, handleSubmit, setValue } = useForm<IWriteFormData>();
  const [selectedAddress, setSelectedAddress] = useState<string>("");

  // 모달창
  const [open, setOpen] = useState(false);
  const handleToggle = (): void => {
    setOpen((prev) => !prev);
  };

  // 등록 버튼 클릭 시 데이터를 Firestore에 추가하는 함수입니다
  const onClickSubmit = (data: IWriteFormData): void => {
    const building = collection(firestore, "building"); // Firestore에서 'building' 컬렉션을 참조합니다
    void addDoc(building, { ...data }); // 'building' 컬렉션에 데이터를 추가합니다
  };

  // 조회 버튼 클릭 시 Firestore에서 데이터를 가져오는 함수입니다
  const onClickFetch = async (): Promise<void> => {
    const building = collection(getFirestore(firebaseApp), "building"); // Firebase Firestore에서 'building' 컬렉션을 참조합니다

    const result = await getDocs(building); // 'building' 컬렉션의 모든 문서를 가져옵니다
    const datas = result.docs.map((el) => el.data()); // 각 문서의 데이터를 추출하여 배열에 저장합니다
    console.log(datas); // 콘솔에 조회된 데이터를 출력합니다
  };

  // 주소 검색 완료 시 실행되는 콜백 함수입니다
  const onCompleteAddressSearch = (data: Address): void => {
    const selectedAddress = data.address; // 검색된 주소를 선택하고
    setSelectedAddress(selectedAddress); // 상태 변수에 설정합니다
    setValue("address", selectedAddress); // 폼의 'address' 필드에 선택된 주소를 설정합니다
    handleToggle(); // 주소 검색 완료 후 모달 닫기
  };

  return (
    <>
      <S.Form onSubmit={handleSubmit(onClickSubmit)}>
        <ComboBoxControl label="매물 유형" />
        <TextFieldReadOnly role="input-address" defaultValue={selectedAddress} placeholder="주소" register={register("address")} />
        <BasicModal btnText="주소 찾기" open={open} onToggle={handleToggle}>
          <DaumPostcodeEmbed onComplete={onCompleteAddressSearch} />
        </BasicModal>
        <Button role="submit-button" type="submit" variant="outlined">
          등록하기
        </Button>
        <Button onClick={onClickFetch} variant="outlined">
          조회하기
        </Button>
      </S.Form>
    </>
  );
}
