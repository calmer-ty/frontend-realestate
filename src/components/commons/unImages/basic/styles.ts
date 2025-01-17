import styled from "@emotion/styled";

interface IBasicUnImageProps {
  width: string;
  height: string;
  fontSize: string;
}

export const UnImage = styled.div<IBasicUnImageProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #dedede;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  font-size: ${(props) => props.fontSize};
`;
