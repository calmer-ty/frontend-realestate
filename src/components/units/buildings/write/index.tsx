"use client";

import BuildingInfo from "./buildingInfo";
import DealInfo from "./dealInfo";
import AddInfo from "./addInfo";
import BuildingDesc from "./buildingDesc";
import ImgUpload from "./imgUpload";
import { Alert, Button } from "@mui/material";
// import BasicSnackbar from "@/src/components/commons/feedback/snackbar/basic";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useFirebase } from "@/src/hooks/firebase/useFirebase";
import { useFirebaseStorage } from "@/src/hooks/firebase/useFirebaseStorage";
// import { useAuthCheck } from "@/src/hooks/useAuthCheck";

import type { IWriteFormData } from "./types";
import * as S from "./styles";
import { useSession } from "next-auth/react";
import BasicSnackbar from "@/src/components/commons/feedback/snackbar/basic";

export default function BuildingWrite(): JSX.Element {
  const router = useRouter();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const { register, handleSubmit, control, watch, setValue } = useForm<IWriteFormData>({});
  const { uploadFiles } = useFirebaseStorage();
  const { createFirebaseData } = useFirebase(); // 훅 사용

  // const { open: alertOpen, handleClose } = useAuthCheck();

  const getFirestoreCollectionName = (type: string | null): string => {
    switch (type) {
      case "아파트":
        return "apartment";
      default:
        return "";
    }
  };
  const selectedType = watch("type");
  const selectedTypeEng = getFirestoreCollectionName(selectedType);

  // 등록 버튼 클릭 시 데이터를 Firestore에 추가하는 함수입니다
  const onClickSubmit = async (data: IWriteFormData): Promise<void> => {
    try {
      // 파일 업로드 및 다운로드 URL 가져오기
      const downloadURLs = await uploadFiles(selectedFiles);

      // 데이터에 파일 다운로드 URL 추가
      const formData = {
        ...data,
        imageUrls: downloadURLs,
      };

      // Firestore에 데이터 추가
      await createFirebaseData(formData, selectedTypeEng);

      router.push(`/${selectedTypeEng}/`);
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
    }
  };
  // 구글 세션
  const { status } = useSession();
  const [alertOpen, setAlertOpen] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      setAlertOpen(true);
    }
  }, [status, router]);
  const handleClose = (): void => {
    setAlertOpen(false); // 모달 닫기
    router.push("/");
  };

  return (
    <>
      {/* 알림창 */}
      <BasicSnackbar open={alertOpen} close={handleClose}>
        <Alert onClose={handleClose} severity="warning">
          구글 로그인 세션이 없습니다. 계속하려면 로그인해 주세요.
        </Alert>
      </BasicSnackbar>
      {/* 폼 */}
      <S.Form onSubmit={handleSubmit(onClickSubmit)}>
        <BuildingInfo register={register} setValue={setValue} control={control} />
        <DealInfo register={register} />
        <AddInfo register={register} control={control} />
        <BuildingDesc register={register} />
        <ImgUpload onFilesChange={setSelectedFiles} />
        <S.Footer>
          <Button role="submit-button" type="submit" variant="contained">
            등록하기
          </Button>
        </S.Footer>
      </S.Form>
    </>
  );
}
