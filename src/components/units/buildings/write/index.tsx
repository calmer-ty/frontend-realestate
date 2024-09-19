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
  const { createFirestoreData, updateFirestoreData } = useFirestore();
  const { session, open, handleClose } = useAuthCheck();
  const selectedType = korToEng(watch("type"));
  const currentValues = watch(); // 현재 값

  // 파이어베이스의 데이터값 불러오는 로직
  useEffect(() => {
    if (docData !== undefined) {
      Object.entries(docData).forEach(([key, value]) => {
        if (typeof value === "string" || typeof value === "number") {
          setValue(key as keyof IWriteFormData, value);
        }
      });
      if (typeof docData.type === "string") {
        const convertedType = engToKor(docData.type);
        setValue("type", convertedType);
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

  const handleFormUpdate = async (): Promise<void> => {
    try {
      //  파일 업로드 및 다운로드 URL 가져오기
      //  const downloadURLs = await uploadFiles(selectedFiles);

      const updatedValues: Partial<IWriteFormData> = {};

      console.log("Initial Values: ", initialValues);
      console.log("Current Values: ", getValues());

      Object.keys(dirtyFields).forEach((field) => {
        const fieldKey = field as keyof IWriteFormData;
        const currentValue = currentValues[fieldKey];
        const initialValue = initialValues[fieldKey];

        if (currentValue !== undefined && currentValue !== initialValue) {
          updatedValues[fieldKey] = currentValue;
        }
      });

      console.log("Updated Values: ", updatedValues); // 여기서 업데이트된 필드를 확인

      await updateFirestoreData(updatedValues, selectedType, docData?._id ?? "");
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
