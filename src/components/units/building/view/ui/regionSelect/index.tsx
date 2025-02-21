import { memo, useEffect, useState } from "react";
import { debounce } from "lodash"; // lodash의 debounce 함수 사용

import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { CITIES, REGION_DATA } from "@/src/commons/constants/regionData";
import * as S from "./styles";

import type { Dispatch, SetStateAction } from "react";
import type { SelectChangeEvent } from "@mui/material/Select";
interface IFindRegionParams {
  city: string;
  district: string;
}
interface IFindRegionReturn {
  regionCode: string;
  regionName: string;
}
interface IRegionSelectProps {
  setRegionName: Dispatch<SetStateAction<string | undefined>>;
  setRegionCode: Dispatch<SetStateAction<string | undefined>>;
}

const menuProps = {
  PaperProps: {
    style: {
      maxHeight: 200,
    },
  },
};

const findRegion = ({ city, district }: IFindRegionParams): IFindRegionReturn => {
  const region = REGION_DATA.find((data) => data.city === city && data.district === district);

  // region이 없으면 기본값을 제공
  if (region === undefined) {
    return {
      regionCode: "", // 기본값으로 빈 문자열
      regionName: "", // 기본값으로 빈 문자열
    };
  }

  const { city: findCity, district: findDistrict, regionCode } = region;
  return {
    regionCode,
    regionName: findCity === findDistrict ? findDistrict : `${findCity} ${findDistrict}`,
  };
};

const getDistrictsByCity = (city: string): string[] => {
  return REGION_DATA.filter((data) => data.city === city).map((data) => data.district);
};

function RegionSelect({ setRegionName, setRegionCode }: IRegionSelectProps): JSX.Element {
  const [city, setCity] = useState<string>("경기도"); // 기본 시
  const [district, setDistrict] = useState<string>("성남시 분당구"); // 기본 구

  // 디바운싱 처리된 함수
  const debouncedFetchRegion = debounce((city: string, district: string) => {
    const { regionCode, regionName } = findRegion({ city, district });
    setRegionCode(regionCode);
    setRegionName(regionName);
  }, 500); // 500ms 대기 후 실행

  // 구 선택에 따라 regionCode 업데이트
  useEffect(() => {
    if (district !== "") {
      debouncedFetchRegion(city, district);
    }
  }, [city, district, setRegionName, setRegionCode, debouncedFetchRegion]);

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
        <Select labelId="city-select-label" id="city-select" value={city} label="시" onChange={handleCityChange} MenuProps={menuProps}>
          <MenuItem value="" disabled>
            <em>시</em>
          </MenuItem>
          {CITIES.map((city) => (
            <MenuItem key={city} value={city}>
              {city}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <Select labelId="district-select-label" id="district-select" value={district} label="구" onChange={handleDistrictChange} disabled={city === ""} MenuProps={menuProps}>
          <MenuItem value="" disabled>
            <em>구</em>
          </MenuItem>
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

export default memo(RegionSelect);
