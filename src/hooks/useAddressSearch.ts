import axios from "axios";
import { useState } from "react";

import type { Address } from "react-daum-postcode";
import type { UseFormSetValue } from "react-hook-form";
import type { IGeocodeData, IUseAddressSearchProps } from "@/src/commons/types";
import type { IWriteFormData } from "@/src/components/units/buildings/write/types";

export const useAddressSearch = (setValue: UseFormSetValue<IWriteFormData>, onToggle: () => void): IUseAddressSearchProps => {
  const [selectedAddress, setSelectedAddress] = useState<string>("");
  const [geocodeData, setGeocodeData] = useState<IGeocodeData | null>(null);

  const onCompleteAddressSearch = async (data: Address): Promise<void> => {
    const selectedAddress = data.address; // 검색된 주소를 선택하고
    setSelectedAddress(selectedAddress); // 상태 변수에 설정합니다
    setValue("address", selectedAddress); // 폼의 'address' 필드에 선택된 주소를 설정합니다
    onToggle(); // 주소 검색 완료 후 모달 닫기

    try {
      const response = await axios.get<IGeocodeData>(`/api/fetchSelectGeocode?address=${encodeURIComponent(selectedAddress)}`);
      setGeocodeData(response.data);
    } catch (error) {
      console.error("Error fetching geocode data:", error);
    }
  };
  return { selectedAddress, geocodeData, onCompleteAddressSearch };
};
