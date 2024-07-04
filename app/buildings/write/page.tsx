"use client";

import { useState } from "react"; // React의 상태 관리 훅인 useState를 가져옵니다
import { useForm } from "react-hook-form"; // react-hook-form을 사용하여 폼 관리 훅을 가져옵니다
import { firebaseApp } from "@/pages/api/firebase"; // Firebase 애플리케이션을 초기화하는 firebaseApp을 가져옵니다
import { collection, addDoc, getDocs, getFirestore } from "firebase/firestore"; // Firestore 관련 함수들을 가져옵니다

import { Button } from "@mui/material"; // Material-UI의 Button 컴포넌트를 가져옵니다
import DaumPostcodeEmbed from "react-daum-postcode"; // Daum 우편번호 서비스를 제공하는 react-daum-postcode를 가져옵니다
import InputRequired01 from "@/components/input/required/01"; // 필수 입력 필드 컴포넌트를 가져옵니다
import InputReadOnly01 from "@/components/input/readOnly/01"; // 읽기 전용 입력 필드 컴포넌트를 가져옵니다

import type { Address } from "react-daum-postcode"; // react-daum-postcode에서 사용되는 주소 타입을 가져옵니다
import type { IWriteFormData, IWritePageProps } from "./types"; // 해당 파일에서 사용되는 폼 데이터 및 props 타입을 가져옵니다
import * as S from "./styles"; // 스타일을 가져옵니다

export default function WritePage({ firestore }: IWritePageProps): JSX.Element {
  const { register, handleSubmit, setValue } = useForm<IWriteFormData>(); // react-hook-form을 사용하여 폼 상태를 관리합니다
  const [selectedAddress, setSelectedAddress] = useState<string>(""); // 주소 검색 결과를 관리하는 상태 변수입니다

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
  };

  // 폼의 제출 시 handleSubmit 함수로 onClickSubmit 함수를 연결하고, 입력 필드 및 버튼을 렌더링합니다
  return (
    <S.Form onSubmit={handleSubmit(onClickSubmit)}>
      <InputRequired01
        role="input-title"
        defaultValue=" "
        placeholder="제목"
        register={register("title")}
      />
      <InputReadOnly01
        role="input-address"
        defaultValue={selectedAddress}
        placeholder="주소"
        register={register("address")}
      />
      <Button variant="contained">주소찾기</Button>
      <S.AddressModal></S.AddressModal>
      <DaumPostcodeEmbed onComplete={onCompleteAddressSearch} />
      <Button role="submit-button" type="submit" variant="outlined">
        등록하기
      </Button>
      <Button onClick={onClickFetch} variant="outlined">
        조회하기
      </Button>
    </S.Form>
  );
}
