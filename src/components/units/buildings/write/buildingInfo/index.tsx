import { useState } from "react";
import { useMapsLoader } from "@/src/hooks/maps/useMapsLoader";
import { useAddressSearch } from "@/src/hooks/api/useAddressSearch";

import { Button } from "@mui/material";
import DaumPostcodeEmbed from "react-daum-postcode";
import UnderlineTitle from "@/src/components/commons/title/underline";
import BasicTextField from "@/src/components/commons/input/textField/basic";
import ControlTextField from "@/src/components/commons/input/textField/control";
import BasicModal from "@/src/components/commons/modal/basic";
import InputUnit from "../ui/inputUnit";
import WriteRadio from "../ui/writeRadio";
// import WriteSelect from "../ui/writeSelect";

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

  const onMapLoaded = (map: any): void => {
    if (geocodeData !== null) {
      const markerPosition = new window.naver.maps.LatLng(geocodeData.latitude, geocodeData.longitude);

      // 마커를 변수에 저장하고 이를 활용
      const marker = new window.naver.maps.Marker({
        position: markerPosition,
        map,
      });
      marker.setMap(map);

      // 지도 중심을 마커 위치로 이동
      map.setCenter(markerPosition);
    }
  };
  useMapsLoader({
    onMapLoaded,
  });

  return (
    <>
      <section>
        <UnderlineTitle label="매물 정보" />
        <WriteRadio label="매물유형" name="buildingType" selectLabels={["아파트", "오피스텔", "연립다세대"]} control={control} />
        {/* <WriteSelect required label="매물유형" name="buildingType" control={control} notice="매물 유형을 선택하세요" selecteItems={["아파트"]} /> */}
        <S.MapView>
          <S.AddressSearch>
            <div className="left">
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
        <div className="inputWrap">
          <InputUnit label="매물 크기" type="number" register={register("area", { valueAsNumber: true })} unitLabel="m²" step="0.01" />
          <InputUnit label="방 개수" type="number" register={register("roomCount", { valueAsNumber: true })} unitLabel="개" />
        </div>
      </section>

      {/* 주소찾기 모달 */}
      <BasicModal open={modalOpen} onToggle={onModalToggle}>
        <DaumPostcodeEmbed onComplete={onCompleteAddressSearch} style={{ height: "466px" }} />
      </BasicModal>
    </>
  );
}
