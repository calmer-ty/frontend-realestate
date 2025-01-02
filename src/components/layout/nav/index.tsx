"use client";

import { useState } from "react";
import { useAuth } from "@/src/hooks/useAuth";

import Link from "next/link";
import Alert from "@mui/material/Alert";
import AuthButton from "@/src/components/commons/buttons/auth/index";
import BasicSnackbar from "@/src/components/commons/feedback/snackbar/basic";
import { Button } from "@mui/material";

import * as S from "./styles";

export default function Nav(): JSX.Element {
  const [alertOpen, setAlertOpen] = useState(false);

  const { user } = useAuth(); // Firebase 인증 상태로 변경

  const alertClose = (): void => {
    setAlertOpen(false);
  };

  const moveToBuildingNew = (): void => {
    if (status === "unauthenticated") {
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
      <BasicSnackbar open={alertOpen} close={alertClose}>
        <Alert onClose={alertClose} severity="warning">
          구글 로그인 세션이 없습니다. 계속하려면 로그인해 주세요.
        </Alert>
      </BasicSnackbar>
    </>
  );
}
