import React, { useContext } from "react";
import { StyledModal } from "../styles/Styles";
import { MainContext } from "../context/MainContext";

const Modal = ({ children, callback }) => {
  const {btnCloseRef} = useContext(MainContext);
  return (
    <StyledModal>
      <div className="modal-container">
        <div className="modal-close">
            <button ref={btnCloseRef} onClick={() => callback()}><i className="fa-solid fa-xmark"></i></button>
        </div>
        {children}
      </div>
    </StyledModal>
  );
};

export default Modal;
