import { useEffect, useState } from "react";
import type { Dispatch, SetStateAction } from "react";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import * as S from "./styles";
import type { SelectChangeEvent } from "@mui/material/Select";

// 시 목록
const cities = [
  { id: 10, name: "서울특별시" },
  { id: 20, name: "부산광역시" },
  { id: 30, name: "인천광역시" },
];

// 구 목록 (시별로 다르게 설정)
const districtsMap: Record<string, Array<{ id: number; name: string }>> = {
  서울특별시: [
    { id: 10, name: "강남구" },
    { id: 20, name: "마포구" },
    { id: 30, name: "종로구" },
  ],
  부산광역시: [
    { id: 10, name: "해운대구" },
    { id: 20, name: "중구구" },
    { id: 30, name: "서구구" },
  ],
  인천광역시: [
    { id: 10, name: "부평구" },
    { id: 20, name: "남동구" },
    { id: 30, name: "계양구" },
  ],
};

interface IRegionSelectProps {
  setRegionCode: Dispatch<SetStateAction<string | undefined>>;
}

const regionCodeMap: Record<string, string> = {
  "서울특별시 종로구": "11110",
};

export default function RegionSelect({ setRegionCode }: IRegionSelectProps): JSX.Element {
  const [city, setCity] = useState("서울특별시"); // 시 상태
  const [district, setDistrict] = useState("종로구"); // 구 상태

  // city와 district가 바뀔 때마다 onSelectionChange를 호출
  useEffect(() => {
    if (city !== "" && district !== "") {
      const region = `${city} ${district}`;
      const code = regionCodeMap[region];
      setRegionCode(code); // 부모로 region 전달
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
  return (
    <S.Container>
      <FormControl fullWidth>
        {/* 시 셀렉트 */}
        <InputLabel id="city-select-label">시</InputLabel>
        <Select labelId="city-select-label" id="city-select" value={city} label="시" onChange={handleCityChange}>
          {cities.map((cityItem) => (
            <MenuItem key={cityItem.id} value={cityItem.name}>
              {cityItem.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        {/* 구 셀렉트 */}
        <InputLabel id="district-select-label">구</InputLabel>
        <Select labelId="district-select-label" id="district-select" value={district} label="구" onChange={handleDistrictChange} disabled={city === ""}>
          {typeof city === "string" &&
            districtsMap[city]?.map((districtItem) => (
              <MenuItem key={districtItem.id} value={districtItem.name}>
                {districtItem.name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </S.Container>
  );
}
