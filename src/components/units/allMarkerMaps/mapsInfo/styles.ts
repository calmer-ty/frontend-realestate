import styled from "@emotion/styled";

export const Container = styled.div`
  overflow-y: auto;
  width: 100%;
  height: 100%;
  border-right: 1px solid #dedede;
  background-color: #fff;
  z-index: 1;
  flex: 1;
`;
// 클릭 된 건물 상세 정보
export const SelectedArea = styled.article`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
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

export const SelectedInfo = styled.section`
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
  > ul {
    border-top: 1px solid #dedede;
    > li {
      border-bottom: 1px solid #dedede;
      > a {
        display: flex;
        align-items: center;
        column-gap: 20px;
        padding: 20px;
      }
      :hover {
        background-color: #efefef;
      }
    }
  }
`;
export const ImgWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70px;
  height: 70px;
  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
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

export const VisibleArea = styled.section`
  > ul {
    > li {
      padding: 10px 15px;
      border-top: 1px solid #dedede;
      > h2 {
        font-size: 20px;
      }
    }
  }
`;
