import React from "react";
import { ModalCard } from "../../styles/ModalCard";
import { MainContext } from "../../context/MainContext";
import { useContext } from "react";

const FilterTable = () => {
  const { tableFilters, setTableFilters } = useContext(MainContext);
  console.log(tableFilters);
  // update filter array checked target value
  const updateTableFilters = (e) => {
    const { name, checked } = e.target;
    const newTableFilters = [...tableFilters];
    //console.log(newTableFilters);
    newTableFilters[0][name] = checked;
    setTableFilters(newTableFilters);
  };
  return (
    <ModalCard>
      <div className="filter-option-container">
        <div className="filter-option-item">
          <input
            type="checkbox"
            name="total_in"
            id="f-ti"
            checked={tableFilters[0].total_in}
            onChange={updateTableFilters}
          />
          <label htmlFor="f-ti" className="label-center">
            TOTAL INSPECTED
          </label>
        </div>
        <div className="filter-option-item">
          <input
            type="checkbox"
            name="total_ng"
            id="f-tng"
            checked={tableFilters[0].total_ng}
            onChange={updateTableFilters}
          />
          <label htmlFor="f-tng" className="label-center">
            TOTAL NG PIECES
          </label>
        </div>
        <div className="filter-option-item">
          <input
            type="checkbox"
            name="total_ok"
            id="f-tok"
            checked={tableFilters[0].total_ok}
            onChange={updateTableFilters}
          />
          <label htmlFor="f-tok" className="label-center">
            TOTAL OK PIECES
          </label>
        </div>
        <div className="filter-option-item">
          <input
            type="checkbox"
            name="total_rw"
            id="f-rwp"
            checked={tableFilters[0].total_rw}
            onChange={updateTableFilters}
          />
          <label htmlFor="f-rwp" className="label-center">
            TOTAL RE-WORK PARTS
          </label>
        </div>
        <div className="filter-option-item">
          <input
            type="checkbox"
            name="total_sc"
            id="f-ts"
            checked={tableFilters[0].total_sc}
            onChange={updateTableFilters}
          />
          <label htmlFor="f-ts" className="label-center">
            TOTAL SCRAP
          </label>
        </div>
        <div className="filter-option-item">
          <input
            type="checkbox"
            name="total_wh"
            id="f-twh"
            checked={tableFilters[0].total_wh}
            onChange={updateTableFilters}
          />
          <label htmlFor="f-twh" className="label-center">
            TOTAL WORKED H
          </label>
        </div>
      </div>
    </ModalCard>
  );
};

export default FilterTable;
