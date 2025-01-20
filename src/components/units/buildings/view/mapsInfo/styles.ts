import styled from "@emotion/styled";

interface IScroll {
  scroll: boolean;
}

export const Container = styled.aside<IScroll>`
  overflow-y: auto;
  border-right: 1px solid #dedede;
  background-color: #fff;
  position: absolute;
  z-index: 1;
  min-width: 300px;
`;

// export const TabButton = styled.button`
//   display: none;

//   .stroke {
//     width: 50px;
//     height: 3px;
//     margin: 5px 0;
//     background-color: #dedede;
//   }
//   ${mediaQueries.mobile(css`
//     position: absolute;
//     bottom: 0;
//     z-index: 1;
//     width: 100%;
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: center;
//     padding: 4px 0 10px 0;
//     border-bottom: 2px solid #999;
//     background-color: #fff;
//   `)}
// `;
