import { signIn, signOut, useSession } from "next-auth/react";

import { Button, MenuItem } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import BasicMenu from "@/src/components/commons/navigation/menu/basic";

export default function AuthButton(): JSX.Element {
  const { data: session } = useSession();

  return (
    <>
      {session == null ? (
        <Button onClick={() => signIn("google")} variant="contained" startIcon={<GoogleIcon />}>
          구글 로그인
        </Button>
      ) : (
        <div style={{ display: "flex", alignItems: "center" }}>
          <p>Welcome, {session.user?.name}</p>
          <BasicMenu>
            <MenuItem>내 매물 보기</MenuItem>
            <MenuItem onClick={() => signOut()}>로그아웃</MenuItem>
          </BasicMenu>
        </div>
      )}
    </>
  );
}
