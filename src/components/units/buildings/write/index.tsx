"use client";

import BuildingInfo from "./buildingInfo";
import DealInfo from "./dealInfo";
import AddInfo from "./addInfo";
import BuildingDesc from "./buildingDesc";
import ImgUpload from "./imgUpload";
import BasicSnackbar from "@/src/components/commons/feedback/snackbar/basic";
import { Alert, Button } from "@mui/material";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useFirestore } from "@/src/hooks/firestore/useFirestore";
import { useStorage } from "@/src/hooks/firestore/useStorage";
import { useAuthCheck } from "@/src/hooks/useAuthCheck";
import { engToKor, korToEng } from "@/src/commons/libraries/utils/convertCollection";
import { serverTimestamp } from "firebase/firestore";

import type { IEditFormData, IWriteFormData } from "./types";
import * as S from "./styles";

export default function BuildingWrite({ isEdit, docData }: IEditFormData): JSX.Element {
  const router = useRouter();
  const initialValues: IWriteFormData = {
    type: docData?.type ?? "",
    address: docData?.address ?? "",
    addressDetail: docData?.addressDetail ?? "",
    area: docData?.area ?? 0,
    roomCount: docData?.roomCount ?? 0,
    price: docData?.price ?? 0,
    manageCost: docData?.manageCost ?? 0,
    floor: docData?.floor ?? 0,
    bathroomCount: docData?.bathroomCount ?? 0,
    elevator: docData?.elevator ?? "",
    desc: docData?.desc ?? "",
  };

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    control,
    formState: { dirtyFields },
  } = useForm<IWriteFormData>({
    defaultValues: initialValues, // 초기값 설정
  });

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const { uploadFiles } = useStorage();
  const { createFirestoreData } = useFirestore();
  const { session, open, handleClose } = useAuthCheck();
  const selectedType = korToEng(watch("type"));

  const currentValues = getValues(); // 현재 값
  // const updatedValues = {};
  // console.log("getValues / 현재 값: ", currentValues);
  console.log("초기 값: ", initialValues);

  Object.keys(dirtyFields).forEach((field) => {
    // if (currentValues[field] !== initialValues[field]) {
    //   updatedValues[field] = currentValues[field]; // 실제로 변경된 값만 추가
    // }
    // console.log(currentValues[field]);

    // console.log("dirtyFields / 각각의 수정된 필드 - 한번만 수정되면 안사라짐: ", field);
    const fieldKey = field as keyof IWriteFormData;

    console.log("currentValues[field] : ", fieldKey, currentValues[fieldKey]);
  });

  // 파이어베이스의 데이터값 불러오는 로직
  useEffect(() => {
    const fields = [
      { name: "type", value: typeof docData?.type === "string" ? engToKor(docData?.type) : undefined },
      { name: "address", value: docData?.address },
      { name: "addressDetail", value: docData?.addressDetail },
      { name: "area", value: docData?.area },
      { name: "roomCount", value: docData?.roomCount },
      { name: "price", value: docData?.price },
      { name: "manageCost", value: docData?.manageCost },
      { name: "floor", value: docData?.floor },
      { name: "bathroomCount", value: docData?.bathroomCount },
      { name: "elevator", value: docData?.elevator },
      { name: "desc", value: docData?.desc },
    ];

    fields.forEach(({ name, value }) => {
      if (typeof value === "string") {
        setValue(name as keyof IWriteFormData, value); // 타입 단언으로 간단하게 처리
      }
    });
  }, [docData, setValue]);

  // 등록 버튼 클릭 시 데이터를 Firestore에 추가하는 함수입니다
  const handleFormSubmit = async (data: IWriteFormData): Promise<void> => {
    try {
      // 파일 업로드 및 다운로드 URL 가져오기
      const downloadURLs = await uploadFiles(selectedFiles);

      // 데이터에 파일 다운로드 URL 추가
      const formData = {
        ...data,
        imageUrls: downloadURLs,
        user: {
          name: session?.user?.name,
          email: session?.user?.email,
          _id: (session?.user as { id?: string })?.id, // 타입 단언
        },
        createdAt: serverTimestamp(), // 서버 시간 추가
      };

      // Firestore에 데이터 추가
      await createFirestoreData(formData, selectedType);

      router.push("/list");
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
    }
  };

  // const handleFormUpdate = async (data: IWriteFormData): Promise<void> => {
  //   try {
  //     // // 파일 업로드 및 다운로드 URL 가져오기
  //     // const downloadURLs = await uploadFiles(selectedFiles);

  //     // 데이터에 파일 다운로드 URL 추가
  //     const formData = {
  //       ...data,
  //       createdAt: serverTimestamp(), // 서버 시간 추가
  //     };

  //     // Firestore에 데이터 추가
  //     await createFirestoreData(formData, selectedType);

  //     router.push("/list");
  //   } catch (error) {
  //     if (error instanceof Error) console.error(error.message);
  //   }
  // };

  const handleModalClose = (): void => {
    handleClose(); // 모달 닫기
    router.push("/");
  };

  return (
    <>
      {/* 알림창 */}
      <BasicSnackbar open={open} close={handleModalClose}>
        <Alert onClose={handleModalClose} severity="warning">
          구글 로그인 세션이 없습니다. 계속하려면 로그인해 주세요.
        </Alert>
      </BasicSnackbar>
      {/* 폼 */}
      <S.Form onSubmit={handleSubmit(handleFormSubmit)}>
        <BuildingInfo register={register} setValue={setValue} control={control} />
        <DealInfo register={register} />
        <AddInfo register={register} control={control} />
        <BuildingDesc register={register} />
        <ImgUpload onFilesChange={setSelectedFiles} docData={docData} />
        <S.Footer>
          <Button role="submit-button" type="submit" variant="contained">
            {isEdit ? "수정" : "등록"}하기
          </Button>
        </S.Footer>
      </S.Form>
    </>
  );
}
