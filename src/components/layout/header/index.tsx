"use client";

// import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
import Nav from "../nav";
import HomeWorkIcon from "@mui/icons-material/HomeWork";

import * as S from "./styles";
import Link from "next/link";

export default function Header(): JSX.Element {
  return (
    <S.Header>
      <h1 id="logo">
        <Link href="/">
          <HomeWorkIcon color="primary" fontSize="large" />
        </Link>
      </h1>
      {/* <Box sx={{ flexGrow: 1, backgroundColor: "black" }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton> */}
      {/* <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              News
            </Typography> */}
      <Nav />
      {/* </Toolbar>
        </AppBar>
      </Box> */}
    </S.Header>
  );
}
