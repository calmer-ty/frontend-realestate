import styled from "@emotion/styled";

export const Container = styled.article`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 40px 0;
  h2 {
    margin-bottom: 20px;
  }
`;
export const Registered = styled.ul`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  li {
    display: flex;
    column-gap: 10px;
    .buildingInfos {
      font-size: 17px;
      line-height: 1.6;
      .basic,
      .price {
        font-weight: bold;
      }
      .price {
        font-size: 20px;
      }
      .desc {
        color: #bcbcbc;
      }
    }
  }
`;
