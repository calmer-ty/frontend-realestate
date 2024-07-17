"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { db } from "@/pages/api/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { yupResolver } from "@hookform/resolvers/yup";

import { Button } from "@mui/material";
import DaumPostcodeEmbed from "react-daum-postcode";

import SelectBasic from "@/src/components/commons/inputs/select/basic";
import BasicModal from "@/src/components/commons/modal/basic";
import TextFieldReadOnly from "@/src/components/commons/inputs/textField/readOnly";
import TextFieldBasic from "@/src/components/commons/inputs/textField/basic";
import ErrorBasic from "@/src/components/commons/errors/basic";

import type { Address } from "react-daum-postcode";
import type { IWriteFormData } from "./types";

import { schemaBuildingWrite } from "@/src/commons/libraries/validation";
import * as S from "./styles";

export default function WritePage(): JSX.Element {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IWriteFormData>({
    resolver: yupResolver(schemaBuildingWrite),
  });

  const [selectedAddress, setSelectedAddress] = useState<string>("");
  // 모달창
  const [open, setOpen] = useState(false);
  const onToggle = (): void => {
    setOpen((prev) => !prev);
  };

  // 셀렉터
  const [selectedOption, setSelectedOption] = useState("");
  const handleOptionChange = (selectedValue: string): void => {
    setSelectedOption(selectedValue);
  };
  console.log("selectedOption:::", selectedOption);

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
    if (selectedOption === null) return;
    const collectionName = getFirestoreCollectionName(selectedOption);
    const docRef = await addDoc(collection(db, collectionName), {
      ...data, // 'building' 컬렉션에 데이터를 추가합니다
    });
    console.log(docRef);
  };

  // 조회 버튼 클릭 시 Firestore에서 데이터를 가져오는 함수입니다
  const onClickFetch = async (): Promise<void> => {
    if (selectedOption === null) return;
    const collectionName = getFirestoreCollectionName(selectedOption);
    const querySnapshot = await getDocs(collection(db, collectionName)); // 'building' 컬렉션을 참조합니다
    const datas = querySnapshot.docs.map((el) => el.data()); // 각 문서의 데이터를 추출하여 배열에 저장합니다
    console.log(datas);
  };

  // 주소 검색 완료 시 실행되는 콜백 함수입니다
  const onCompleteAddressSearch = (data: Address): void => {
    const selectedAddress = data.address; // 검색된 주소를 선택하고
    setSelectedAddress(selectedAddress); // 상태 변수에 설정합니다
    setValue("address", selectedAddress); // 폼의 'address' 필드에 선택된 주소를 설정합니다
    onToggle(); // 주소 검색 완료 후 모달 닫기
  };

  // const handleTypeChange = (type: string | null): void => {
  //   setSelectedType(type);
  // };

  return (
    <>
      <S.Form onSubmit={handleSubmit(onClickSubmit)}>
        <div>
          <SelectBasic required label="매물유형" onChange={handleOptionChange} value={selectedOption} />
          {/* <ErrorBasic text={errors.propertyType?.message ?? ""} /> */}
        </div>

        <div style={{ width: "100%" }}>
          <S.InputWrap>
            <TextFieldReadOnly required role="input-address" label="주소" value={selectedAddress} register={register("address")} />
            <BasicModal btnText="주소 찾기" open={open} onToggle={onToggle}>
              <DaumPostcodeEmbed onComplete={onCompleteAddressSearch} />
            </BasicModal>
          </S.InputWrap>
          <ErrorBasic text={errors.address?.message ?? ""} />
        </div>

        <div>
          <TextFieldBasic required role="input-addressDetail" label="상세 주소" register={register("addressDetail")} />
          <ErrorBasic text={errors.addressDetail?.message ?? ""} />
        </div>
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
