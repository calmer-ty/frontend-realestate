import styled from "@emotion/styled";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { colors } from "@/src/commons/styles";

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  padding: 1rem 1rem 3rem;
  gap: 1rem;
  flex: 1;
  background-color: ${colors.background};

  h2 {
    padding: 0 1rem;
    font-size: 1.5rem;
    font-weight: bold;
  }
`;

// SliderStyle
export const SliderStyle = styled(Slider)`
  width: 100%;
  height: 100%;
  .slick-list {
    height: 100%;
    .slick-track {
      height: 100%;
    }
    .slick-slide {
      padding: 0 1rem;
      div {
        height: 100%;
      }
    }
  }
  .slick-dots {
    bottom: -2rem;
  }
`;
