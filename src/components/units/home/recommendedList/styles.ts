import styled from "@emotion/styled";
import { colors } from "@/src/commons/styles";

export const Container = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1.5;
  .inner {
    display: flex;
    flex-direction: column;
    min-width: 22.5rem;
    h3 {
      margin-bottom: 0.75rem;
      text-align: center;
    }
    .slick-dots {
      bottom: -1.25rem;
    }
  }
`;

export const ListItem = styled.div`
  width: max-content;
  margin: 0 auto;

  a {
    display: flex;
    flex-direction: column;
    row-gap: 0.5rem;
    position: relative;
    transition: background-color 100ms ease-in-out;
    padding: 0.5rem;

    figure {
      position: relative;
      width: 15rem;
      height: 9rem;

      /* 이미지 랩 */
      &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        transition: background-color 100ms ease-in-out;
      }
    }

    /* buildingDesc */
    > p.buildingDesc {
      display: flex;
      flex-direction: column;
      > strong {
        margin-bottom: 0.25rem;
      }
    }

    &:hover {
      background-color: ${colors.hover};

      figure::after {
        background-color: ${colors.cover};
      }
    }
  }
`;
