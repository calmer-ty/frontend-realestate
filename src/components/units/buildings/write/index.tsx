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

import type { IEditFormData } from "./types";
import type { IWriteFormData } from "@/src/commons/types";
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

  const { register, handleSubmit, watch, setValue, getValues, control } = useForm<IWriteFormData>({
    defaultValues: initialValues, // 초기값 설정
  });
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const { uploadFiles } = useStorage();
  const { createFirestoreData, updateFirestoreData } = useFirestore();
  const { session, open, handleClose } = useAuthCheck();
  const selectedType = korToEng(watch("type")); // 셀렉트 폼에서 가져온 데이터의 타입을 한글로

  // 파이어베이스의 데이터값 불러오는 로직
  useEffect(() => {
    if (docData !== undefined) {
      Object.entries(docData).forEach(([key, value]) => {
        const excludedKeys = ["_id", "user", "createdAt"]; // 제외할 키 추가
        if (!excludedKeys.includes(key) && (typeof value === "string" || typeof value === "number")) {
          setValue(key as keyof IWriteFormData, value);
        }
      });
      if (typeof docData.type === "string") {
        // docData type을 한글로 하여 폼에 뿌림
        setValue("type", engToKor(docData.type));
      }
    }
  }, [docData, setValue]);

  // 등록 버튼 클릭 시 데이터를 Firestore에 추가하는 함수입니다
  const handleFormSubmit = async (data: IWriteFormData): Promise<void> => {
    try {
      // 데이터에 파일 다운로드 URL 추가
      const downloadURLs = await uploadFiles(selectedFiles);

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

      await createFirestoreData(formData, selectedType);
      alert("매물 등록이 완료되었습니다.");
      router.push("/list");
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
    }
  };

  // console.log("currentValues: ", currentValues);
  const handleFormUpdate = async (): Promise<void> => {
    try {
      //  파일 업로드 및 다운로드 URL 가져오기
      //  const downloadURLs = await uploadFiles(selectedFiles);

      const currentValues = getValues(); // 현재 폼의 값을 가져옵니다
      const updatedValues: Partial<IWriteFormData> = {};

      Object.entries(currentValues).forEach(([key, currentValue]) => {
        console.log(currentValue);
        const fieldKey = key as keyof IWriteFormData;
        const initialValue = initialValues[fieldKey];

        // type 키는 초기값을 불러올 시 한글로 변하므로 다시 변환시켜줌
        if (fieldKey === "type" && typeof currentValue === "string") {
          currentValue = korToEng(currentValue);
        }
        // 초기값과 currentValue이 다를 경우 currentValue로 업데이트
        if (currentValue != null && currentValue !== initialValue) {
          updatedValues[fieldKey] = currentValue; // 여기서 타입 단언 필요 시 추가
        }
      });

      // if (Object.keys(updatedValues).length === 0) {
      //   alert("변경된 사항이 없습니다.");
      //   return;
      // }
      // console.log(Object.keys(updatedValues));

      await updateFirestoreData(updatedValues, selectedType, docData?._id ?? "");
      console.log("selectedType: ", selectedType);
      alert("매물 수정이 완료되었습니다.");
      router.push("/list");
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
    }
  };

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
      <S.Form onSubmit={handleSubmit(isEdit ? handleFormUpdate : handleFormSubmit)}>
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
