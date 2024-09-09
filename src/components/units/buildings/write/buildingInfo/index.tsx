import DaumPostcodeEmbed from "react-daum-postcode";
import UnderlineTitle from "@/src/components/commons/titles/underline";
import SelectControl from "@/src/components/commons/inputs/select/control";
import TextFieldBasic from "@/src/components/commons/inputs/textField/basic";
import BasicModal from "@/src/components/commons/modal/basic";
import BasicUnit from "@/src/components/commons/units/basic";
import { useState } from "react";
import { useAddressSearch } from "@/src/hooks/useAddressSearch";
import { useSelectMarker } from "@/src/hooks/maps/useSelectMarker";
import type { IBuildingInfoProps } from "./types";
import * as S from "./styles";

export default function BuildingInfo(props: IBuildingInfoProps): JSX.Element {
  const { register, setValue, control } = props;
  const [open, setOpen] = useState(false);
  const onToggle = (): void => {
    setOpen((prev) => !prev);
  };
  const { selectedAddress, onCompleteAddressSearch, geocodeData } = useAddressSearch(setValue, onToggle);
  useSelectMarker(geocodeData);

  return (
    <section>
      <UnderlineTitle label="매물 정보" />
      <SelectControl required label="매물유형" name="type" control={control} notice="매물 유형을 선택하세요" selecteItems={["아파트"]} />
      <S.MapView>
        <S.AddressSearch>
          <div className="inputUnit">
            <TextFieldBasic required role="input-address" label="주소" value={selectedAddress} register={register("address")} />
            <BasicModal btnText="주소 찾기" open={open} onToggle={onToggle}>
              <DaumPostcodeEmbed onComplete={onCompleteAddressSearch} />
            </BasicModal>
          </div>
          <TextFieldBasic required role="input-addressDetail" label="상세 주소" register={register("addressDetail")} />
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
          <TextFieldBasic required role="input-area" type="number" step="0.01" label="매물 크기" register={register("area")} />
          <BasicUnit label="m²" />
        </div>
        <div className="inputUnit">
          <TextFieldBasic required role="input-roomCount" type="number" label="방 개수" register={register("roomCount")} />
          <BasicUnit label="개" />
        </div>
      </S.TwinInputWrap>
    </section>
  );
}
