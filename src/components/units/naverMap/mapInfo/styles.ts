import styled from "@emotion/styled";

export const Container = styled.div`
  overflow-y: auto;
  width: 50%;
  height: 100%;
  border-right: 1px solid #dedede;
  background-color: #fff;
  z-index: 1;
`;
// 클릭 된 건물 상세 정보
export const SelectedArea = styled.article`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  padding: 15px;
`;
export const SelectedInfo = styled.section`
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
`;

export const SelectedBuildingName = styled.h2`
  font-size: 24px;
`;
export const SelectedTitle = styled.h3`
  font-size: 16px;
`;
export const SelectedContent = styled.div`
  padding: 20px;
  border: 1px solid #bcbcbc;
  border-radius: 10px;
  background-color: #efefef;
`;

// 등록된 건물 정보
export const RegisteredInfo = styled.section``;
export const RegisteredItem = styled.li`
  padding: 20px 0;
  border-bottom: 1px solid #dedede;
`;

export const VisibleArea = styled.section``;
export const VisibleList = styled.li`
  padding: 10px 15px;
  border-top: 1px solid #dedede;
`;
export const VisibleTitle = styled.h2`
  font-size: 20px;
`;
