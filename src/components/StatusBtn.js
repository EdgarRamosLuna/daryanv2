import React, { useContext, useEffect } from "react";
import { MainContext } from "../context/MainContext";
import { StyledStatusBtn } from "../styles/Styles";

const StatusBtn = ({ status, id, table }) => {
  const { handleStatus, } = useContext(MainContext);
  /*useEffect(() => {
    setData([...data]);
  }, [data])*/
  const changeStatus = () =>{
    handleStatus(id, status, table)
    // const index = data.findIndex(el => el.id === id);
    // if(index !== -1){
    //     const newStatus = [...data];
    //     newStatus[index].status = status === 1 ? 2 : 1;
    // }
  }
  return (
    <StyledStatusBtn statusBtn={status} onClick={changeStatus}>
      {status === 1 ? "Activo" : "Inactivo"}
    </StyledStatusBtn>
  );
};

export default StatusBtn;
