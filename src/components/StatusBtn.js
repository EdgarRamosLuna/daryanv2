import React, { useContext, useEffect } from "react";
import { MainContext } from "../context/MainContext";
import { StyledStatusBtn } from "../styles/Styles";

const StatusBtn = ({ status, id }) => {
  const { data, setData } = useContext(MainContext);
  /*useEffect(() => {
    setData([...data]);
  }, [data])*/
  const changeStatus = (id) =>{
    const index = data.findIndex(el => el.id === id);
    if(index !== -1){
        const newStatus = [...data];
        newStatus[index].status = status === 1 ? 2 : 1;
    }
  }
  return (
    <StyledStatusBtn statusBtn={status} onClick={() => changeStatus(id)}>
      {status === 1 ? "Activo" : "Inactivo"}
    </StyledStatusBtn>
  );
};

export default StatusBtn;
