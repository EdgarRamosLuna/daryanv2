import React, { useContext, useState, useEffect } from "react";
import Loader from "../Loader";
import { MainContext } from "../../context/MainContext";
import ComponentPagination from "../ComponentPagination";
import NoInfo from "../helpers/NoInfo";
import { useTranslation } from "react-i18next";
import { Button, Chip } from "@mui/material";

const TableComponent = ({ groupedData, loader }) => {
  const { t } = useTranslation();
  // Add state for current page and rows per page
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(20);

  const {
    setShowDtable,
    setRDetailsData,
    setPartNumber,
    setShowDEtable,
    tableFilters,
    LANG,
    langu,
  } = useContext(MainContext);

  // Calculate total pages
  const totalEntries = Object.keys(groupedData).length;
  const totalPages = Math.ceil(totalEntries / rowsPerPage);

  // Paginate data
  const paginate = (data, currentPage, rowsPerPage) => {
    const start = (currentPage - 1) * rowsPerPage;
    return Object.entries(data).slice(start, start + rowsPerPage);
  };

  const [paginatedData, setPaginatedData] = useState(
    paginate(groupedData, currentPage, rowsPerPage)
  );

  // Update paginated data whenever groupedData, currentPage or rowsPerPage changes
  useEffect(() => {
    setPaginatedData(paginate(groupedData, currentPage, rowsPerPage));
  }, [groupedData, currentPage, rowsPerPage]);

  const showDetailsTable = (part_number) => {
    setShowDtable(true);
    //filter data by key as part_number
    const filteredData = groupedData[part_number];
    setPartNumber(part_number);
    setRDetailsData(filteredData);
  };

  const showExtraDetails = (date, partNumber) => {
    setShowDEtable(true);
    setPartNumber(`${date}`);
    const filteredData = groupedData[partNumber].filter(
      (item) => item.date === date.toString()
    );

    setRDetailsData(filteredData);
  };

  // Handle pagination
  const handleFirstPageClick = () => setCurrentPage(1);
  const handleLastPageClick = () => setCurrentPage(totalPages);
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <table className="table-totals">
      <thead>
    <tr>
      <th>{t('reports.partNumber')}</th>
      <th>{t('reports.date')}</th>
      {tableFilters[0].total_in === true && <th>{t('reports.total_inspected')}</th>}
      {tableFilters[0].total_ng === true && <th>{t('reports.total_ng_pieces')}</th>}
      {tableFilters[0].total_ok === true && <th>{t('reports.total_ok_pieces')}</th>}
      {tableFilters[0].total_rw === true && <th>{t('reports.total_re_work_parts')}</th>}
      {tableFilters[0].total_sc === true && <th>{t('reports.total_scrap')}</th>}
      {tableFilters[0].total_wh === true && <th>{t('reports.worked_h')}</th>}
      <th></th>
    </tr>
  </thead>
        <tbody>
          <div className={loader === false ? "loaderContainer" : ""}>
            <Loader>
              <img src="/assets/img/loading2.svg" alt="" />
            </Loader>
          </div>
          {Object.entries(groupedData).map(([partNumber, dates]) => {
            return dates.map((dateData, index) => {
              return (
                <tr
                  className={
                    loader === false ? "tr-h rloaderContainer" : "tr-hd"
                  }
                  key={`${partNumber}-${index}`}
                >
                  {index === 0 && (
                    <td
                      className="table-center td-nh"
                      rowSpan={dates.length}                                            
                    >                                 
                        <Button variant="contained" 
                        color="success"
                        sx={{
                          
                          cursor:'pointer !important'
                        }}
                        onClick={() => showDetailsTable(partNumber)}>{partNumber}</Button>                       
                    </td>
                  )}
                  <td className="table-center">{dateData.date}</td>

                  {tableFilters[0].total_in === true && (
                    <td className="table-center">{dateData.total_inspected}</td>
                  )}
                  {tableFilters[0].total_ng === true && (
                    <td className="table-center">{dateData.total_ng_pieces}</td>
                  )}
                  {tableFilters[0].total_ok === true && (
                    <td className="table-center">{dateData.total_ok_pieces}</td>
                  )}
                  {tableFilters[0].total_rw === true && (
                    <td className="table-center">
                      {dateData.total_re_work_parts}
                    </td>
                  )}
                  {tableFilters[0].total_sc === true && (
                    <td className="table-center">{dateData.total_scrap}</td>
                  )}
                  {tableFilters[0].total_wh === true && (
                    <td className="table-center">{dateData.worked_h}</td>
                  )}
                 
                  {/* <td className="table-center">{dateData.total_A}</td> */}
                </tr>
              );
            });
          })}
          {Object.keys(groupedData).length === 0 && !loader && (
            <NoInfo/>
          )}
        </tbody>
      </table>
      <ComponentPagination
        currentPage={currentPage}
        totalPages={totalPages}
        handleFirstPageClick={handleFirstPageClick}
        handlePageChange={handlePageChange}
        handleLastPageClick={handleLastPageClick}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        data={totalEntries}
      />
    </>
  );
};

export default TableComponent;
