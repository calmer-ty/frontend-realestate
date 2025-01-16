import { useState } from "react";
import { useSelectMarker } from "../../hooks/useSelectMarker";
import { useAddressSearch } from "@/src/hooks/useAddressSearch";

import { Button } from "@mui/material";
import DaumPostcodeEmbed from "react-daum-postcode";
import UnderlineTitle from "@/src/components/commons/titles/underline";
import ControlSelect from "@/src/components/commons/inputs/select/control";
import BasicTextField from "@/src/components/commons/inputs/textField/basic";
import ControlTextField from "@/src/components/commons/inputs/textField/control";
import BasicModal from "@/src/components/commons/modal/basic";
import BasicUnit from "@/src/components/commons/units/basic";

import * as S from "./styles";

import type { Control, UseFormGetValues, UseFormRegister, UseFormSetValue } from "react-hook-form";
import type { IWriteForm } from "@/src/commons/types";
interface IBuildingInfoProps {
  register: UseFormRegister<IWriteForm>;
  setValue: UseFormSetValue<IWriteForm>;
  getValues: UseFormGetValues<IWriteForm>;
  control: Control<IWriteForm, any>;
}

export default function BuildingInfo(props: IBuildingInfoProps): JSX.Element {
  const { setValue, getValues, register, control } = props;
  const [modalOpen, setModalOpen] = useState(false);
  const onModalToggle = (): void => {
    setModalOpen((prev) => !prev);
  };

  const { selectedAddress, onCompleteAddressSearch, geocodeData } = useAddressSearch({ setValue, getValues, onModalToggle });

  useSelectMarker(geocodeData);

  return (
    <>
      <section>
        <UnderlineTitle label="매물 정보" />
        <ControlSelect required label="매물유형" name="type" control={control} notice="매물 유형을 선택하세요" selecteItems={["아파트"]} />
        <S.MapView>
          <S.AddressSearch>
            <div className="inputUnit">
              <ControlTextField required readOnly label="주소" register={register("address")} />
              <Button sx={{ flexShrink: 0 }} variant="outlined" onClick={onModalToggle}>
                주소 찾기
              </Button>
            </div>
            <BasicTextField required label="상세 주소" register={register("addressDetail")} />
          </S.AddressSearch>
          <S.MapsWrap>
            {selectedAddress === "" ? (
              <div className="mapCover">
                주소를 검색하면
                <br />
                해당 위치가 지도에 표시됩니다.
              </div>
            ) : (
              <></>
            )}
            <div id="map"></div>
          </S.MapsWrap>
        </S.MapView>
        <S.TwinInputWrap>
          <div className="inputUnit">
            <BasicTextField required label="매물 크기" type="number" step="0.01" register={register("area")} />
            <BasicUnit label="m²" />
          </div>
          <div className="inputUnit">
            <BasicTextField required label="방 개수" type="number" register={register("roomCount")} />
            <BasicUnit label="개" />
          </div>
        </S.TwinInputWrap>
      </section>

      {/* 주소찾기 모달 */}
      <BasicModal open={modalOpen} onToggle={onModalToggle}>
        <DaumPostcodeEmbed onComplete={onCompleteAddressSearch} style={{ height: "466px" }} />
      </BasicModal>
    </>
  );
}
