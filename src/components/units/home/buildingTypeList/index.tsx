import ListItem from "./listItem";

import Link from "next/link";

import LocationCityIcon from "@mui/icons-material/LocationCity";
import MapsHomeWorkIcon from "@mui/icons-material/MapsHomeWork";
import HomeIcon from "@mui/icons-material/Home";

import * as S from "./styles";

export default function BuildingTypeList(): JSX.Element {
  return (
    <S.Container>
      <div className="inner">
        <Link href={`/apartment`}>
          <ListItem title="아파트" desc="거래된 목록들이 지도에!" icon={<LocationCityIcon fontSize="large" color="primary" />} isDisabled={false} />
        </Link>
        <ListItem title="주택/빌라" desc="준비중" icon={<HomeIcon fontSize="large" color="primary" />} isDisabled={true} />
        <ListItem title="오피스텔" desc="준비중" icon={<MapsHomeWorkIcon fontSize="large" color="primary" />} isDisabled={true} />
      </div>
    </S.Container>
  );
}
