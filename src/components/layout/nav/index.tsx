"use client";

import Link from "next/link";
import Alert from "@mui/material/Alert";
import AuthButton from "@/src/components/commons/buttons/auth";
import BasicSnackbar from "@/src/components/commons/feedback/snackbar/basic";
import { useState } from "react";
import { useSession } from "next-auth/react";

export default function Nav(): JSX.Element {
  const [alertOpen, setAlertOpen] = useState(false);
  const { status } = useSession();
  const isAuthenticated = status === "authenticated";

  const alertClose = (): void => {
    setAlertOpen(false);
  };

  const moveToBuildingNew = (): void => {
    if (status === "unauthenticated") {
      setAlertOpen(true);
    }
  };

  return (
    <nav>
      <Link href={isAuthenticated ? "/new" : "/"} onClick={moveToBuildingNew}>
        방 내놓기
      </Link>
      <AuthButton />
      {/* 알림창 */}
      <BasicSnackbar open={alertOpen} close={alertClose}>
        <Alert onClose={alertClose} severity="warning">
          구글 로그인 세션이 없습니다. 계속하려면 로그인해 주세요.
        </Alert>
      </BasicSnackbar>
    </nav>
  );
}
