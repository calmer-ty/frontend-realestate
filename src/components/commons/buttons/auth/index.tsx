import { useEffect, useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { useAuth } from "@/src/hooks/useAuth";
import { auth, googleProvider } from "@/src/commons/libraries/firebase/firebaseApp";

import Link from "next/link";
import { Button, Menu, MenuItem } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import * as S from "./styles";

export default function AuthButton(): JSX.Element {
  const { user } = useAuth();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl) && user != null;

  useEffect(() => {
    if (user === null) {
      setAnchorEl(null); // 로그아웃 상태에서 anchorEl 초기화
    }
  }, [user]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (): void => {
    setAnchorEl(null);
  };

  // Google 로그인 처리
  const handleGoogleLogin = async (): Promise<void> => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log("로그인 성공:", user);
    } catch (error) {
      console.error("로그인 실패:", error);
    }
  };

  // 로그아웃 처리
  const handleLogout = async (): Promise<void> => {
    try {
      await auth.signOut();
      console.log("로그아웃 성공");
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
  };

  return (
    <>
      {user == null ? (
        <Button onClick={handleGoogleLogin} variant="contained" startIcon={<GoogleIcon />}>
          구글 로그인
        </Button>
      ) : (
        <S.OnLogin>
          <p>Welcome, {user.displayName}</p>

          {/* 화살표 */}
          <Button id="basic-button" aria-controls={open ? "basic-menu" : undefined} aria-haspopup="true" aria-expanded={open ? "true" : undefined} onClick={handleClick} sx={{ minWidth: "36px" }}>
            <KeyboardArrowDownIcon />
          </Button>
          {/* 유저 메뉴 */}
          <Menu id="basic-menu" anchorEl={anchorEl} open={open} onClose={handleClose} MenuListProps={{ "aria-labelledby": "basic-button" }}>
            <MenuItem onClick={handleClose}>
              <Link href={"/list"}>내 매물 보기</Link>
            </MenuItem>
            <MenuItem onClick={handleLogout}>로그아웃</MenuItem>
          </Menu>
        </S.OnLogin>
      )}
    </>
  );
}
