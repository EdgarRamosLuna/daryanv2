import React, {
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";
import Loader from "../Loader";
import { Table } from "../../styles/Styles";
import { MainContext } from "../../context/MainContext";
import StatusBtn from "../StatusBtn";
import { Button, Grid, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import ComponentPagination from "../ComponentPagination";
import ModalMui from "../modal/ModalMui";
import SupplierDetails from "./suppliers/SupplierDetails";
import TabComponentMUI from "../tabs/TabComponentMUI";
import { toast } from "sonner";
import { getTotalReportsBySupplier } from "../../api/daryan.api";
import SupplierClients from "./suppliers/SupplierClients";


registerLocale("es", es);
function SuppliersTable({ data }) {
  const { t } = useTranslation();
  const { handleDel, setShowModalS, setUpdateId, isLoading, setIsLoading, showConfig } =
    useContext(MainContext);
  const [nameFilter, setNameFilter] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  
  const [reportDetails, setReportDetails] = useState([]);
  const [series, setSeries] = useState([]);
  const [clients, setClients] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [nIdSupplier, setIdSupplier] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, [data]);

  const handleFirstPageClick = () => {
    setCurrentPage(1);
  };
  const handleLastPageClick = () => {
    setCurrentPage(Math.ceil(filteredData.length / rowsPerPage));
  };
  const handleNameFilterChange = (event) => {
    setNameFilter(event.target.value);
  };

  const filterData = useCallback(() => {
    return data.filter((item) => {
      const name = item.fullname.toLowerCase();

      const phone = item.phone.toLowerCase();
      const fullName = `${name} ${phone}`; // combinamos name y id en una sola variable

      if (nameFilter && fullName.indexOf(nameFilter.toLowerCase()) === -1) {
        // buscamos dentro de fullName
        return false;
      }

      return true;
    });
  }, [nameFilter, data]);

  const filteredData = filterData();
  const getPaginatedData = useCallback(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return filteredData.slice(startIndex, endIndex);
  }, [filteredData]);
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const handlePageChange = useCallback(
    (currentPage) => {
      if (currentPage < 1) {
        setCurrentPage(1);
      } else if (currentPage > totalPages) {
        setCurrentPage(totalPages);
      } else {
        setCurrentPage(currentPage);
      }
    },
    [totalPages, currentPage]
  );
  const CustomInputD = forwardRef(({ onClick, children }, ref) => (
    <div className="custom-input" onClick={onClick} ref={ref}>
      {children}
      <i className="fa-solid fa-calendar-days"></i>
    </div>
  ));
  CustomInputD.displayName = "CustomInputD"; 
 
  const updateUser = (id_user) => {
    setUpdateId(id_user);
    setShowModalS(true);
  };
  useEffect(() => {
    const getReportBySupplier = async () => {
      try {
        const response = await getTotalReportsBySupplier(nIdSupplier);
        const { error: errorDb, message, data: dataResponse } = response.data;
        if (typeof errorDb !== "boolean") {
          toast.error("Ocurrio un error intentalo mas tarde");
        } else {
          const {
            totalInp,
            totalNG,
            totalOK,
            totalRework,
            totalScrap,
            TotalsByPartName,
            ClientsBySupplier
          } = dataResponse[0];
          setReportDetails(JSON.parse(TotalsByPartName));
          setClients(JSON.parse(ClientsBySupplier));
          setSeries([totalNG, totalOK, totalRework, totalScrap]);
        }
        //setTotalReports()
      } catch (error) {
        toast.error("Ocurrio un error intentalo mas tarde");
      }
    };

    if(Number(nIdSupplier) > 0){
      getReportBySupplier();
    }
    
  }, [nIdSupplier]);
  
  const handleShowModal = (nIdSupplier) =>{
    setOpenModal(true);
    setIdSupplier(nIdSupplier);
  }
  const tabsData = [
    {
      label: t("Reportes"),
      content:  <SupplierDetails
      nIdSupplier={nIdSupplier}
      reportDetails={reportDetails}
      series={series}
    />,
    },
    {
      label: t("Usuarios"),
      content: <SupplierClients data={clients}/>
    },
  ]

  useEffect(() => {
    
  
    setOpenModal(false)
    
  }, [showConfig])
  
  
  return (
    <>
    <ModalMui
      open={openModal}
      onClose={() => setOpenModal(false)}
      title={t("Detalles proveedor")}
      maxWidth={'80%'}
    >

      <TabComponentMUI tabs={tabsData} />  
     
    </ModalMui>
      <Table>
        <div className="table-container">
          <div className="header-container">
            <form autoComplete="off">
              <Grid
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <label htmlFor="name-filter">
                  {t("suppliers_section.table.searchProvider")}
                </label>
                <Grid
                  className=""
                  sx={{
                    width: "50%",
                  }}
                >
                  <TextField
                    type="text"
                    id="name-filter"
                    value={nameFilter}
                    onChange={handleNameFilterChange}
                    placeholder={t("suppliers_section.table.placeholder")}
                    fullWidth
                  />
                </Grid>
              </Grid>
            </form>
          </div>
          <div className="table-body table-reports">
            <table>
              <thead>
                <tr>
                  <th>{t("suppliers_section.table.name")}</th>
                  <th>{t("suppliers_section.table.phone")}</th>
                  <th>{t("suppliers_section.table.address")}</th>
                  <th>{t("suppliers_section.table.status")}</th>
                  <th>{t("suppliers_section.table.actions")}</th>
                </tr>
              </thead>
              <tbody>
                <div className={isLoading === false ? "loaderContainer" : ""}>
                  <Loader>
                    <img src="/assets/img/loading2.svg" alt="" />
                  </Loader>
                </div>
                {getPaginatedData().length === 0 ? (
                  <tr>
                    <td
                      colSpan="4"
                      className="table-center"
                      style={{ opacity: `${isLoading ? 0 : 1}` }}
                    >
                      <h1>{t("reports.no_data_in_database")}</h1>
                    </td>
                  </tr>
                ) : (
                  getPaginatedData().map((item, index) => (
                    <tr
                      key={index}
                      className={
                        isLoading === false ? "tr-h rloaderContainer" : "tr-hd"
                      }
                    >
                      <td className="table-center">
                        <Button variant="outlined" sx={{cursor:'pointer !important'}} onClick={() => handleShowModal(item.id)}>{item.fullname}</Button>
                      </td>
                      <td className="table-center">{item.phone}</td>
                      <td className="table-center">{item.address}</td>
                      <td
                        className="table-center"
                        style={{ width: 120, padding: "0 25px" }}
                      >
                        <StatusBtn
                          status={Number(item.status)}
                          id={item.id}
                          table="suppliers"
                        />
                      </td>
                      <td className="table-center">
                        <div className="actions">
                          <i
                            className="fa-solid fa-trash"
                            onClick={() => handleDel(item.id, "suppliers")}
                          ></i>
                          <i
                            className="fa-solid fa-pen-to-square"
                            onClick={() => updateUser(item.id)}
                          ></i>
                  
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <ComponentPagination
            currentPage={currentPage}
            totalPages={totalPages}
            handleFirstPageClick={handleFirstPageClick}
            handlePageChange={handlePageChange}
            handleLastPageClick={handleLastPageClick}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            data={data.length}
          />
        </div>
      </Table>
    </>
  );
}

export default SuppliersTable;
