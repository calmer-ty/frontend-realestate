import styled from "@emotion/styled";

export const Container = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  row-gap: 40px;
  width: 100%;
  height: 100%;
  position: relative;
  > section {
    height: 50%;
    .inner {
      display: flex;
      justify-content: center;
      align-items: center;
      row-gap: 10px;
      height: 100%;
      margin: 0 auto;
      max-width: 1280px;
    }
  }
`;

export const Maps = styled.section`
  position: relative;
  ::before {
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    background: #fff url("/images/main.jpg") no-repeat center/cover;
    opacity: 0.2;
  }
  .inner {
    justify-content: space-between;
    column-gap: 60px;
  }
`;
export const BuildingType = styled.div`
  position: relative;
  width: 280px;
  height: 200px;
  padding-bottom: 20px;
  background-color: #fff;
  border-radius: 10px;
  cursor: pointer;
  /* 링크 요소 */
  > a {
    display: flex;
    justify-content: center;
    align-items: center;
    width: inherit;
    height: inherit;
    .textWrap {
      display: flex;
      flex-direction: column;
      row-gap: 10px;
      width: 160px;
    }
    .iconWrap {
      position: absolute;
      right: 20px;
      bottom: 20px;
    }
  }
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 20px 0px;
  }
`;
export const UnBuildingType = styled.div`
  position: relative;
  width: 280px;
  height: 200px;
  background-color: #ccc;
  border-radius: 10px;
  cursor: pointer;
  /* 링크 요소 */
  > a {
    display: flex;
    justify-content: center;
    align-items: center;
    width: inherit;
    height: inherit;
    .textWrap {
      display: flex;
      flex-direction: column;
      row-gap: 10px;
      width: 160px;
    }
    .iconWrap {
      position: absolute;
      right: 20px;
      bottom: 20px;
    }
  }
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 20px 0px;
  }
`;

export const Registered = styled.section`
  .inner {
    flex-direction: column;
    > h2 {
      width: 100%;
    }
  }
  .contents {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 300px;
  }
`;
export const RegisteredList = styled.ul`
  display: flex;
  justify-content: space-between;
  width: 100%;
  > li {
    > a {
      position: relative;
      display: flex;
      flex-direction: column;
      row-gap: 10px;
      /* 이미지 랩 */
      > img {
        object-fit: cover;
      }
      ::before {
        content: "";
        display: none;
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: #000;
        opacity: 0.3;
        z-index: 1;
      }

      > p.buildingDesc {
        display: flex;
        flex-direction: column;
        > strong {
          font-size: 20px;
          margin-bottom: 10px;
        }
      }
      :hover {
        ::before {
          display: block;
        }
      }
    }
  }
`;
