import styled from "@emotion/styled";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const PCView = styled.section`
  /* 공통 */
  display: flex;
  column-gap: 10px;
  width: 100%;

  figure {
    position: relative;
    height: 440px;
    > img {
      object-fit: cover;
    }
  }

  /* 메인 서브 이미지 */
  .mainImg {
    width: 50%;
  }
  .subImgWrap {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 50%;
    margin: -4px;
    > figure {
      margin: 4px;
      width: calc(50% - 8px);
      height: calc(50% - 8px);
    }
  }
`;

// 모바일용 슬랙
export const MobileView = styled(Slider)`
  &.slick-slider {
    figure {
      position: relative;
      height: 400px;
      > img,
      div {
        height: 100% !important;
        object-fit: cover;
      }
    }
  }
`;
