import styled from "@emotion/styled";

import Modal from "@mui/material/Modal";

export const StyleModal = styled(Modal)`
  .inner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 20rem;
    background-color: #fff;
    border: 0.125rem solid #000;
    padding: 2.5rem 2rem 2rem;
  }
`;
