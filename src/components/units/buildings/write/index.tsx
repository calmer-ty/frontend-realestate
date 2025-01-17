"use client";

import { useFormHandler } from "./hooks/useFormHandler";
import { useAlert } from "./hooks/useAlert";
import { useFirestoreHandler } from "./hooks/useFirestoreHandler";
import { useImageUpload } from "./hooks/useImageUpload";
import { useSetFormValues } from "./hooks/useSetFormValues";
import { korToEng } from "@/src/commons/libraries/utils/convertCollection";

import BuildingInfo from "./buildingInfo";
import BasicAlert from "@/src/components/commons/alert/basic";
import UnderlineTitle from "@/src/components/commons/titles/underline";
import InputUnit from "./inputUnit";
import ControlRadio from "@/src/components/commons/inputs/radio/control";
import BasicUpload from "@/src/components/commons/uploads/basic";
import { Button, TextField } from "@mui/material";

import * as S from "./styles";
import type { IFirestore, IWriteForm } from "@/src/commons/types";
interface IEditFormData {
  isEdit: boolean;
  docData?: IFirestore | undefined;
}

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
  const selectedType = korToEng(watch("type"));
  const { handleFormSubmit, handleFormUpdate } = useFirestoreHandler({
    initialValues,
    docData,
    uploadedImageUrls,
    selectedType,
    getValues,
    uploadImages,
    setAlertOpen,
    setAlertSeverity,
    setAlertText,
    setRouting,
  });

  // 수정시 파이어베이스 데이터 불러옴
  useSetFormValues({ docData, setValue });

  return (
    <>
      {/* 폼 */}
      <S.Form onSubmit={handleSubmit(isEdit ? handleFormUpdate : handleFormSubmit)}>
        <BuildingInfo register={register} setValue={setValue} getValues={getValues} control={control} />
        <section>
          <UnderlineTitle label="거래 정보" />
          <InputUnit label="매매가" type="number" register={register("price", { valueAsNumber: true })} unitLabel="만원" />
          <InputUnit label="관리비" type="number" register={register("manageCost", { valueAsNumber: true })} unitLabel="만원" />
        </section>
        <section>
          <UnderlineTitle label="추가 정보" />
          <InputUnit label="층" type="number" register={register("floor", { valueAsNumber: true })} unitLabel="층" />
          <InputUnit label="욕실 수" type="number" register={register("bathroomCount", { valueAsNumber: true })} unitLabel="개" />
          <ControlRadio label="엘리베이터" name="elevator" selectLabel1={"없음"} selectLabel2={"있음"} control={control} />
        </section>
        <section>
          <UnderlineTitle label="매물 설명" />
          <TextField
            id="description-field"
            label="설명 내용"
            multiline
            rows={5}
            InputLabelProps={{
              shrink: true,
            }}
            {...register("desc")}
          />
        </section>
        <section>
          <UnderlineTitle label="사진 등록" desc="5MB 이하, jpeg/png/webp" />
          <BasicUpload imageUrls={docData?.imageUrls} setSelectedFiles={setSelectedFiles} setUploadedImageUrls={setUploadedImageUrls} />
        </section>
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
