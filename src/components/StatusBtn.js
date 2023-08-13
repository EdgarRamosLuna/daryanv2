import React, { useContext } from "react";
import { MainContext } from "../context/MainContext";
import { StyledStatusBtn } from "../styles/Styles";
import { useTranslation } from 'react-i18next';  // Importa el hook

const StatusBtn = ({ status, id, table }) => {
  const { handleStatus } = useContext(MainContext);
  const { t } = useTranslation();  // Inicializa el hook

  const changeStatus = () => {
    handleStatus(id, status, table);
  }

  return (
    <StyledStatusBtn statusBtn={status} onClick={changeStatus}>
      {status === 1 ? t('status.active') : t('status.inactive')}
    </StyledStatusBtn>
  );
};

export default StatusBtn;
