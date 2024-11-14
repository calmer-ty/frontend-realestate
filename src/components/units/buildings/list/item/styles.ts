import styled from "@emotion/styled";

export const ListItem = styled.ul`
  overflow-y: hidden;
  overflow-y: scroll;
  display: flex;
  row-gap: 20px;
  flex-direction: column;
  min-width: 930px;
  height: calc(100vh - 240px);
  li {
    display: flex;
    flex-direction: column;
    border: 1px solid #e7e7e7;

    .topContents {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      column-gap: 10px;
      height: 48px;
      padding: 0 20px;
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
export const BuildingInfo = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 4px;
  width: 250px;

  .price {
    margin-top: 4px;
    font-size: 20px;
  }
  .desc {
    color: #bcbcbc;
  }
`;
export const BuildingAd = styled.div`
  h3 {
    margin-bottom: 5px;
    color: #454545;
  }
  width: 340px;
  height: 126px;
  background-color: #f9f9f9;
  padding: 10px;
  color: #646464;
  .adEnd {
    color: #d83a4d;
  }
`;
