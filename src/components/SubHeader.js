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
import axios from "axios";
import {
  authClients,
  authClients2,
  delReport,
  deleteAuthClient,
  deleteClient,
  deleteEmployee,
  deleteSupplier,
  deleteUser,
} from "../api/daryan.api";
import AuthUsers from "./admin/AuthUsers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartSimple, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { Table } from "../styles/Styles";
import TotalByPartNumber from "./admin/TotalByPartNumber";
import TotalByPartNumberClient from "./client/TotalByPartNumber";
import ReportDetails from "./admin/ReportDetails";
import Settings from "../pages/admin/Settings";

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
    saveReportH,
    aproveReport,
    confirm,
    setConfirm,
    setData,
    setDataClients,
    setDataSuppliers,
    setDataEmployees,
    setDataUsers,
    idDelete,
    showModalU,
    setShowModalU,
    showModalE,
    setShowModalE,
    showModalC,
    setShowModalC,
    updateId,
    showModalS,
    setShowModalS,
    tableName,
    toast,
    showModalClient,
    setShowModalClient,
    showModalEmployee,
    setShowModalEmployee,
    showModalUser,
    setShowModalUser,
    showModalSupplier,
    setShowModalSupplier,
    checkList,
    clientsToReport,
    showModalAuth,
    setShowModalAuth,
    authClientsT,
    setAuthClientsT,
    setPosition,
    activeTab,
    showCharts,
    setShowCharts,
    showDtable,
    setShowDtable,
    showDEtable,
    setShowDEtable,
    showConfig,
    setShowConfig,
    isAdmin,
    dataReportH,
    setDataReportH,
    aproveReportH
  } = useContext(MainContext);

  //console.log(isAdmin);
  //console.log(useParams());

  //   const path = pathname.replaceAll('/', '');
  //   const name = path.replace('user', '');
  //console.log(path.replace('user', ''));

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
    setShowModalAuth(false);
    setShowDtable(false);

    //setShowConfig(false);
    setAuthClientsT([]);
    //    showModalE, setShowModalE
  };
  const handleCloseModal = () => {
    setShowConfig(false);
    setShowDEtable(false);
    //    showModalE, setShowModalE
  };

  const callbackConfirm = async (id) => {
    if (tableName === "reports") {
      await delReport({ id })
        .then((res) => {
          const datares = res.data;
          if (datares.error) {
            toast.error(datares.message, {
              duration: 5000,
            });
          } else {
            toast.success(datares.message, {
              duration: 4000,
            });
            setData((data) => data.filter((data) => data.id !== `${id}`));
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (tableName === "suppliers") {
      await deleteSupplier({ id: id })
        .then((res) => {
          const datares = res.data;
          if (datares.error) {
            toast.error(datares.message, {
              duration: 5000,
            });
          } else {
            toast.success(datares.message, {
              duration: 4000,
            });
            setDataSuppliers((data) =>
              data.filter((data) => data.id !== `${id}`)
            );
          }
        })
        .catch((err) => {
          console.log(err);
        });
      // axios
      //   .post(
      //     `${serverUrl}/api/delete_supplier`,
      //     {
      //       id: id,
      //     },
      //     {
      //       headers: {
      //         Authorization: `Bearer 125465`,
      //       },
      //     }
      //   )
      //   .then((res) => {
      //     //   console.log(res.data);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
    }
    if (tableName === "clients") {
      await deleteClient({ id: id })
        .then((res) => {
          const datares = res.data;
          if (datares.error) {
            toast.error(datares.message, {
              duration: 5000,
            });
          } else {
            toast.success(datares.message, {
              duration: 4000,
            });
            setDataClients((data) =>
              data.filter((data) => data.id !== `${id}`)
            );
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (tableName === "employees") {
      await deleteEmployee({ id: id })
        .then((res) => {
          const datares = res.data;
          if (datares.error) {
            toast.error(datares.message, {
              duration: 5000,
            });
          } else {
            toast.success(datares.message, {
              duration: 4000,
            });
            setDataEmployees((data) =>
              data.filter((data) => data.id !== `${id}`)
            );
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (tableName === "users") {
      await deleteUser({ id: id })
        .then((res) => {
          const datares = res.data;
          if (datares.error) {
            toast.error(datares.message, {
              duration: 5000,
            });
          } else {
            toast.success(datares.message, {
              duration: 4000,
            });
            setDataUsers((data) => data.filter((data) => data.id !== `${id}`));
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }

    setConfirm(false);
  };
  const p = useParams().id;
  const [params, setParams] = useState(p);
  if (typeof p !== "undefined") {
    //console.log(dataSes);
  }
  //console.log(useLocation())
  const navigate = useNavigate();
  //console.log(pathname.slice(-1));

  const handleLink = (e) => {
    let idCreate = pathname.slice(-1);
    navigate(`/user/reports/create/${idCreate}/table2`);
  };
  const singleView = (url) => {
    window.location.href = url;
    // navigate(url);
  };
  const addClients = async () => {
    if (checkList.length > 0 && clientsToReport.length > 0) {
      if (activeTab === 1) {
        await authClients({
          clients: clientsToReport,
          reports: checkList,
        }).then((res) => {
          const datares = res.data;
          if (datares.error) {
            toast.error(datares.message, {
              duration: 5000,
            });
          } else {
            toast.success(datares.message, {
              duration: 3000,
            });
          }
        });
      }
      if (activeTab === 2) {
        await authClients2({
          clients: clientsToReport,
          reports: checkList,
        }).then((res) => {
          const datares = res.data;
          if (datares.error) {
            toast.error(datares.message, {
              duration: 5000,
            });
          } else {
            toast.success(datares.message, {
              duration: 3000,
            });
          }
        });
      }
    } else {
      setPosition("top-right");
      toast.error(
        "Debes seleccionar almenos 1 reporte y 1 proveedor para poder asignar un cliente",
        {
          duration: 5000,
        }
      );
    }
  };

  const deleteAU = async (id) => {
    const confirm = window.confirm(
      "Estas seguro de borrar este usuario de la lista de autorizados?"
    );
    if (confirm) {
      await deleteAuthClient({ id }).then((res) => {
        const datares = res.data;
        if (datares.error) {
          toast.error(datares.message, {
            duration: 5000,
          });
        } else {
          toast.success(datares.message, {
            duration: 3000,
          });
          setAuthClientsT((data) => data.filter((data) => data.id !== `${id}`));
        }
      });
    }
  };

  return (
    <>
      {showModalAuth === true && (
        <Modal callback={handleClose}>
          <AuthUsers data={authClientsT} deleteAU={deleteAU} />
        </Modal>
      )}
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
      {showDtable === true && (
        <Modal callback={handleClose} width={1600}>
          {isAdmin ? <TotalByPartNumber /> : <TotalByPartNumberClient />}
        </Modal>
      )}
      {showDEtable === true && (
        <Modal callback={handleCloseModal}>
          <ReportDetails />
        </Modal>
      )}
      {showConfig === true && (
        <Modal callback={handleCloseModal}>
          <Settings />
        </Modal>
      )}
      {confirm === true && (
        <Modal callback={handleClose}>
          <div className="delete-confirm">
            <div className="delete-confirm-label">
              ¿Estás seguro(a) que deseas borrar este
              {tableName === "users" && " usuario"}
              {tableName === "employees" && " empleado"}
              {tableName === "clients" && " cliente"}
              {tableName === "suppliers" && " proveedor"}
              {tableName === "reports" && " reporte"}?
              <br />
              Esta acción no podrá deshacerse.
            </div>
            <div className="delete-confirm-btns">
              <button onClick={handleClose} className="btn btn-danger">
                Cancelar
              </button>
              <button
                onClick={() => callbackConfirm(idDelete)}
                className="btn btn-success"
              >
                Confirmar
              </button>
            </div>
          </div>
        </Modal>
      )}
      <div className={style.subHeader}>
        <div className="btns-header">
          {pathname === "/user/reports" && (
            <>
              <button onClick={() => singleView("/user/reports/create/1")}>
                <center>Reporte de inspeccion</center>
              </button>
              <button onClick={() => singleView("/user/reports/create/2")}>
                <center>Reporte por horas</center>
              </button>
            </>
          )}
          {pathname === "/admin/reports" && (
            <>
              {activeTab >= 1 && activeTab <= 2 && isAdmin && (
                <button onClick={addClients} className="auth-clientes">
                  Autorizar Clientes
                </button>
              )}
              {activeTab === 3 && (
                <div className="btn-charts">
                  <button
                    className="chart-btn"
                    onClick={() => setShowCharts((prev) => !prev)}
                  >
                    <FontAwesomeIcon
                      icon={showCharts === true ? faEyeSlash : faEye}
                    />
                    <FontAwesomeIcon icon={faChartSimple} />
                  </button>
                </div>
              )}
            </>
          )}
          {pathname === "/client/reports" && (
            <>
              {activeTab === 3 && (
                <div className="btn-charts">
                  <button
                    className="chart-btn"
                    onClick={() => setShowCharts((prev) => !prev)}
                  >
                    <FontAwesomeIcon
                      icon={showCharts === true ? faEyeSlash : faEye}
                    />
                    <FontAwesomeIcon icon={faChartSimple} />
                  </button>
                </div>
              )}
            </>
          )}
          {pathname === "/user/reports/create/1" && (
            <button onClick={(e) => saveReport(e)}>Enviar Reporte</button>
          )}
          {pathname === "/user/reports/create/2" && (
            <>
              <button onClick={(e) => saveReportH(e)}>Enviar Reporte</button>
              <button onClick={(e) => handleLink(e)}>Tabla de muestreo</button>
            </>
          )}
          {pathname === "/admin/users/create" && (
            <button onClick={(e) => saveReport(e)}>Guardar</button>
          )}
          {dataSes === "admin" &&
            pathname.includes("admin") &&
            typeof p !== "undefined" && (
              <>
                {pathname.includes("reports_by_h") && (
                  <button onClick={(e) => aproveReportH(e)}>
                    Aprobar Reporte
                  </button>
                )}
                {pathname.includes("reports_insp") && (
                  <button onClick={(e) => aproveReport(e)}>
                    Aprobar Reporte
                  </button>
                )}
              </>
            )}

          {pathname.includes("table2") && (
            <>
              <button onClick={(e) => navigate(-1)}>Regresar</button>
              <button onClick={(e) => saveReport(e)}>Guardar</button>
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
