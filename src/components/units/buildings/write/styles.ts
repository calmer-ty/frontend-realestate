import styled from "@emotion/styled";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  row-gap: 40px;
  height: 100%;
  width: 100%;
  padding: 40px;
  max-width: 1024px;
`;
export const InfoContainer = styled.section`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
`;
export const InfoContent = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
`;
export const InputWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  column-gap: 10px;
  width: 100%;
`;
export const AddressWrap = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  align-self: flex-start;
`;
export const MapsWrap = styled.div`
  position: relative;
  width: 400px;
  height: 200px;
`;
export const MapsCover = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 400px;
  height: 200px;
  border: 1px solid #dedede;
  background-color: #efefef;
  text-align: center;
  line-height: 2.1;
  z-index: 101;
`;
