import styled from "@emotion/styled";
import { colors } from "@/src/commons/styles";

// ListItem
export const ListItem = styled.div`
  overflow: hidden;
  display: flex;

  justify-content: center;
  align-items: center;
  position: relative;
  height: 5rem;
  margin: 0 1.25rem;
  opacity: 0.8;
  border-radius: 0.5rem;
  background-color: ${colors.background};
  cursor: pointer;

  a {
    display: flex;
    flex-direction: column;
    /* align-items: center; */
    justify-content: center;
    text-indent: 2.5rem;
    width: 100%;
    height: 100%;
    pointer-events: none;

    h2 {
      display: flex;
      flex-direction: column;
      row-gap: 0.625rem;
      width: 9rem;
    }

    .iconWrap {
      position: absolute;
      right: 0.75rem;
      bottom: 0.5rem;
    }
  }
`;
