import React from "react";
import { StyledModal } from "../styles/Styles";

const Modal = ({ children, callback }) => {
  return (
    <StyledModal>
      <div className="modal-container">
        <div className="modal-close">
            <button onClick={() => callback()}><i className="fa-solid fa-xmark"></i></button>
        </div>
        {children}
      </div>
    </StyledModal>
  );
};

export default Modal;
