import style from "./styles.module.css";

import { Link, useLocation, useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { MainContext } from "../context/MainContext";
import Modal from "./Modal";
import CreateUser from "../pages/admin/users/Create";
import UpdateUser from "../pages/admin/users/Update";
import UpdateEmployee from "../pages/admin/employees/Update";
import CreateEmployee from "../pages/admin/employees/Create";
import CreateClient from "../pages/admin/clients/Create";
import UpdateClient from "../pages/admin/clients/Update";

let val;
if (typeof window !== "undefined") {
  // This code will only be executed in the browser
  const value = localStorage.getItem("sesType");
  val = value;
}
export default function SubHeader() {
  const pathname = useLocation().pathname;
  const {
    saveReport,
    confirm,
    setConfirm,
    setData,
    idDelete,
    handleConfirm,
    showModalU,
    setShowModalU,
    showModalE,
    setShowModalE,
    showModalC,
    setShowModalC,
    updateId,
    setUpdateId,
  } = useContext(MainContext);
  //console.log(useParams());

  //   const path = pathname.replaceAll('/', '');
  //   const name = path.replace('user', '');
  //console.log(path.replace('user', ''));
  const [showModalClient, setShowModalClient] = useState(false);
  const [showModalEmployee, setShowModalEmployee] = useState(false);
  const [showModalUser, setShowModalUser] = useState(false);

  const handleClickModal = () => {
    setShowModalUser(true);
  };
  const handleClickModal2 = () => {
    setShowModalEmployee(true);
  };
  const handleClickModal3 = () => {
    setShowModalClient(true);
  };
  const handleClose = () => {
    setConfirm(false);
    setShowModalClient(false);
    setShowModalU(false);
    setShowModalE(false);
    setShowModalC(false);
    setShowModalEmployee(false);
    //    showModalE, setShowModalE
  };

  const callbackConfirm = (id) => {
    setData((data) => data.filter((data) => data.id !== `${id}`));
    setConfirm(false);
  };
  return (
    <>
      {showModalClient === true && (
        <Modal callback={handleClose}>
          <CreateClient />
        </Modal>
      )}
      {showModalUser === true && (
        <Modal callback={handleClose}>
          <CreateUser />
        </Modal>
      )}
      {showModalEmployee === true && (
        <Modal callback={handleClose}>
          <CreateEmployee />
        </Modal>
      )}

      {showModalU === true && (
        <Modal callback={handleClose}>
          <UpdateUser id={updateId} />
        </Modal>
      )}
      {showModalE === true && (
        <Modal callback={handleClose}>
          <UpdateEmployee id={updateId} />
        </Modal>
      )}
      {showModalC === true && (
        <Modal callback={handleClose}>
          <UpdateClient id={updateId} />
        </Modal>
      )}
      {confirm === true && (
        <Modal callback={handleClose}>
          <div className="delete-confirm">
            <div className="delete-confirm-label">
              Estas seguro que deseas borrar?
            </div>
            <div className="delete-confirm-btns">
              <button onClick={handleClose} className="btn btn-danger">Cancelar</button>
              <button onClick={() => callbackConfirm(idDelete)} className="btn btn-success">Confirmar</button>
            </div>
          </div>
        </Modal>
      )}
      <div className={style.subHeader}>
        {pathname === "/user/reports" && (
          <div className="btns-header">
            <Link to="/user/reports/create/1">
              <center>Reporte de inspeccion</center>{" "}
            </Link>
            <Link to="/user/reports/create/2">
              <center>Reporte por horas</center>{" "}
            </Link>
          </div>
        )}
        {pathname === "/user/reports/create/1" && (
          <button onClick={(e) => saveReport(e)}>Enviar Reporte</button>
        )}
        {pathname === "/user/reports/create/2" && (
          <button onClick={(e) => saveReport(e)}>Enviar Reporte</button>
        )}
        {pathname === "/admin/users/create" && (
          <button onClick={(e) => saveReport(e)}>Guardar</button>
        )}
        {pathname === "/admin/users" && (
          <>
            <button onClick={handleClickModal}>
              <center>Crear usuario</center>{" "}
            </button>
          </>
        )}
        {pathname === "/admin/employees" && (
          <>
            <button onClick={handleClickModal2}>
              <center>Crear empleado</center>
            </button>
          </>
        )}
        {pathname === "/admin/clients" && (
          <>
            <button onClick={handleClickModal3}>
              <center>Crear cliente</center>
            </button>
          </>
        )}
      </div>
    </>
  );
}
