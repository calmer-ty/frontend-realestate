"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { firebaseApp } from "@/pages/api/firebase";
import { collection, addDoc, getDocs, getFirestore } from "firebase/firestore";

import { Button } from "@mui/material";
import DaumPostcodeEmbed from "react-daum-postcode";
import InputRequired01 from "@/components/common/input/required/01";
import InputReadOnly01 from "@/components/common/input/readOnly/01";

import type { Address } from "react-daum-postcode";
import type { IWriteFormData } from "./types";
import * as S from "./styles";

export default function WritePage(): JSX.Element {
  const { register, handleSubmit, setValue } = useForm<IWriteFormData>();
  const [selectedAddress, setSelectedAddress] = useState<string>("");
  const onClickSubmit = (data: IWriteFormData): void => {
    console.log(data);
    const building = collection(getFirestore(firebaseApp), "building");
    void addDoc(building, {
      ...data,
    });
  };

  const onClickFetch = async (): Promise<void> => {
    const building = collection(getFirestore(firebaseApp), "building");

    const result = await getDocs(building);
    const datas = result.docs.map((el) => el.data());
    console.log(datas);
  };

  // 주소
  const onCompleteAddressSearch = (data: Address): void => {
    const selectedAddress = data.address;
    setSelectedAddress(selectedAddress);
    setValue("address", selectedAddress);
  };

  // const onSubmit: SubmitHandler<any> = (data) => console.log(data);
  return (
    <S.Form onSubmit={handleSubmit(onClickSubmit)}>
      <InputRequired01
        defaultValue=" "
        placeholder="제목"
        register={register("title")}
      />
      <InputReadOnly01
        defaultValue={selectedAddress}
        placeholder="주소"
        register={register("address")}
      />
      <Button variant="contained">주소찾기</Button>
      <S.AddressModal></S.AddressModal>
      <DaumPostcodeEmbed onComplete={onCompleteAddressSearch} />
      <Button type="submit" variant="outlined">
        등록하기
      </Button>
      <Button onClick={onClickFetch} variant="outlined">
        조회하기
      </Button>
    </S.Form>
  );
}
