import axios from "axios";
import { useState } from "react";
import { useMapsLoader } from "@/src/commons/hooks/maps/useMapsLoader";
import { DaumPostcodeEmbed } from "react-daum-postcode";

import { Button } from "@mui/material";
import UnderlineTitle from "@/src/components/commons/title/underline";
import BasicTextField from "@/src/components/commons/input/textField/basic";
import ControlTextField from "@/src/components/commons/input/textField/control";
import BasicModal from "@/src/components/commons/modal/basic";
import InputUnit from "./ui/inputUnit";
import WriteRadio from "./ui/writeRadio";

import { getFullCityName } from "@/src/commons/libraries/utils/convertCityName";

import * as S from "./styles";

import type { Address } from "react-daum-postcode";
import type { Control, UseFormGetValues, UseFormRegister, UseFormSetValue } from "react-hook-form";
import type { IGeocode, IWriteForm } from "@/src/commons/types";

interface IBuildingInfoProps {
  register: UseFormRegister<IWriteForm>;
  setValue: UseFormSetValue<IWriteForm>;
  getValues: UseFormGetValues<IWriteForm>;
  control: Control<IWriteForm, any>;
}

export default function BuildingInfo({ setValue, getValues, register, control }: IBuildingInfoProps): JSX.Element {
  const [modalOpen, setModalOpen] = useState(false);
  const onModalToggle = (): void => {
    setModalOpen((prev) => !prev);
  };

  // 지도 검색 로직
  const [selectedAddress, setSelectedAddress] = useState<string>("");
  const [geocodeData, setGeocodeData] = useState<IGeocode | undefined>(undefined);
  const currentAddress = getValues("address");

  const fetchGeocode = async (address: string): Promise<void> => {
    try {
      const response = await axios.get<IGeocode>("/api/fetchAddressSearch", {
        params: { address },
      });
      setGeocodeData(response.data);
    } catch (error) {
      console.error("Error fetching geocode data:", error);
    }
  };

  if (typeof currentAddress === "string" && currentAddress !== selectedAddress) {
    setSelectedAddress(currentAddress); // 기존 주소를 selectedAddress에 설정
    void fetchGeocode(currentAddress); // 기존 주소에 대한 지오코드 데이터 가져오기
  }

  const onCompleteAddressSearch = async (data: Address): Promise<void> => {
    const selectedAddress = getFullCityName(data.address); // 검색된 주소를 선택하고 시/도명을 바꿈

    setSelectedAddress(selectedAddress); // 상태 변수에 설정합니다
    setValue("address", selectedAddress); // 폼의 'address' 필드에 선택된 주소를 설정합니다
    onModalToggle(); // 주소 검색 완료 후 모달 닫기
    void fetchGeocode(selectedAddress);
  };

  const onMapLoaded = (map: any): void => {
    if (geocodeData !== undefined) {
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
        <WriteRadio label="매물유형" name="buildingType" selectLabels={["아파트", "오피스텔", "빌라"]} control={control} />
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
      <BasicModal open={modalOpen} onClose={onModalToggle}>
        <DaumPostcodeEmbed onComplete={onCompleteAddressSearch} />
      </BasicModal>
    </>
  );
}
