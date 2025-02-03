"use client";

// import { useState } from "react";
import { useAuth } from "@/src/hooks/useAuth";

import Link from "next/link";
import AuthButton from "@/src/components/commons/button/auth/index";
import { Button } from "@mui/material";

import * as S from "./styles";
import BasicAlert from "../../commons/alert/basic";
import { useAlert } from "@/src/hooks/useAlert";

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
        <Link href={user !== null ? "/new" : "/"} onClick={moveToBuildingNew}>
          <Button variant="contained">방 내놓기</Button>
        </Link>
        <AuthButton />
      </S.Nav>
      {/* 알림창 */}
      <BasicAlert open={alertOpen} close={alertClose} severity="warning" text="구글 로그인 세션이 없습니다. 계속하려면 로그인해 주세요." />
    </>
  );
}
