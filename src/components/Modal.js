import React, { useContext } from "react";
import { StyledModal } from "../styles/Styles";
import { MainContext } from "../context/MainContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const Modal = ({ children, callback, width }) => {
  const { btnCloseRef } = useContext(MainContext);

  return (
    <StyledModal width={width}>
      <div className="modal-container">
        <div className="modal-close">
          <button ref={btnCloseRef} onClick={() => callback()}><FontAwesomeIcon icon={faXmark} color="#450107" />
            {/* <i className="fa-solid fa-xmark"></i> */}
          </button>
        </div>
        {children}
      </div>
    </StyledModal>
  );
};

export default Modal;
