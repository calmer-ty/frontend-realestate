import styled from "@emotion/styled";
import { colors } from "@/src/commons/styles";

export const Header = styled.header`
  position: fixed;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 60px;
  padding: 0 20px;
  border-bottom: 1px solid ${colors.outline};
  flex-shrink: 0;
  background-color: #fff;
`;
