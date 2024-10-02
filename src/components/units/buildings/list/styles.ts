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
  h3 {
    font-size: 18px;
  }
`;
export const Registered = styled.ul`
  display: flex;
  row-gap: 20px;
  flex-direction: column;
  li {
    display: flex;
    flex-direction: column;
    border: 1px solid #e7e7e7;

    .topContents {
      display: flex;
      justify-content: flex-end;
      column-gap: 10px;
      padding: 5px 20px;
      background-color: #fafafa;
    }
    .bottomContents {
      display: flex;
      align-items: center;
      column-gap: 20px;
      padding: 20px;
    }
  }
`;
export const RegisteredInfo = styled.div`
  width: 250px;

  .price {
    margin-top: 6px;
    font-size: 20px;
  }
  .desc {
    color: #bcbcbc;
  }
`;
export const RegisteredAd = styled.div`
  height: 100%;
  background-color: #efefef;
  padding: 10px;
`;
