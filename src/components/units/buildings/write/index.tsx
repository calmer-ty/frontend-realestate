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
import { useFirebase } from "@/src/hooks/firebase/useFirebase";
import { useFirebaseStorage } from "@/src/hooks/firebase/useFirebaseStorage";
import { useAuthCheck } from "@/src/hooks/useAuthCheck";
import { engToKor, korToEng } from "@/src/commons/libraries/utils/convertCollection";
import { serverTimestamp } from "firebase/firestore";

import type { IEditFormData, IWriteFormData } from "./types";
import * as S from "./styles";

export default function BuildingWrite({ isEdit, docData }: IEditFormData): JSX.Element {
  const router = useRouter();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const { register, handleSubmit, watch, setValue, control } = useForm<IWriteFormData>({});
  const { uploadFiles } = useFirebaseStorage();
  const { createFirebaseData } = useFirebase();
  const { session, open, handleClose } = useAuthCheck();
  const selectedType = korToEng(watch("type"));

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
      await createFirebaseData(formData, selectedType);

      router.push("/list");
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
    }
  };
  const handleModalClose = (): void => {
    handleClose(); // 모달 닫기
    router.push("/");
  };

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
