import { memo } from "react";

import Link from "next/link";
import ApartmentIcon from "@mui/icons-material/Apartment";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import OtherHousesIcon from "@mui/icons-material/OtherHouses";

import * as S from "./styles";

interface MapsMenuProps {
  buildingType: string;
}

const mapsMenus = [
  { type: "apartment", title: "아파트", icon: <ApartmentIcon fontSize="medium" color="primary" /> },
  { type: "officetel", title: "오피스텔", icon: <HomeWorkIcon fontSize="medium" color="primary" /> },
  { type: "familyHousing", title: "빌라", icon: <OtherHousesIcon fontSize="medium" color="primary" /> },
];

function MapsMenu({ buildingType }: MapsMenuProps): JSX.Element {
  return (
    <S.MapsMenu>
      {mapsMenus.map((menu, index) => (
        <Link key={index} href={`/${menu.type}`} className={menu.type === buildingType ? "active" : ""}>
          <>{menu.icon}</>
          <span>{menu.title}</span>
        </Link>
      ))}
    </S.MapsMenu>
  );
}

export default memo(MapsMenu);
