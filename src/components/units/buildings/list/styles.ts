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
  row-gap: 30px;
  li {
    display: flex;
    align-items: center;
    column-gap: 10px;
    .infos {
      font-size: 17px;
      line-height: 1.6;
      .basic,
      .price {
        font-weight: bold;
      }
      .basic {
        display: flex;
        align-items: center;
      }
      .basic i {
        margin: 0 10px;
        display: inline-block;
        width: 2px;
        height: 18px;
        background-color: #000;
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
