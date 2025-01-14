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

const findRegionCode = (city: string, district: string): string | undefined => {
  const region = REGION_DATA.find((data) => data.city === city && data.district === district);
  return region?.regionCode;
};

const getDistrictsByCity = (city: string): string[] => {
  return REGION_DATA.filter((data) => data.city === city).map((data) => data.district);
};

export default function RegionSelect({ setRegionCode }: IRegionSelectProps): JSX.Element {
  const [city, setCity] = useState<string>("서울특별시"); // 기본 시
  const [district, setDistrict] = useState<string>(""); // 기본 구

  // 구 선택에 따라 regionCode 업데이트
  useEffect(() => {
    if (district !== "") {
      const code = findRegionCode(city, district);
      setRegionCode(code);
    }
  }, [city, district, setRegionCode]);

  // 시 변경 핸들러
  const handleCityChange = (event: SelectChangeEvent): void => {
    const newCity = event.target.value;
    setCity(newCity);
    setDistrict(""); // 구 초기화
  };

  // 구 변경 핸들러
  const handleDistrictChange = (event: SelectChangeEvent): void => {
    setDistrict(event.target.value);
  };

  const districts = getDistrictsByCity(city);

  return (
    <S.Container>
      <FormControl fullWidth>
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
        <InputLabel id="district-select-label">구</InputLabel>
        <Select labelId="district-select-label" id="district-select" value={district} label="구" onChange={handleDistrictChange} disabled={city === ""}>
          {districts.map((district) => (
            <MenuItem key={district} value={district}>
              {district}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </S.Container>
  );
}
