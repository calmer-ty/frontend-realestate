"use client";

import { useAuth } from "@/src/hooks/useAuth";
import { useAlert } from "@/src/hooks/useAlert";

import Link from "next/link";
import AuthButton from "@/src/components/commons/button/auth";
import BasicAlert from "../commons/alert/basic";
import { Button } from "@mui/material";

import * as S from "./styles";

export default function Nav(): JSX.Element {
  const { user } = useAuth();

  const { alertOpen, alertClose, setAlertOpen } = useAlert();
  const moveToBuildingNew = (): void => {
    if (user === null) {
      setAlertOpen(true);
    }
  };

  return (
    <>
      <S.Nav>
        <Link href={user !== null ? "/user/new" : "/"} onClick={moveToBuildingNew}>
          {/* <Button variant="contained">방 내놓기</Button> */}
          <Button variant="contained">금융 스텟 등록</Button>
        </Link>
        <AuthButton />
      </S.Nav>
      {/* 알림창 */}
      <BasicAlert open={alertOpen} close={alertClose} severity="warning" text="구글 로그인 세션이 없습니다. 계속하려면 로그인해 주세요." />
    </>
  );
}
