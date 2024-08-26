import styled from "@emotion/styled";

export const Container = styled.article`
  display: flex;
  flex-direction: column;
  row-gap: 40px;
  height: 100%;
  width: 100%;
  max-width: 1024px;
  padding: 60px 0;
`;
export const ImgContainer = styled.section`
  display: flex;
  width: 100%;
  height: 440px;
`;
export const ImgInner = styled.figure`
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 100%;
  > img {
    position: relative;
    top: 0;
    left: 0;
    object-fit: cover;
  }

  .subImgWrap {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-content: space-between;
    gap: 5px;
    width: 507px;
    height: 100%;
    > div {
      width: calc(50% - 5px);
      height: calc(50% - 5px);
      > img {
        object-fit: cover;
      }
    }
  }
`;
export const BuildingInfo = styled.section`
  display: flex;
  flex-direction: column;
  row-gap: 40px;
`;
export const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
`;
export const InfoList = styled.ul`
  > li {
    display: flex;
    h3 {
      width: 150px;
      font-size: 16px;
    }
  }
  > li + li {
    margin-top: 10px;
  }
`;
