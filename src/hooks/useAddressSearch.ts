import axios from "axios";
import { useState } from "react";

import type { Address } from "react-daum-postcode";
import type { UseFormGetValues, UseFormSetValue } from "react-hook-form";
import type { IGeocode, IWriteForm } from "@/src/commons/types";
interface IUseAddressSearchReturn {
  selectedAddress: string;
  geocodeData: IGeocode | null;
  onCompleteAddressSearch: (data: Address) => Promise<void>;
}
interface IUseAddressSearchProps {
  setValue: UseFormSetValue<IWriteForm>;
  getValues: UseFormGetValues<IWriteForm>;
  onModalToggle: () => void;
}

export const useAddressSearch = ({ setValue, getValues, onModalToggle }: IUseAddressSearchProps): IUseAddressSearchReturn => {
  const [selectedAddress, setSelectedAddress] = useState<string>("");
  const [geocodeData, setGeocodeData] = useState<IGeocode | null>(null);
  const currentAddress = getValues("address");

  const fetchGeocode = async (address: string): Promise<void> => {
    try {
      const response = await axios.get<IGeocode>(`/api/fetchSelectGeocode?address=${encodeURIComponent(address)}`);
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
    const selectedAddress = data.address; // 검색된 주소를 선택하고
    setSelectedAddress(selectedAddress); // 상태 변수에 설정합니다
    setValue("address", selectedAddress); // 폼의 'address' 필드에 선택된 주소를 설정합니다
    onModalToggle(); // 주소 검색 완료 후 모달 닫기
    void fetchGeocode(selectedAddress);
  };
  return { selectedAddress, geocodeData, onCompleteAddressSearch };
};
