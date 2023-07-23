import React from "react";

const ComponentPagination = ({currentPage, totalPages, handleFirstPageClick, handlePageChange, handleLastPageClick, rowsPerPage, setRowsPerPage, totalEntries}) => {
  return (
    <div className="pagination">
      <span>
        Página {currentPage} de {totalPages}
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
        <option value="20">20 filas por página</option>
        <option value="50">50 filas por página</option>
        <option value="100">100 filas por página</option>
        <option value={`${totalEntries}`}>todas filas</option>
      </select>
    </div>
  );
};

export default ComponentPagination;
