import style from "./styles.module.css";

import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { MainContext } from "../context/MainContext";
import { useTranslation } from "react-i18next";

import Modal from "./Modal";
import CreateUser from "../pages/admin/users/Create";
import UpdateUser from "../pages/admin/users/Update";
import UpdateEmployee from "../pages/admin/employees/Update";
import CreateEmployee from "../pages/admin/employees/Create";
import CreateClient from "../pages/admin/clients/Create";
import UpdateClient from "../pages/admin/clients/Update";
import CreateSupplier from "../pages/admin/suppliers/Create";
import UpdateSupplier from "../pages/admin/suppliers/Update";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import BarChartIcon from "@mui/icons-material/BarChart";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
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
import TotalByPartNumber from "./admin/TotalByPartNumber";
import TotalByPartNumberClient from "./client/TotalByPartNumber";
import ReportDetails from "./admin/ReportDetails";
import Settings from "../pages/admin/Settings";
import ButtonOutlined from "./buttons/ButtonOutlined";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import SendIcon from "@mui/icons-material/Send";
import TableChartIcon from "@mui/icons-material/TableChart";
import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import ModalMui from "./modal/ModalMui";

import IncidentForm from "./employee/Incident";
import useReports from "../hooks/useReports";

let val;
if (typeof window !== "undefined") {
  // This code will only be executed in the browser
  const value = localStorage.getItem("sesType");
  val = value;
}

export default function SubHeader() {
  const { t } = useTranslation();

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
    aproveReportH,
    activeTabReportByH,
    setActiveTabReportByH,
    activeTabReportInsp,
    setActiveTabReportInsp,
    InfoIcon,
  } = useContext(MainContext);

  //   const path = pathname.replaceAll('/', '');
  //   const name = path.replace('user', '');

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
  }
  const navigate = useNavigate();

  const handleLink = (e) => {
    let idCreate = pathname.slice(-1);
    setActiveTabReportByH(2);
    //navigate(`/user/reports/create/${idCreate}/table2`);
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
      toast.error(t("selectReportAndProvider"), {
        duration: 5000,
      });
    }
  };

  const deleteAU = async (id) => {
    const confirm = window.confirm(t("confirmDeleteAuthorizedUser"));
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
  const getItemName = () => {
    return t(`ui_dynamic_messages.items.${tableName}`);
  };

  const { openModalIncident, setOpenModalIncident } = useReports();
  const itemName = getItemName();
  return (
    <>
      <ModalMui
        open={openModalIncident}
        onClose={() => setOpenModalIncident(false)}
        title={t("incidents.create_incident")}
      >
        <IncidentForm />
      </ModalMui>
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
              {t("ui_dynamic_messages.confirmDeletion", { item: itemName })}
            </div>
            <div className="delete-confirm-btns">
              <ButtonOutlined
                icon={""}
                onClick={handleClose}
                className="btn btn-danger"
                sx={{
                  background: "red",
                }}
              >
                {t("cancel")}
              </ButtonOutlined>
              <ButtonOutlined
                icon={<CheckCircleIcon />}
                onClick={() => callbackConfirm(idDelete)}
                className="btn btn-success"
              >
                {t("confirm")}
              </ButtonOutlined>
            </div>
          </div>
        </Modal>
      )}
      <div className={style.subHeader}>
        <div className="btns-header">
          {(pathname === "/user/reports" || pathname === "/admin/reports") && (
            <>
              <ButtonOutlined
                disableRipple={true}
                icon={<AssignmentTurnedInOutlinedIcon />}
                onClick={() => singleView("/user/reports/create/1")}
              >
                {t("button_texts.inspectionReport")}
              </ButtonOutlined>
              {isAdmin ? (
                <ButtonOutlined
                  disableRipple={true}
                  icon={<PendingActionsIcon />}
                  onClick={() => singleView("/user/reports/create/2")}
                >
                  {t("button_texts.hourlyReport")}
                </ButtonOutlined>
              ) : (
                ""
              )}
            </>
          )}
          {pathname === "/admin/reports" && (
            <>
              {activeTab >= 1 && activeTab <= 2 && isAdmin && (
                <ButtonOutlined
                  icon={<HowToRegIcon />}
                  onClick={addClients}
                  className="auth-clientes"
                >
                  {t("button_texts.authorizeClients")}
                </ButtonOutlined>
              )}
              {activeTab === 3 && (
                <div className="btn-charts">
                  <ButtonOutlined
                    icon={<BarChartIcon />}
                    className="chart-btn"
                    onClick={() => setShowCharts((prev) => !prev)}
                  >
                    {showCharts === true
                      ? t("button_texts.hideCharts")
                      : t("button_texts.showCharts")}
                  </ButtonOutlined>
                </div>
              )}
            </>
          )}
          {pathname === "/client/reports" && (
            <>
              {activeTab === 3 && (
                <div className="btn-charts">
                  <ButtonOutlined
                    icon={<BarChartIcon />}
                    className="chart-btn"
                    onClick={() => setShowCharts((prev) => !prev)}
                  >
                    {showCharts === true
                      ? t("button_texts.hideCharts")
                      : t("button_texts.showCharts")}
                  </ButtonOutlined>
                </div>
              )}
            </>
          )}
          {[1].includes(activeTabReportInsp) &&
            pathname === "/user/reports/create/1" && (
              <>
                <ButtonOutlined
                  icon={<SendIcon />}
                  onClick={(e) => saveReport(e)}
                >
                  {t("button_texts.sendReport")}
                </ButtonOutlined>
                <ButtonOutlined
                  icon={<TableChartIcon />}
                  onClick={(e) => setActiveTabReportInsp(2)}
                >
                  {t("button_texts.samplingTable")}
                </ButtonOutlined>
                <ButtonOutlined
                  icon={<InfoIcon />}
                  onClick={(e) => setOpenModalIncident(true)}
                >
                  {t("button_texts.createIncident")}
                </ButtonOutlined>
              </>
            )}
          {[1].includes(activeTabReportByH) &&
            pathname === "/user/reports/create/2" && (
              <>
                <ButtonOutlined
                  icon={<SendIcon />}
                  onClick={(e) => saveReportH(e)}
                >
                  {t("button_texts.sendReport")}
                </ButtonOutlined>
                <ButtonOutlined
                  icon={<TableChartIcon />}
                  onClick={(e) => setActiveTabReportByH(2)}
                >
                  {t("button_texts.samplingTable")}
                </ButtonOutlined>
              </>
            )}
          {pathname === "/admin/users/create" && (
            <ButtonOutlined
              icon={<HowToRegIcon />}
              onClick={(e) => saveReport(e)}
            >
              {t("save")}
            </ButtonOutlined>
          )}
          {dataSes === "admin" &&
            pathname.includes("admin") &&
            typeof p !== "undefined" && (
              <>
                {pathname.includes("reports_by_h") && (
                  <>
                    {activeTabReportByH === 1 ? (
                      <>
                        <ButtonOutlined
                          icon={<CheckCircleIcon />}
                          onClick={(e) => aproveReportH(e)}
                        >
                          {t("button_texts.approveReport")}
                        </ButtonOutlined>
                        <ButtonOutlined
                          icon={<TableChartIcon />}
                          onClick={(e) => setActiveTabReportByH(2)}
                          disabled
                        >
                          {t("button_texts.samplingTable")}
                        </ButtonOutlined>
                      </>
                    ) : (
                      <>
                        <ButtonOutlined
                          iconStart={<ArrowBackIosIcon />}
                          onClick={(e) => setActiveTabReportByH(1)}
                        >
                          {t("button_texts.goBack")}
                        </ButtonOutlined>
                      </>
                    )}
                  </>
                )}
                {pathname.includes("reports_insp") && (
                  <>
                    {activeTabReportInsp === 1 ? (
                      <>
                        <ButtonOutlined
                          icon={<CheckCircleIcon />}
                          onClick={(e) => aproveReport(e)}
                        >
                          {t("button_texts.approveReport")}
                        </ButtonOutlined>
                        <ButtonOutlined
                          icon={<TableChartIcon />}
                          onClick={(e) => setActiveTabReportInsp(2)}
                          disabled
                        >
                          {t("button_texts.samplingTable")}
                        </ButtonOutlined>
                      </>
                    ) : (
                      <>
                        <ButtonOutlined
                          iconStart={<ArrowBackIosIcon />}
                          onClick={(e) => setActiveTabReportInsp(1)}
                        >
                          {t("button_texts.goBack")}
                        </ButtonOutlined>
                      </>
                    )}
                  </>
                )}
              </>
            )}
          {[2].includes(activeTabReportByH) && (
            <>
              {["/user/reports/create/2"].includes(pathname) && (
                <>
                  <ButtonOutlined
                    iconStart={<ArrowBackIosIcon />}
                    onClick={(e) => setActiveTabReportByH(1)}
                  >
                    {t("actions.return")}
                  </ButtonOutlined>
                </>
              )}
            </>
          )}

          {[2].includes(activeTabReportInsp) && (
            <>
              {["/user/reports/create/1"].includes(pathname) && (
                <>
                  <ButtonOutlined
                    iconStart={<ArrowBackIosIcon />}
                    onClick={(e) => setActiveTabReportInsp(1)}
                  >
                    {t("actions.return")}
                  </ButtonOutlined>
                </>
              )}
            </>
          )}

          {pathname === "/admin/users" && (
            <>
              <ButtonOutlined
                icon={<PersonAddAltIcon />}
                onClick={handleClickModal}
              >
                <>{t("actions.createUser")}</>
              </ButtonOutlined>
            </>
          )}
          {pathname === "/admin/employees" && (
            <>
              <ButtonOutlined
                icon={<PersonAddAltIcon />}
                onClick={handleClickModal2}
              >
                <>{t("actions.createEmployee")}</>
              </ButtonOutlined>
            </>
          )}
          {pathname === "/admin/clients" && (
            <>
              <ButtonOutlined
                icon={<PersonAddAltIcon />}
                onClick={handleClickModal3}
              >
                <>{t("actions.createClient")}</>
              </ButtonOutlined>
            </>
          )}
          {pathname === "/admin/suppliers" && (
            <>
              <ButtonOutlined
                icon={<PersonAddAltIcon />}
                onClick={handleClickModal4}
              >
                <>{t("actions.createSupplier")}</>
              </ButtonOutlined>
            </>
          )}
        </div>
      </div>
    </>
  );
}
