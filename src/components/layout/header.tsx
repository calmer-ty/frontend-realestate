import Link from "next/link";

import Nav from "./nav";
import LocationCityIcon from "@mui/icons-material/LocationCity";

import * as S from "./styles";

export default function Header(): JSX.Element {
  return (
    <>
      <S.Header>
        <h1 id="logo">
          <Link href="/">
            <LocationCityIcon color="primary" fontSize="large" />
          </Link>
        </h1>
        <Nav />
      </S.Header>
      <S.FakeHeader />
    </>
  );
}
