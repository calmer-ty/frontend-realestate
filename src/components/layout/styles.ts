import styled from "@emotion/styled";
import { colors } from "@/src/commons/styles";

// Header
export const Header = styled.header`
  position: fixed;
  z-index: 100;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100vw;
  height: 3.75rem;
  padding: 0 1.25rem;
  border-bottom: 0.0625rem solid ${colors.outline};
  flex-shrink: 0;
  background-color: #fff;
`;

export const FakeHeader = styled.div`
  min-height: 3.75rem;
`;

// Nav
export const Nav = styled.nav`
  display: flex;
  align-items: center;
  column-gap: 20px;
`;
