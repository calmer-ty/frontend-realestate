import styled from "@emotion/styled";

export const Container = styled.article`
  display: flex;
  justify-content: center;
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
  cursor: pointer;
  li {
    display: flex;
    align-items: center;
    column-gap: 10px;
    position: relative;
    padding: 20px;
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
    /* &:hover {
      &::before {
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: #000;
        opacity: 0.3;
      }
    } */
  }
`;
