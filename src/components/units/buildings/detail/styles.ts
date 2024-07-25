import styled from "@emotion/styled";

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  height: 100%;
  width: 100%;
  padding: 40px;
  max-width: 1024px;
`;
export const MainImg = styled.div`
  width: 100%;
  height: 440px;
  background-color: #eee;
`;
export const BuildingInfo = styled.article`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  padding: 20px;
  background-color: #eee;
`;
export const InfoItem = styled.section``;
export const InfoContent = styled.ul`
  display: flex;
  flex-direction: column;
  row-gap: 4px;
`;
export const InfoContentItem = styled.li`
  display: flex;
`;
export const InfoLabel = styled.div`
  width: 150px;
  font-weight: bold;
`;
