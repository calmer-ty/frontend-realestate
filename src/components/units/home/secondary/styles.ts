import styled from "@emotion/styled";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  padding: 1rem 1rem 2rem;
  gap: 1rem;
  flex: 1;
  background-color: white;

  h2 {
    padding: 0 1rem;
    font-size: 1.25rem;
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
    bottom: -1.5rem;
  }
`;
