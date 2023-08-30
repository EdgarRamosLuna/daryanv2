import React from "react";
import { useTranslation } from "react-i18next";

const ComponentPagination = ({
  currentPage,
  totalPages,
  handleFirstPageClick,
  handlePageChange,
  handleLastPageClick,
  rowsPerPage,
  setRowsPerPage,
  totalEntries,
}) => {
  const { t } = useTranslation();

  return (
    <div className="pagination">
      <span>
        {t("pagination_options.pagination_info", {
          currentPage: currentPage,
          totalPages: totalPages,
        })}
      </span>

      <button disabled={currentPage === 1} onClick={handleFirstPageClick}>
        <i className="fa-solid fa-backward-step"></i>
      </button>
      <button
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        <i className="fa-solid fa-chevron-left"></i>
      </button>

      <button
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        <i className="fa-solid fa-chevron-right"></i>
      </button>
      <button
        disabled={currentPage === totalPages}
        onClick={handleLastPageClick}
      >
        <i className="fa-solid fa-forward-step"></i>
      </button>

      <select
        value={rowsPerPage}
        onChange={(event) => setRowsPerPage(parseInt(event.target.value))}
      >
        <option value="20">{t("pagination_options.20")}</option>
        <option value="50">{t("pagination_options.50")}</option>
        <option value="100">{t("pagination_options.100")}</option>
        <option value={totalEntries}>{t("pagination_options.all")}</option>
      </select>
    </div>
  );
};

export default ComponentPagination;
