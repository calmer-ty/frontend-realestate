import styled from "@emotion/styled";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { mediaQueries } from "@/src/commons/styles/styles";
import { css } from "@emotion/react";

export const Container = styled.article`
  display: flex;
  flex-direction: column;
  row-gap: 40px;
  height: 100%;
  width: 100%;
  max-width: 1024px;
  padding: 40px;

  ${mediaQueries.mobile(css`
    padding: 0;
  `)}
`;
export const ViewContents = styled.section`
  display: flex;
  column-gap: 10px;
  width: 100%;
  height: 440px;

  figure {
    position: relative;
    > img {
      object-fit: cover;
    }
  }
  .mainImg {
    width: 50%;
  }
  .subImgWrap {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 50%;
    margin: -5px;
    > figure {
      padding: 5px;
      width: 50%;
      height: 50%;
    }
  }

  ${mediaQueries.mobile(css`
    display: none;
  `)}
`;
export const MViewContents = styled(Slider)`
  height: 440px;
  &.slick-slider {
    display: none;
  }
  .slick-list,
  .slick-track {
    height: 440px;
  }
  figure {
    height: 100%;
    > img {
      object-fit: cover;
    }
  }

  ${mediaQueries.mobile(css`
    &.slick-slider {
      display: block;
    }
  `)}
`;

export const BuildingInfo = styled.section`
  display: flex;
  flex-direction: column;
  row-gap: 40px;

  ${mediaQueries.mobile(css`
    padding: 20px;
  `)}
`;
export const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
`;
export const InfoList = styled.ul`
  > li {
    display: flex;
    h3 {
      width: 150px;
      font-size: 16px;
    }
  }
  > li + li {
    margin-top: 10px;
  }
`;
