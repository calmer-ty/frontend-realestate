"use client";

import { Button, TextField } from "@mui/material";
import DaumPostcodeEmbed from "react-daum-postcode";
import SelectControl from "@/src/components/commons/inputs/select/control";
import BasicModal from "@/src/components/commons/modal/basic";
import TextFieldBasic from "@/src/components/commons/inputs/textField/basic";
import BasicUnit from "@/src/components/commons/units/basic";
import UnderlineTitle from "@/src/components/commons/titles/underline";
import ControlRadio from "@/src/components/commons/inputs/radio/control";
import BasicUpload from "@/src/components/commons/uploads/basic";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useSelectMarker } from "@/src/hooks/maps/useSelectMarker";
import { useFirebase } from "@/src/hooks/firebase/useFirebase";
import { useFirebaseStorage } from "@/src/hooks/firebase/useFirebaseStorage";
import { useAddressSearch } from "@/src/hooks/useAddressSearch";

import type { IWriteFormData } from "./types";
import * as S from "./styles";

export default function BuildingWrite(): JSX.Element {
  const router = useRouter();
  const { register, handleSubmit, control, watch, setValue } = useForm<IWriteFormData>({});
  const { uploadFiles } = useFirebaseStorage();
  const { createFirebaseData } = useFirebase(); // 훅 사용

  // 파일 상태
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  // 모달창
  const [open, setOpen] = useState(false);
  const onToggle = (): void => {
    setOpen((prev) => !prev);
  };

  // 셀렉터
  const selectedType = watch("type");
  const getFirestoreCollectionName = (type: string | null): string => {
    switch (type) {
      case "아파트":
        return "apartment";
      default:
        return "";
    }
  };
  const selectedTypeEng = getFirestoreCollectionName(selectedType);

  // 주소 선택 기능
  const { selectedAddress, geocodeData, onCompleteAddressSearch } = useAddressSearch(setValue, onToggle);

  // 선택된 마커
  useSelectMarker(geocodeData);

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

  return (
    <>
      <S.Form onSubmit={handleSubmit(onClickSubmit)}>
        <S.InfoContainer>
          <UnderlineTitle label="매물 정보" />
          <S.InfoContent>
            <SelectControl required label="매물유형" name="type" control={control} notice="매물 유형을 선택하세요" selecteItems={["아파트"]} />
            <S.MapView>
              <S.AddressSearch>
                <S.InputWrap>
                  <TextFieldBasic required role="input-address" label="주소" value={selectedAddress} register={register("address")} />
                  <BasicModal btnText="주소 찾기" open={open} onToggle={onToggle}>
                    <DaumPostcodeEmbed onComplete={onCompleteAddressSearch} />
                  </BasicModal>
                </S.InputWrap>
                <S.InputWrap>
                  <TextFieldBasic required role="input-addressDetail" label="상세 주소" register={register("addressDetail")} />
                </S.InputWrap>
              </S.AddressSearch>
              <S.MapsWrap>
                {selectedAddress === "" ? (
                  <S.MapsCover>
                    주소를 검색하면
                    <br />
                    해당 위치가 지도에 표시됩니다.
                  </S.MapsCover>
                ) : (
                  <></>
                )}
                <div id="map"></div>
              </S.MapsWrap>
            </S.MapView>
            <S.InputWrap>
              <TextFieldBasic required role="input-area" type="number" step="0.01" label="매물 크기" register={register("area")} />
              <BasicUnit label="m²" />
              <TextFieldBasic required role="input-roomCount" type="number" label="방 개수" register={register("roomCount")} />
              <BasicUnit label="개" />
            </S.InputWrap>
          </S.InfoContent>
        </S.InfoContainer>

        <S.InfoContainer>
          <UnderlineTitle label="거래 정보" />
          <S.InfoContent>
            <S.InputWrap>
              <TextFieldBasic required role="input-price" type="number" label="매매가" register={register("price")} />
              <BasicUnit label="만원" />
            </S.InputWrap>
            <S.InputWrap>
              <TextFieldBasic required role="input-manageCost" type="number" label="관리비" register={register("manageCost")} />
              <BasicUnit label="만원" />
            </S.InputWrap>
          </S.InfoContent>
        </S.InfoContainer>

        <S.InfoContainer>
          <UnderlineTitle label="추가 정보" />
          <S.InfoContent>
            <S.InputWrap>
              <TextFieldBasic required role="input-addressDetail" type="number" label="층" register={register("floor")} />
              <BasicUnit label="층" />
            </S.InputWrap>
            <S.InputWrap>
              <TextFieldBasic required role="input-bathroom" type="number" label="욕실 수" register={register("bathroomCount")} />
              <BasicUnit label="개" />
            </S.InputWrap>
            <ControlRadio label="엘리베이터" selectLabel1="없음" selectLabel2="있음" name="elevator" control={control} />
          </S.InfoContent>
        </S.InfoContainer>

        <S.InfoContainer>
          <UnderlineTitle label="매물 설명" />
          <TextField id="outlined-multiline-flexible" label="설명 내용" multiline rows={5} {...register("desc")} />
        </S.InfoContainer>

        <S.InfoContainer>
          <UnderlineTitle label="사진 등록" desc="5MB 이하, jpeg/png/webp" />
          <BasicUpload onFilesChange={setSelectedFiles} />
        </S.InfoContainer>

        <S.Footer>
          <Button role="submit-button" type="submit" variant="contained">
            등록하기
          </Button>
        </S.Footer>
      </S.Form>
    </>
  );
}
