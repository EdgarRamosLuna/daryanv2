import style from "./styles.module.css";

import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { MainContext } from "../context/MainContext";
import Modal from "./Modal";
import CreateUser from "../pages/admin/users/Create";
import UpdateUser from "../pages/admin/users/Update";
import UpdateEmployee from "../pages/admin/employees/Update";
import CreateEmployee from "../pages/admin/employees/Create";
import CreateClient from "../pages/admin/clients/Create";
import UpdateClient from "../pages/admin/clients/Update";
import CreateSupplier from "../pages/admin/suppliers/Create";
import UpdateSupplier from "../pages/admin/suppliers/Update";

let val;
if (typeof window !== "undefined") {
  // This code will only be executed in the browser
  const value = localStorage.getItem("sesType");
  val = value;
}
export default function SubHeader() {
  let pathname = useLocation().pathname;

  const {
    dataSes,
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
    showModalS,
    setShowModalS,
  } = useContext(MainContext);
  //console.log(useParams());

  //   const path = pathname.replaceAll('/', '');
  //   const name = path.replace('user', '');
  //console.log(path.replace('user', ''));
  const [showModalClient, setShowModalClient] = useState(false);
  const [showModalEmployee, setShowModalEmployee] = useState(false);
  const [showModalUser, setShowModalUser] = useState(false);
  const [showModalSupplier, setShowModalSupplier] = useState(false);
  const [tableName, setTableName] = useState("");

  const handleClickModal = () => {
    setShowModalUser(true);
  };
  const handleClickModal2 = () => {
    setShowModalEmployee(true);
  };
  const handleClickModal3 = () => {
    setShowModalClient(true);
  };
  const handleClickModal4 = () => {
    setShowModalSupplier(true);
  };
  const handleClose = () => {
    setConfirm(false);
    setShowModalClient(false);
    setShowModalUser(false);
    setShowModalU(false);
    setShowModalE(false);
    setShowModalC(false);
    setShowModalEmployee(false);
    setShowModalSupplier(false);
    setShowModalS(false);
    //    showModalE, setShowModalE
  };

  const callbackConfirm = (id) => {
    setData((data) => data.filter((data) => data.id !== `${id}`));
    setConfirm(false);
  };
  const p = useParams().id;
  const [params, setParams] = useState(p);
  if (typeof p !== "undefined") {
    console.log(dataSes);
  }
  //console.log(useLocation())
  const navigate = useNavigate();
  //console.log(pathname.slice(-1));

  const handleLink = (e) => {
    let idCreate = pathname.slice(-1);
    navigate(`/user/reports/create/${idCreate}/table2`);
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
      {showModalSupplier === true && (
        <Modal callback={handleClose}>
          <CreateSupplier />
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
      {showModalS === true && (
        <Modal callback={handleClose}>
          <UpdateSupplier id={updateId} />
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
              <button onClick={handleClose} className="btn btn-danger">
                Cancelar
              </button>
              <button
                onClick={() => callbackConfirm(idDelete, tableName)}
                className="btn btn-success"
              >
                Confirmar
              </button>
            </div>
          </div>
        </Modal>
      )}
      <div className={style.subHeader}>  <div className="btns-header">

        {pathname === "/user/reports" && (
          <>
            <Link to="/user/reports/create/1">
              <center>
                <i class="fa-solid fa-plus"></i>Reporte de inspeccion
              </center>
            </Link>
            <Link to="/user/reports/create/2">
              <center>
                <i class="fa-solid fa-plus"></i>Reporte por horas
              </center>
            </Link>
          </>
        )}
        {pathname === "/user/reports/create/1" && (
          <button onClick={(e) => saveReport(e)}>Enviar Reporte</button>
        )}
        {pathname === "/user/reports/create/2" && (
          <>
            <button onClick={(e) => saveReport(e)}>Enviar Reporte</button>
            <button onClick={(e) => handleLink(e)}>Tabla de muestreo</button>
          </>
        )}
        {pathname === "/admin/users/create" && (
          <button onClick={(e) => saveReport(e)}>Guardar</button>
        )}
        {dataSes === "admin" &&
          pathname.includes("admin") &&
          pathname.includes("reports") &&
          typeof p !== "undefined" && (
            <button onClick={(e) => saveReport(e)}>
              Aprobar Reporte
            </button>
          )}
        {pathname.includes("table2") && (
          <>
            <button onClick={(e) => navigate(-1)}>
              Regresar
            </button>
            <button onClick={(e) => saveReport(e)}>
              Guardar
            </button>
          
          </>
          )}
        
        {pathname === "/admin/users" && (
          <>
            <button onClick={handleClickModal}>
              <center>Crear usuario</center>
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
        {pathname === "/admin/suppliers" && (
          <>
            <button onClick={handleClickModal4}>
              <center>Crear proveedor</center>
            </button>
          </>
        )}
         </div>
      </div>
    </>
  );
}
