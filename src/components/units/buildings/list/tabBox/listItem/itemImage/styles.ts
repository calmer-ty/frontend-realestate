import styled from "@emotion/styled";

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  row-gap: 4px;
  width: 180px;
  height: 120px;
  p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .price {
    margin-top: 4px;
    font-size: 20px;
  }
  .desc {
    color: #bcbcbc;
  }
`;
