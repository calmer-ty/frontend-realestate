"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useFirestore } from "@/src/hooks/firebase/useFirestore";
import { useStorage } from "@/src/hooks/firebase/useStorage";
import { useAuth } from "@/src/hooks/useAuth";
import { useAlert } from "@/src/hooks/useAlert";
import { engToKor, korToEng } from "@/src/commons/libraries/utils/convertCollection";

import { Button, TextField } from "@mui/material";
import BasicAlert from "@/src/components/commons/alert/basic";
import UnderlineTitle from "@/src/components/commons/titles/underline";
import BasicUpload from "@/src/components/commons/uploads/basic";
import WriteRadio from "./writeRadio";
import BuildingInfo from "./buildingInfo";
import InputUnit from "./inputUnit";

import { DEFAULT_STRING_VALUE } from "@/src/commons/constants";
import * as S from "./styles";

import type { IFirestore, IWriteForm } from "@/src/commons/types";
interface IEditFormData {
  isEdit: boolean;
  docData?: IFirestore | undefined;
}

const isValidValue = (value: any): value is string | number | string[] => {
  return typeof value === "string" || typeof value === "number" || (Array.isArray(value) && value.every((item) => typeof item === "string"));
};

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

  const { user } = useAuth();
  const { register, handleSubmit, watch, setValue, getValues, control } = useForm<IWriteForm>({
    defaultValues: initialValues,
  });

  const { alertOpen, alertText, alertSeverity, alertClose, setAlertOpen, setAlertSeverity, setAlertText, setRouting } = useAlert();
  const { createFirestore, updateFirestore } = useFirestore();

  // 등록 수정
  const handleFormSubmit = async (data: IWriteForm): Promise<void> => {
    try {
      const selectImageUrls = await uploadImages();
      const formData = {
        ...data,
        imageUrls: selectImageUrls,
        user: {
          name: user?.displayName,
          email: user?.email,
          _id: user?.uid,
        },
      };

      await createFirestore(formData, "buildings", korToEng(watch("type")));
      setAlertOpen(true);
      setAlertText("매물 등록이 완료되었습니다.");
      setAlertSeverity("success");

      setRouting("/list");
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
    }
  };

  const handleFormUpdate = async (): Promise<void> => {
    try {
      const currentValues = getValues(); // 현재 폼의 값을 가져옵니다
      const updatedValues: Partial<IWriteForm> = {};

      const selectImageUrls = await uploadImages();
      const currentImageUrls = [...uploadedImageUrls, ...selectImageUrls];

      Object.entries(currentValues).forEach(([key, currentValue]) => {
        const fieldKey = key as keyof IWriteForm;
        const initialValue = initialValues[fieldKey];

        if (fieldKey === "type" && typeof currentValue === "string") {
          currentValue = korToEng(currentValue);
        }

        if (currentValue != null && currentValue !== initialValue && key !== "imageUrls") {
          updatedValues[fieldKey] = currentValue;
        }
        if (JSON.stringify(initialValues.imageUrls) !== JSON.stringify(currentImageUrls)) {
          updatedValues.imageUrls = [...currentImageUrls];
        }
      });

      if (currentImageUrls.length > 5) {
        setAlertOpen(true);
        setAlertText("이미지는 5개까지 업로드가 가능합니다.");
        setAlertSeverity("info");
        return;
      }

      if (Object.keys(updatedValues).length === 0 && JSON.stringify(initialValues.imageUrls) === JSON.stringify(currentImageUrls)) {
        setAlertOpen(true);
        setAlertText("수정된 내역이 없습니다.");
        setAlertSeverity("info");
        return;
      }

      await updateFirestore(updatedValues, "buildings", docData?._id ?? DEFAULT_STRING_VALUE);
      setAlertOpen(true);
      setAlertText("매물 수정이 완료되었습니다.");
      setAlertSeverity("success");

      // 알람 후 페이지 이동
      setRouting("/list");
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
    }
  };

  // 이미지 업로드 기능
  const { uploadFiles } = useStorage();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadedImageUrls, setUploadedImageUrls] = useState<string[]>([]);

  useEffect(() => {
    if (docData?.imageUrls !== undefined) {
      setUploadedImageUrls(docData.imageUrls);
    }
  }, [docData]);

  const uploadImages = async (): Promise<string[]> => {
    return await uploadFiles(selectedFiles);
  };

  // 수정시 파이어베이스 데이터 불러옴
  useEffect(() => {
    if (docData !== undefined) {
      const excludedKeys = ["_id", "user", "createdAt"];

      Object.entries(docData).forEach(([key, value]) => {
        if (!excludedKeys.includes(key) && isValidValue(value)) {
          setValue(key as keyof IWriteForm, value);
        }
      });
      // type이 있을 경우 한글로 변환하여 설정
      if (typeof docData.type === "string") {
        setValue("type", engToKor(docData.type));
      }
    }
  }, [docData, setValue]);

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
          <WriteRadio label="엘리베이터" name="elevator" selectLabels={["없음", "있음"]} control={control} />
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
