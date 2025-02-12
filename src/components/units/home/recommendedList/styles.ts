import styled from "@emotion/styled";

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
      margin-bottom: 1rem;
      text-align: center;
    }
    .slick-dots {
      bottom: -1.875rem;
    }
  }
`;

export const ListItem = styled.div`
  width: 16rem;
  margin: 0 auto;

  a {
    display: flex;
    flex-direction: column;
    row-gap: 0.5rem;
    position: relative;

    figure {
      position: relative;
      width: 16rem;
      height: 10rem;

      /* 이미지 랩 */
      ::before {
        content: "";
        display: none;
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: #000;
        opacity: 0.3;
        z-index: 1;
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
    :hover {
      ::before {
        display: block;
      }
    }
  }
`;
