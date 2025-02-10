import Link from "next/link";
import ApartmentIcon from "@mui/icons-material/Apartment";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import OtherHousesIcon from "@mui/icons-material/OtherHouses";
import * as S from "./styles";
import { memo } from "react";

interface MapsMenuProps {
  buildingType: string;
}

function MapsMenu({ buildingType }: MapsMenuProps): JSX.Element {
  return (
    <S.MapsMenu>
      <Link href={"/apartment"} className={buildingType === "apartment" ? "active" : ""}>
        <ApartmentIcon fontSize="medium" color="primary" />
        <span>아파트</span>
      </Link>
      <Link href={"/officetel"} className={buildingType === "officetel" ? "active" : ""}>
        <HomeWorkIcon fontSize="medium" color="primary" />
        <span>오피스텔</span>
      </Link>
      <Link href={"/familyHousing"} className={buildingType === "familyHousing" ? "active" : ""}>
        <OtherHousesIcon fontSize="medium" color="primary" />
        <span>빌라</span>
      </Link>
    </S.MapsMenu>
  );
}

export default memo(MapsMenu);
