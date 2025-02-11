import styled from "@emotion/styled";
import { mediaQueries, colors } from "@/src/commons/styles";
import { css } from "@emotion/react";

import HomeWorkIcon from "@mui/icons-material/HomeWork";
import { Button } from "@mui/material";

// Header
export const Header = styled.header`
  position: fixed;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100vw;
  height: 3.75rem;
  padding: 0 1.25rem;
  border-bottom: 0.0625rem solid ${colors.outline};
  flex-shrink: 0;
  background-color: #fff;

  ${mediaQueries.mobile2(css`
    font-size: 16px;
    height: 60px;
  `)}
`;
export const Logo = styled(HomeWorkIcon)`
  width: 2.125rem;
  height: 2.125rem;

  ${mediaQueries.mobile2(css`
    width: 34px;
    height: 34px;
  `)}
`;
export const FakeHeader = styled.div`
  height: 3.75rem;

  ${mediaQueries.mobile2(css`
    height: 60px;
  `)}
`;

// Nav
export const Nav = styled.nav`
  display: flex;
  align-items: center;
  column-gap: 20px;
`;
export const RoomButton = styled(Button)`
  font-size: 1rem;
  ${mediaQueries.mobile2(css`
    font-size: 16px;
  `)}
`;
