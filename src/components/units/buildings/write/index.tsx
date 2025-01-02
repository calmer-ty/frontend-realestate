"use client";

import { useFormHandler } from "./hooks/useFormHandler";
import { useAlert } from "./hooks/useAlert";
import { useFirestoreHandler } from "./hooks/useFirestoreHandler";
import { useImageUpload } from "./hooks/useImageUpload";
import { useSetFormValues } from "./hooks/useSetFormValues";
import { korToEng } from "@/src/commons/libraries/utils/convertCollection";

import BuildingInfo from "./buildingInfo";
import DealInfo from "./dealInfo";
import AddInfo from "./addInfo";
import BuildingDesc from "./buildingDesc";
import ImgUpload from "./imgUpload";
import BasicAlert from "@/src/components/commons/alert/basic";
import { Button } from "@mui/material";

import type { IEditFormData } from "./types";
import type { IWriteForm } from "@/src/commons/types";
import * as S from "./styles";

export default function BuildingWrite({ isEdit, docData }: IEditFormData): JSX.Element {
  const initialValues: IWriteForm = {
    type: docData?.type ?? "",
    address: docData?.address ?? "",
    addressDetail: docData?.addressDetail ?? "",
    area: docData?.area ?? null,
    roomCount: docData?.roomCount ?? null,
    price: docData?.price ?? null,
    manageCost: docData?.manageCost ?? null,
    floor: docData?.floor ?? null,
    bathroomCount: docData?.bathroomCount ?? null,
    elevator: docData?.elevator ?? "없음",
    desc: docData?.desc ?? "",
    imageUrls: docData?.imageUrls ?? [],
  };

  const { register, handleSubmit, watch, setValue, getValues, control } = useFormHandler(initialValues);
  const { setSelectedFiles, uploadedImageUrls, setUploadedImageUrls, uploadImages } = useImageUpload(docData);
  const { alertOpen, alertText, alertSeverity, alertClose, setAlertOpen, setAlertSeverity, setAlertText, setRouting } = useAlert();
  const { handleFormSubmit, handleFormUpdate } = useFirestoreHandler(
    initialValues,
    docData,
    uploadedImageUrls,
    korToEng(watch("type")),
    getValues,
    uploadImages,
    setAlertOpen,
    setAlertSeverity,
    setAlertText,
    setRouting
  );
  // 수정시 파이어베이스 데이터 불러옴
  useSetFormValues(docData, setValue);

  return (
    <>
      {/* 폼 */}
      <S.Form onSubmit={handleSubmit(isEdit ? handleFormUpdate : handleFormSubmit)}>
        <BuildingInfo register={register} setValue={setValue} getValues={getValues} control={control} />
        <DealInfo register={register} />
        <AddInfo register={register} control={control} />
        <BuildingDesc register={register} />
        <ImgUpload setSelectedFiles={setSelectedFiles} setUploadedImageUrls={setUploadedImageUrls} imageUrls={docData?.imageUrls} />
        <S.Footer>
          <Button role="submit-button" type="submit" variant="contained">
            {isEdit ? "수정" : "등록"}하기
          </Button>
        </S.Footer>
      </S.Form>

      {/* 알림창 */}
      <BasicAlert open={alertOpen} close={alertClose} severity={alertSeverity} text={alertText} />
    </>
  );
}
