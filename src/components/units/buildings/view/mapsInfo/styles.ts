import styled from "@emotion/styled";

interface IScroll {
  scroll: boolean;
}

export const Container = styled.aside<IScroll>`
  overflow-y: auto;
  border-right: 1px solid #dedede;
  background-color: #fff;
  position: absolute;
  z-index: 101;
  min-width: 300px;
`;
