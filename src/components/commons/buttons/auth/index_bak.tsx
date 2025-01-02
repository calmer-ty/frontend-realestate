import Link from "next/link";
import { Button, Menu, MenuItem } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthButton(): JSX.Element {
  const { data: session } = useSession();

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (): void => {
    setAnchorEl(null);
  };

  return (
    <>
      {session == null ? (
        <Button onClick={() => signIn("google")} variant="contained" startIcon={<GoogleIcon />}>
          구글 로그인
        </Button>
      ) : (
        <div style={{ display: "flex", alignItems: "center" }}>
          <p>Welcome, {session.user?.name}</p>

          <Button id="basic-button" aria-controls={open ? "basic-menu" : undefined} aria-haspopup="true" aria-expanded={open ? "true" : undefined} onClick={handleClick} sx={{ minWidth: "36px" }}>
            <KeyboardArrowDownIcon />
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleClose}>
              <Link href={"/list"}>내 매물 보기</Link>
            </MenuItem>
            <MenuItem onClick={() => signOut()}>로그아웃</MenuItem>
          </Menu>
        </div>
      )}
    </>
  );
}
