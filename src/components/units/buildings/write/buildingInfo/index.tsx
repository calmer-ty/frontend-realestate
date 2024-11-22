import { useState } from "react";
import { useAddressSearch } from "@/src/hooks/useAddressSearch";
import { useSelectMarker } from "../hooks/useSelectMarker";

import { Button } from "@mui/material";
import DaumPostcodeEmbed from "react-daum-postcode";
import UnderlineTitle from "@/src/components/commons/titles/underline";
import ControlSelect from "@/src/components/commons/inputs/select/control";
import BasicTextField from "@/src/components/commons/inputs/textField/basic";
import ControlTextField from "@/src/components/commons/inputs/textField/control";
import BasicModal from "@/src/components/commons/modal/basic";
import BasicUnit from "@/src/components/commons/units/basic";

import type { IBuildingInfoProps } from "./types";
import * as S from "./styles";

export default function BuildingInfo(props: IBuildingInfoProps): JSX.Element {
  const [modalOpen, setModalOpen] = useState(false);
  const onModalToggle = (): void => {
    setModalOpen((prev) => !prev);
  };

  const { selectedAddress, onCompleteAddressSearch, geocodeData } = useAddressSearch(props.setValue, props.getValues, onModalToggle);

  useSelectMarker(geocodeData);

  return (
    <>
      <section>
        <UnderlineTitle label="매물 정보" />
        <ControlSelect required label="매물유형" name="type" control={props.control} notice="매물 유형을 선택하세요" selecteItems={["아파트"]} />
        <S.MapView>
          <S.AddressSearch>
            <div className="inputUnit">
              <ControlTextField required readOnly label="주소" register={props.register("address")} />
              <Button sx={{ flexShrink: 0 }} variant="outlined" onClick={onModalToggle}>
                주소 찾기
              </Button>
            </div>
            <BasicTextField required label="상세 주소" register={props.register("addressDetail")} />
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
            <BasicTextField required label="매물 크기" type="number" step="0.01" register={props.register("area")} />
            <BasicUnit label="m²" />
          </div>
          <div className="inputUnit">
            <BasicTextField required label="방 개수" type="number" register={props.register("roomCount")} />
            <BasicUnit label="개" />
          </div>
        </S.TwinInputWrap>
      </section>
      <BasicModal open={modalOpen} onToggle={onModalToggle}>
        <DaumPostcodeEmbed onComplete={onCompleteAddressSearch} />
      </BasicModal>
    </>
  );
}
