import { memo } from "react";

import Link from "next/link";
import ApartmentIcon from "@mui/icons-material/Apartment";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import OtherHousesIcon from "@mui/icons-material/OtherHouses";
import { motion } from "framer-motion";

import * as S from "./styles";

const mapsMenus = [
  { type: "apartment", title: "아파트", icon: <ApartmentIcon fontSize="medium" color="primary" /> },
  { type: "officetel", title: "오피스텔", icon: <HomeWorkIcon fontSize="medium" color="primary" /> },
  { type: "familyHousing", title: "빌라", icon: <OtherHousesIcon fontSize="medium" color="primary" /> },
];

function MapSelector({ buildingType }: { buildingType: string }): JSX.Element {
  return (
    <S.MapSelector>
      {mapsMenus.map((menu, index) => (
        <motion.div key={index} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link key={index} href={`/${menu.type}`} className={menu.type === buildingType ? "active" : ""}>
            <>{menu.icon}</>
            <span>{menu.title}</span>
          </Link>
        </motion.div>
      ))}
    </S.MapSelector>
  );
}

export default memo(MapSelector);
