import styled from "@emotion/styled";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const PCView = styled.section`
  /* 공통 */
  display: flex;
  column-gap: 0.625rem;

  figure {
    position: relative;
    height: 28rem;
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
    margin: -0.25rem;
    > figure {
      margin: 0.25rem;
      width: calc(50% - 0.5rem);
      height: calc(50% - 0.5rem);
    }
  }
`;

// 모바일용 슬랙
export const MobileView = styled(Slider)`
  figure {
    position: relative;
    height: 16rem;
  }
`;
