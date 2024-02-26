import { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";
import Loader from "../Loader";
import Checkbox from "../Checkbox";
import { Table } from "../../styles/Styles";
import TableComponent from "./TableComponent";
import ReportsByH from "./ReportsByH";
import ComponentPagination from "../ComponentPagination";
import TabContainer from "../tabs/TabContainer";
import DatePickerRange from "../datepicker/DateRangePicker";

import {
  Box,
  TextField,
  Select,
  MenuItem,
  List,
  ListItem,
  IconButton,
  Grid,
  FormControlLabel,
  Checkbox as CheckboxMUI,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import FilterTable from "./FilterTable";
import Charts from "./Charts";
import TableRowComponent from "./TableRowComponent";
import useReportClient from "../../hooks/useReportClient";
registerLocale("es", es);
function ReportsTable({ data, dataReportByH }) {
  const {
    reportesComponents,
    nameFilter,
    dLastDate,
    dfirstDate,
    reportDates,
    loader,
    singleView,
    authClientsC,
    serverNodeUrl,
    currentPage,
    totalPages,
    rowsPerPage,
    nameFilterByH,
    uniqueClients,
    selectedClient,
    clientsToReport,    
    dateStart,
    dateEnd,
    filterOption,
    nameFilter2,
    uniqueSuppliers,
    filtersSupplier,
    uniquePart_number,
    filtersPartNumber,
    uniqueLots,
    filtersLot,
    uniqueSerial,
    filtersSerial,
    showFIltersT,
    showCharts,
    totalGeneral,
    isDownloading,
    handleNameFilterChange,
    setDateStart,
    setDateEnd,
    handleCheckBox,
    getPaginatedData,
    handleDel,
    handleFirstPageClick,
    handlePageChange,
    handleLastPageClick,
    setRowsPerPage,
    addClientToList,
    removeClient,
    handleNameFilterChange5,
    handleNameFilterChange2,
    handleNameFilterChange3,
    handleNameFilterChange4,
    setFilterOption,
    showFilterTable,
    setIsDownloading,
    t,
    setFiltersSupplier,
    setFiltersPartNumber,
    setFiltersLot,
    setFiltersSerial,
    dataToTable,    
    reportsByHour
  } = useReportClient({data, dataReportByH});

  console.log(Boolean(reportsByHour))
  const tabContent = {
    1: {
      componenteTitle: reportesComponents["insp"].p,
      componenteTop: (
        <div className="header-container">
          <form autoComplete="off">
            <Grid
              sx={{
                marginTop: "15px",
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
              }}
            >
              <div className="filter-item">
                <TextField
                  id="outlined-basic"
                  label={t("reports.search")}
                  variant="outlined"
                  autoComplete="off"
                  sx={{
                    width: "90%",
                  }}
                  type="text"
                  name="buscar"
                  value={nameFilter}
                  onChange={(e) => handleNameFilterChange(e)}
                  placeholder={t("reports.search")}
                />
              </div>
              <div className="filter-item">
              
              </div>
              <DatePickerRange
                setDateStart={setDateStart}
                setDateEnd={setDateEnd}
                dLastDateByPartNumber={dLastDate}
                dfirstDateByPartNumber={dfirstDate}
                reportDates={reportDates}
              />
            </Grid>
          </form>
        </div>
      ),
      componenteMiddle: (
        <div className="table-body table-reports">
          <table>
            <thead>
              <tr>
                <th>
                  <Checkbox
                    type="all"
                    id={0}
                    callback={handleCheckBox}
                    data={getPaginatedData()}
                  />
                </th>
                <th>{t("reports.part_number")}</th>
                <th>{t("reports.plant")}</th>
                <th>{t("reports.supplier")}</th>
                <th>{t("reports.date")}</th>
                <th>{t('Usuario modifica')}</th>
                <th>{t('Employee captured')}</th>
                <th>{t("reports.status")}</th>
                <th>{t('Tabla de muestreo')}</th>
                <th>{t("reports.actions")}</th>
              </tr>
            </thead>
            <tbody>
              <div className={loader === false ? "loaderContainer" : ""}>
                <Loader>
                  <img src="/assets/img/loading2.svg" alt="" />
                </Loader>
              </div>
              {getPaginatedData().length === 0 ? (
                <tr>
                  <td
                    colSpan="10"
                    className="table-center"
                    style={{ opacity: `${loader ? 0 : 1}` }}
                  >
                    <h1>{t("reports.noDatabaseInformation")}</h1>
                  </td>
                </tr>
              ) : (
                getPaginatedData().map((item, index) => (
                  <TableRowComponent
                    item={item}
                    singleView={singleView}
                    index={index}
                    handleDel={handleDel}
                    handleCheckBox={handleCheckBox}
                    getPaginatedData={getPaginatedData}
                    authClientsC={authClientsC}
                    t={t}
                    key={index}
                    serverNodeUrl={serverNodeUrl}
                    
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      ),
      componenteBottom: (
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
      ),
    },
    2: {
      componenteTitle: reportesComponents["byh"]?.p,
      componenteTop: (
        <>      
        {Boolean(reportsByHour) ?   <div className="header-container">
            <form autoComplete="off">
              <Grid
                sx={{
                  marginTop: "15px",
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                }}
              >
                <div className="filter-item">
                  <TextField
                    id="outlined-basic"
                    label={t("reports.search")}
                    variant="outlined"
                    autoComplete="off"
                    sx={{
                      width: "90%",
                    }}
                    type="text"
                    name="buscar"
                    value={nameFilterByH}
                    onChange={(e) => handleNameFilterChange(e)}
                    placeholder="Proveedor, #Parte, #Lote, #Serie, #Planta"
                  />
                </div>
                <div className="filter-item">
                  <Box
                    sx={{
                      visibility:
                        uniqueClients.length > 0 ? "visible" : "hidden",
                    }}
                  >
                    <Box>
                      <Select
                        value={selectedClient}
                        onChange={addClientToList}
                        sx={{
                          width: "90%",
                        }}
                      >
                        <MenuItem value="0">
                          {t("reports.selectAClient")}
                        </MenuItem>
                        {uniqueClients.map((option) => (
                          <MenuItem key={option} value={option.id}>
                            {option.fullname}
                          </MenuItem>
                        ))}
                      </Select>
                    </Box>
                    <Box>
                      <List
                        sx={{
                          display: `${
                            clientsToReport.length > 0 ? "flex" : "none"
                          }`,
                          flexDirection: "column",
                        }}
                      >
                        {clientsToReport.map((client, ind) => (
                          <ListItem key={ind}>
                            <span>{client.clientName}</span>
                            <IconButton onClick={() => removeClient(client.id)}>
                              <CloseIcon sx={{ color: "rgb(87, 0, 0)" }} />
                            </IconButton>
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                  </Box>
                </div>
                <DatePickerRange
                  setDateStart={setDateStart}
                  setDateEnd={setDateEnd}
                  dLastDateByPartNumber={dLastDate}
                  dfirstDateByPartNumber={dfirstDate}
                  reportDates={reportDates}
                />
              </Grid>
            </form>
          </div> : ""}  
        
        </>
      ) ,
      componenteMiddle: (
        <ReportsByH
          data={dataReportByH}
          dateStart={dateStart}
          dateEnd={dateEnd}
          setDateStart={setDateStart}
          setDateEnd={setDateEnd}
          nameFilterByH={nameFilterByH}
          loader={loader}
        />
      ),
    },
    3: {
      componenteTitle: reportesComponents["total_insp"].p,
      componenteTop: (
        <div className="header-container2">
          <form autoComplete="off">
            <Box
              className=""
              sx={{
                width: "99%",
              }}
            >
              {Number(filterOption) === 0 && (
                <Box
                  className=""
                  sx={{
                    width: "100%",
                  }}
                >
                  <TextField
                    id="serial"
                    label={t("reports.search")}
                    value={nameFilter2}
                    onChange={handleNameFilterChange5}
                    select
                    sx={{
                      width: "100%",
                    }}
                  >
                    {uniqueSuppliers.map((serial, indx) => (
                      <MenuItem key={indx} value={serial}>
                        {serial}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>
              )}
              {Number(filterOption) === 1 && (
                <Box
                  className=""
                  sx={{
                    width: "100%",
                  }}
                >
                  <TextField
                    id="part_number"
                    label={t("reports.partNumber")}
                    value={nameFilter2}
                    onChange={handleNameFilterChange2}
                    disabled={filtersSupplier.length === 0}
                    select
                    sx={{
                      width: "99%",
                    }}
                  >
                    {uniquePart_number.map((part_number, indx) => (
                      <MenuItem key={indx} value={part_number}>
                        {t("reports.partNumber")} #{part_number}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>
              )}
              {Number(filterOption) === 2 && (
                <Box
                  className=""
                  sx={{
                    width: "100%",
                  }}
                >
                  <TextField
                    id="lot"
                    label={t("reports.lot")}
                    value={nameFilter2}
                    onChange={handleNameFilterChange3}
                    disabled={filtersPartNumber.length === 0}
                    select
                    sx={{
                      width: "99%",
                    }}
                  >
                    {uniqueLots.map((lot, indx) => (
                      <MenuItem key={indx} value={lot}>
                        {t("reports.lot")} #{lot}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>
              )}
              {Number(filterOption) === 3 && (
                <Box
                  className=""
                  sx={{
                    width: "100%",
                  }}
                >
                  <TextField
                    id="serial"
                    label={t("reports.serialNumber")}
                    value={nameFilter2}
                    onChange={handleNameFilterChange4}
                    disabled={filtersPartNumber.length === 0}
                    select
                    sx={{
                      width: "99%",
                    }}
                  >
                    {uniqueSerial.map((serial, indx) => (
                      <MenuItem key={indx} value={serial}>
                        {t("reports.series")} #{serial}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>
              )}
            </Box>
            <Box className="filter-options">
              <Box className="filter-items">
                <Box className="filter-item-checkbox">
                  <FormControlLabel
                    control={
                      <CheckboxMUI
                        checked={Number(filterOption) === 0}
                        onChange={(e) => setFilterOption(e.target.value)}
                        value={0}
                      />
                    }
                    label={t("reports.suppliers")}
                  />
                  <List
                    sx={{
                      display: `${
                        filtersSupplier.length > 0 ? "flex" : "none"
                      }`,
                      flexDirection: "column",
                    }}
                  >
                    {filtersSupplier.map((filterSupplier, ind) => (
                      <ListItem key={ind}>
                        <span>{filterSupplier}</span>
                        <IconButton
                          onClick={() =>
                            setFiltersSupplier((prev) =>
                              prev.filter((pre) => pre !== filterSupplier)
                            )
                          }
                        >
                          <CloseIcon sx={{ color: "rgb(87, 0, 0)" }} />
                        </IconButton>
                      </ListItem>
                    ))}
                  </List>
                </Box>
                <Box className="filter-item-checkbox">
                  <FormControlLabel
                    control={
                      <CheckboxMUI
                        checked={Number(filterOption) === 1}
                        onChange={(e) => setFilterOption(e.target.value)}
                        value={1}
                      />
                    }
                    label={t("reports.partNumber")}
                  />
                  <List
                    sx={{
                      display: `${
                        filtersPartNumber.length > 0 ? "flex" : "none"
                      }`,
                      flexDirection: "column",
                    }}
                  >
                    {filtersPartNumber.map((filterPartNumber, ind) => (
                      <ListItem key={ind}>
                        <span>{filterPartNumber}</span>
                        <IconButton
                          onClick={() =>
                            setFiltersPartNumber((prev) =>
                              prev.filter((pre) => pre !== filterPartNumber)
                            )
                          }
                        >
                          <CloseIcon sx={{ color: "rgb(87, 0, 0)" }} />
                        </IconButton>
                      </ListItem>
                    ))}
                  </List>
                </Box>
                <Box className="filter-item-checkbox">
                  <FormControlLabel
                    control={
                      <CheckboxMUI
                        checked={Number(filterOption) === 2}
                        onChange={(e) => setFilterOption(e.target.value)}
                        value={2}
                      />
                    }
                    label={t("reports.lot")}
                  />
                  <List
                    sx={{
                      display: `${filtersLot.length > 0 ? "flex" : "none"}`,
                      flexDirection: "column",
                    }}
                  >
                    {filtersLot.map((filterLot, ind) => (
                      <ListItem key={ind}>
                        <span>{filterLot}</span>
                        <IconButton
                          onClick={() =>
                            setFiltersLot((prev) =>
                              prev.filter((pre) => pre !== filterLot)
                            )
                          }
                        >
                          <CloseIcon sx={{ color: "rgb(87, 0, 0)" }} />
                        </IconButton>
                      </ListItem>
                    ))}
                  </List>
                </Box>
                <Box className="filter-item-checkbox">
                  <FormControlLabel
                    control={
                      <CheckboxMUI
                        checked={Number(filterOption) === 3}
                        onChange={(e) => setFilterOption(e.target.value)}
                        value={3}
                      />
                    }
                    label={t("reports.serialNumber")}
                  />
                  <List
                    sx={{
                      display: `${filtersSerial.length > 0 ? "flex" : "none"}`,
                      flexDirection: "column",
                    }}
                  >
                    {filtersSerial.map((filterSerial, ind) => (
                      <ListItem key={ind}>
                        <span>{filterSerial}</span>
                        <IconButton
                          onClick={() =>
                            setFiltersSerial((prev) =>
                              prev.filter((pre) => pre !== filterSerial)
                            )
                          }
                        >
                          <CloseIcon sx={{ color: "rgb(87, 0, 0)" }} />
                        </IconButton>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Box>
            </Box>
            <DatePickerRange
              setDateStart={setDateStart}
              setDateEnd={setDateEnd}
              dLastDateByPartNumber={dLastDate}
              dfirstDateByPartNumber={dfirstDate}
              reportDates={reportDates}
            />

            <div className="table-controlls">
              {showFIltersT && <FilterTable />}
              <div className="table-controlls-left">
                <div
                  className={`table-controlls-left-item ${
                    showFIltersT ? "activeFilters" : ""
                  }`}
                  onClick={showFilterTable}
                >
                  <i className="fa-solid fa-filter"></i>
                </div>
              </div>
            </div>
          </form>
          <div className={`charts ${showCharts === true && "smoothFadeIn"}`}>
            {showCharts === true && (
              <Charts
                totalGeneral={totalGeneral}
                setIsDownloading={setIsDownloading}
                isDownloading={isDownloading}
              />
            )}
          </div>
        </div>
      ),
      componenteMiddle: (
        <div className="table-body table-reports">
          <TableComponent groupedData={dataToTable} loader={loader} />
        </div>
      ),
    },
  };
  const tabContentNoByH = {
    1: {
      componenteTitle: reportesComponents["insp"].p,
      componenteTop: (
        <div className="header-container">
          <form autoComplete="off">
            <Grid
              sx={{
                marginTop: "15px",
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
              }}
            >
              <div className="filter-item">
                <TextField
                  id="outlined-basic"
                  label={t("reports.search")}
                  variant="outlined"
                  autoComplete="off"
                  sx={{
                    width: "90%",
                  }}
                  type="text"
                  name="buscar"
                  value={nameFilter}
                  onChange={(e) => handleNameFilterChange(e)}
                  placeholder={t("reports.search")}
                />
              </div>
              <div className="filter-item">
              
              </div>
              <DatePickerRange
                setDateStart={setDateStart}
                setDateEnd={setDateEnd}
                dLastDateByPartNumber={dLastDate}
                dfirstDateByPartNumber={dfirstDate}
                reportDates={reportDates}
              />
            </Grid>
          </form>
        </div>
      ),
      componenteMiddle: (
        <div className="table-body table-reports">
          <table>
            <thead>
              <tr>
                <th>
                  <Checkbox
                    type="all"
                    id={0}
                    callback={handleCheckBox}
                    data={getPaginatedData()}
                  />
                </th>
                <th>{t("reports.part_number")}</th>
                <th>{t("reports.plant")}</th>
                <th>{t("reports.supplier")}</th>
                <th>{t("reports.date")}</th>
                <th>{t('Usuario modifica')}</th>
                <th>{t('Employee captured')}</th>
                <th>{t("reports.status")}</th>
                <th>{t('Tabla de muestreo')}</th>
                <th>{t("reports.actions")}</th>
              </tr>
            </thead>
            <tbody>
              <div className={loader === false ? "loaderContainer" : ""}>
                <Loader>
                  <img src="/assets/img/loading2.svg" alt="" />
                </Loader>
              </div>
              {getPaginatedData().length === 0 ? (
                <tr>
                  <td
                    colSpan="10"
                    className="table-center"
                    style={{ opacity: `${loader ? 0 : 1}` }}
                  >
                    <h1>{t("reports.noDatabaseInformation")}</h1>
                  </td>
                </tr>
              ) : (
                getPaginatedData().map((item, index) => (
                  <TableRowComponent
                    item={item}
                    singleView={singleView}
                    index={index}
                    handleDel={handleDel}
                    handleCheckBox={handleCheckBox}
                    getPaginatedData={getPaginatedData}
                    authClientsC={authClientsC}
                    t={t}
                    key={index}
                    serverNodeUrl={serverNodeUrl}
                    
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      ),
      componenteBottom: (
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
      ),
    },
    3: {
      componenteTitle: reportesComponents["total_insp"].p,
      componenteTop: (
        <div className="header-container2">
          <form autoComplete="off">
            <Box
              className=""
              sx={{
                width: "99%",
              }}
            >
              {Number(filterOption) === 0 && (
                <Box
                  className=""
                  sx={{
                    width: "100%",
                  }}
                >
                  <TextField
                    id="serial"
                    label={t("reports.search")}
                    value={nameFilter2}
                    onChange={handleNameFilterChange5}
                    select
                    sx={{
                      width: "100%",
                    }}
                  >
                    {uniqueSuppliers.map((serial, indx) => (
                      <MenuItem key={indx} value={serial}>
                        {serial}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>
              )}
              {Number(filterOption) === 1 && (
                <Box
                  className=""
                  sx={{
                    width: "100%",
                  }}
                >
                  <TextField
                    id="part_number"
                    label={t("reports.partNumber")}
                    value={nameFilter2}
                    onChange={handleNameFilterChange2}
                    disabled={filtersSupplier.length === 0}
                    select
                    sx={{
                      width: "99%",
                    }}
                  >
                    {uniquePart_number.map((part_number, indx) => (
                      <MenuItem key={indx} value={part_number}>
                        {t("reports.partNumber")} #{part_number}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>
              )}
              {Number(filterOption) === 2 && (
                <Box
                  className=""
                  sx={{
                    width: "100%",
                  }}
                >
                  <TextField
                    id="lot"
                    label={t("reports.lot")}
                    value={nameFilter2}
                    onChange={handleNameFilterChange3}
                    disabled={filtersPartNumber.length === 0}
                    select
                    sx={{
                      width: "99%",
                    }}
                  >
                    {uniqueLots.map((lot, indx) => (
                      <MenuItem key={indx} value={lot}>
                        {t("reports.lot")} #{lot}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>
              )}
              {Number(filterOption) === 3 && (
                <Box
                  className=""
                  sx={{
                    width: "100%",
                  }}
                >
                  <TextField
                    id="serial"
                    label={t("reports.serialNumber")}
                    value={nameFilter2}
                    onChange={handleNameFilterChange4}
                    disabled={filtersPartNumber.length === 0}
                    select
                    sx={{
                      width: "99%",
                    }}
                  >
                    {uniqueSerial.map((serial, indx) => (
                      <MenuItem key={indx} value={serial}>
                        {t("reports.series")} #{serial}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>
              )}
            </Box>
            <Box className="filter-options">
              <Box className="filter-items">
                <Box className="filter-item-checkbox">
                  <FormControlLabel
                    control={
                      <CheckboxMUI
                        checked={Number(filterOption) === 0}
                        onChange={(e) => setFilterOption(e.target.value)}
                        value={0}
                      />
                    }
                    label={t("reports.suppliers")}
                  />
                  <List
                    sx={{
                      display: `${
                        filtersSupplier.length > 0 ? "flex" : "none"
                      }`,
                      flexDirection: "column",
                    }}
                  >
                    {filtersSupplier.map((filterSupplier, ind) => (
                      <ListItem key={ind}>
                        <span>{filterSupplier}</span>
                        <IconButton
                          onClick={() =>
                            setFiltersSupplier((prev) =>
                              prev.filter((pre) => pre !== filterSupplier)
                            )
                          }
                        >
                          <CloseIcon sx={{ color: "rgb(87, 0, 0)" }} />
                        </IconButton>
                      </ListItem>
                    ))}
                  </List>
                </Box>
                <Box className="filter-item-checkbox">
                  <FormControlLabel
                    control={
                      <CheckboxMUI
                        checked={Number(filterOption) === 1}
                        onChange={(e) => setFilterOption(e.target.value)}
                        value={1}
                      />
                    }
                    label={t("reports.partNumber")}
                  />
                  <List
                    sx={{
                      display: `${
                        filtersPartNumber.length > 0 ? "flex" : "none"
                      }`,
                      flexDirection: "column",
                    }}
                  >
                    {filtersPartNumber.map((filterPartNumber, ind) => (
                      <ListItem key={ind}>
                        <span>{filterPartNumber}</span>
                        <IconButton
                          onClick={() =>
                            setFiltersPartNumber((prev) =>
                              prev.filter((pre) => pre !== filterPartNumber)
                            )
                          }
                        >
                          <CloseIcon sx={{ color: "rgb(87, 0, 0)" }} />
                        </IconButton>
                      </ListItem>
                    ))}
                  </List>
                </Box>
                <Box className="filter-item-checkbox">
                  <FormControlLabel
                    control={
                      <CheckboxMUI
                        checked={Number(filterOption) === 2}
                        onChange={(e) => setFilterOption(e.target.value)}
                        value={2}
                      />
                    }
                    label={t("reports.lot")}
                  />
                  <List
                    sx={{
                      display: `${filtersLot.length > 0 ? "flex" : "none"}`,
                      flexDirection: "column",
                    }}
                  >
                    {filtersLot.map((filterLot, ind) => (
                      <ListItem key={ind}>
                        <span>{filterLot}</span>
                        <IconButton
                          onClick={() =>
                            setFiltersLot((prev) =>
                              prev.filter((pre) => pre !== filterLot)
                            )
                          }
                        >
                          <CloseIcon sx={{ color: "rgb(87, 0, 0)" }} />
                        </IconButton>
                      </ListItem>
                    ))}
                  </List>
                </Box>
                <Box className="filter-item-checkbox">
                  <FormControlLabel
                    control={
                      <CheckboxMUI
                        checked={Number(filterOption) === 3}
                        onChange={(e) => setFilterOption(e.target.value)}
                        value={3}
                      />
                    }
                    label={t("reports.serialNumber")}
                  />
                  <List
                    sx={{
                      display: `${filtersSerial.length > 0 ? "flex" : "none"}`,
                      flexDirection: "column",
                    }}
                  >
                    {filtersSerial.map((filterSerial, ind) => (
                      <ListItem key={ind}>
                        <span>{filterSerial}</span>
                        <IconButton
                          onClick={() =>
                            setFiltersSerial((prev) =>
                              prev.filter((pre) => pre !== filterSerial)
                            )
                          }
                        >
                          <CloseIcon sx={{ color: "rgb(87, 0, 0)" }} />
                        </IconButton>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Box>
            </Box>
            <DatePickerRange
              setDateStart={setDateStart}
              setDateEnd={setDateEnd}
              dLastDateByPartNumber={dLastDate}
              dfirstDateByPartNumber={dfirstDate}
              reportDates={reportDates}
            />

            <div className="table-controlls">
              {showFIltersT && <FilterTable />}
              <div className="table-controlls-left">
                <div
                  className={`table-controlls-left-item ${
                    showFIltersT ? "activeFilters" : ""
                  }`}
                  onClick={showFilterTable}
                >
                  <i className="fa-solid fa-filter"></i>
                </div>
              </div>
            </div>
          </form>
          <div className={`charts ${showCharts === true && "smoothFadeIn"}`}>
            {showCharts === true && (
              <Charts
                totalGeneral={totalGeneral}
                setIsDownloading={setIsDownloading}
                isDownloading={isDownloading}
              />
            )}
          </div>
        </div>
      ),
      componenteMiddle: (
        <div className="table-body table-reports">
          <TableComponent groupedData={dataToTable} loader={loader} />
        </div>
      ),
    },
  };
  return (
    <>
      <Table>
        <div className="table-container mb-5">
          <TabContainer tabContent={reportsByHour ? tabContent : tabContentNoByH} />
        </div>
      </Table>
    </>
  );
}

export default ReportsTable;
