"use client";

import Link from "next/link";
import Alert from "@mui/material/Alert";
import AuthButton from "@/src/components/commons/buttons/auth";
import BasicSnackbar from "@/src/components/commons/feedback/snackbar/basic";
import { useState } from "react";
import { useSession } from "next-auth/react";
import type { MouseEvent } from "react";

export default function Nav(): JSX.Element {
  const { status } = useSession();
  const isAuthenticated = status === "authenticated";

  const [open, setOpen] = useState(false);
  const handleClose = (): void => {
    setOpen(false); // 모달 닫기
  };

  const moveToBuildingNew = (e: MouseEvent<HTMLAnchorElement>): void => {
    if (status === "unauthenticated") {
      setOpen(true);
    }
  };

  return (
    <nav>
      <Link href={isAuthenticated ? "/new" : "/"} onClick={moveToBuildingNew}>
        방 내놓기
      </Link>
      <AuthButton />
      <BasicSnackbar open={open} close={handleClose}>
        <Alert onClose={handleClose} severity="warning">
          구글 로그인 세션이 없습니다. 계속하려면 로그인해 주세요.
        </Alert>
      </BasicSnackbar>
    </nav>
  );
}
