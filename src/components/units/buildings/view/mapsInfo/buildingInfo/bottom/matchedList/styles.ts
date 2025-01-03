import styled from "@emotion/styled";

export const List = styled.ul`
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
`;
