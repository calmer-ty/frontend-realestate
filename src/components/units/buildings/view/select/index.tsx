import { useEffect, useState } from "react";
import type { Dispatch, SetStateAction } from "react";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { CITIES, REGION_DATA } from "@/src/commons/constants/regionData";
import type { SelectChangeEvent } from "@mui/material/Select";
import * as S from "./styles";

interface IRegionSelectProps {
  setRegionCode: Dispatch<SetStateAction<string | undefined>>;
}

// 배열에서 regionCode를 찾는 함수
const findRegionCode = (city: string, district: string): string | undefined => {
  const region = REGION_DATA.find((item) => item.locataddNm === city && item.locallowNm === district);
  return region !== undefined ? region.regionCode : undefined;
};
// 선택된 시에 따라 구 목록 필터링 함수
const getDistrictsByCity = (city: string): string[] => {
  return REGION_DATA.filter((item) => item.locataddNm === city).map((item) => item.locallowNm);
};

export default function RegionSelect({ setRegionCode }: IRegionSelectProps): JSX.Element {
  const [city, setCity] = useState("서울특별시"); // 시 상태
  const [district, setDistrict] = useState("종로구"); // 구 상태

  // city와 district가 바뀔 때마다 onSelectionChange를 호출
  useEffect(() => {
    if (city !== "" && district !== "") {
      const code = findRegionCode(city, district); // 배열에서 regionCode 찾기
      setRegionCode(code);
    } else {
      setRegionCode(""); // 시와 구가 모두 선택되지 않으면 null 전달
    }
  }, [city, district, setRegionCode]); // city나 district가 바뀔 때마다 실행

  // 시 선택 핸들러
  const handleCityChange = (event: SelectChangeEvent): void => {
    setCity(event.target.value);
    setDistrict(""); // 구 선택 초기화
  };

  // 구 선택 핸들러
  const handleDistrictChange = (event: SelectChangeEvent): void => {
    setDistrict(event.target.value);
  };
  // 선택된 시에 따른 구 목록
  const districts = getDistrictsByCity(city);
  return (
    <S.Container>
      <FormControl fullWidth>
        {/* 시 셀렉트 */}
        <InputLabel id="city-select-label">시</InputLabel>
        <Select labelId="city-select-label" id="city-select" value={city} label="시" onChange={handleCityChange}>
          {CITIES.map((city) => (
            <MenuItem key={city} value={city}>
              {city}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        {/* 구 셀렉트 */}
        <InputLabel id="district-select-label">구</InputLabel>
        <Select labelId="district-select-label" id="district-select" value={district} label="구" onChange={handleDistrictChange} disabled={city === ""}>
          {typeof city === "string" &&
            districts.map((district) => (
              <MenuItem key={district} value={district}>
                {district}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </S.Container>
  );
}
