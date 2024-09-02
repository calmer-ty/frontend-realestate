import styled from "@emotion/styled";

export const Container = styled.article`
  height: 100%;
`;
export const Visible = styled.section`
  > ul {
    > li {
      padding: 10px 15px;
      border-bottom: 1px solid #dedede;
      > h2 {
        font-size: 20px;
      }
    }
  }
`;
export const UnVisible = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 10px;
  height: 100%;
  > p {
    text-align: center;
  }
`;

// 임시 선택된 요소 스타일
export const BuildingInfo = styled.section`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  padding: 15px;

  div > {
    h2 {
      font-size: 24px;
    }
    h3 {
      font-size: 16px;
    }
  }
`;
export const InfoWrap = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
`;
export const TextWrap = styled.div`
  display: flex;
  align-items: center;
  column-gap: 4px;
  font-size: 14px;
  color: #656565;
`;

export const SelectedContent = styled.div`
  padding: 20px;
  border: 1px solid #dedede;
  border-radius: 10px;
  background-color: #fafafa;

  > p {
    font-size: 14px;
    color: #979797;
  }
`;

// 등록된 건물 정보
export const RegisteredInfo = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const Registered = styled.div`
  width: 100%;
  border-top: 1px solid #dedede;
  > h3 {
    font-size: 16px;
    margin: 10px 20px;
    > strong {
      color: #1976d2;
    }
  }
  .buildingList {
    > li {
      border-bottom: 1px solid #dedede;
      > a {
        display: flex;
        align-items: center;
        column-gap: 20px;
        padding: 20px;
        > img {
          object-fit: cover;
        }
      }
      :hover {
        background-color: #efefef;
      }
    }
  }
`;
export const UnRegistered = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 10px;

  > p {
    text-align: center;
  }
`;
