import React from "react";
import { ModalCard } from "../../styles/ModalCard";
import { MainContext } from "../../context/MainContext";
import { useContext } from "react";
import { useEffect } from "react";

const FilterTable = ({ tableFilters2 }) => {
  const {
    tableFilters,
    setTableFilters,
    setTableFilters2,
    LANG,
    langu,
    setLangu,
  } = useContext(MainContext);
  // update filter array checked target value
  const updateTableFilters = (e) => {
    const { name, checked } = e.target;

    if (tableFilters2) {
      const newTableFilters = [...tableFilters2];
      //console.log(newTableFilters);
      newTableFilters[0][name] = checked;

      setTableFilters2(newTableFilters);
    } else {
      const newTableFilters = [...tableFilters];
      //console.log(newTableFilters);
      newTableFilters[0][name] = checked;
      setTableFilters(newTableFilters);
    }
  };
  return (
    <ModalCard>
      <div className="filter-option-container">
        <div className="filter-option-item">
          <input
            type="checkbox"
            name="total_in"
            id="f-ti"
            checked={
              tableFilters2
                ? tableFilters2[0].total_in
                : tableFilters[0].total_in
            }
            onChange={updateTableFilters}
          />
          <label htmlFor="f-ti" className="label-center">
            {LANG.find((item) => item.lang === langu).total_in}
            {/* <th>{LANG.find((item) => item.lang === langu).total_in}</th> */}
          </label>
        </div>
        <div className="filter-option-item">
          <input
            type="checkbox"
            name="total_ng"
            id="f-tng"
            checked={
              tableFilters2
                ? tableFilters2[0].total_ng
                : tableFilters[0].total_ng
            }
            onChange={updateTableFilters}
          />
          <label htmlFor="f-tng" className="label-center">
            {LANG.find((item) => item.lang === langu).total_ng}
          </label>
        </div>
        <div className="filter-option-item">
          <input
            type="checkbox"
            name="total_ok"
            id="f-tok"
            checked={
              tableFilters2
                ? tableFilters2[0].total_ok
                : tableFilters[0].total_ok
            }
            onChange={updateTableFilters}
          />
          <label htmlFor="f-tok" className="label-center">
            {LANG.find((item) => item.lang === langu).total_ok}
          </label>
        </div>
        <div className="filter-option-item">
          <input
            type="checkbox"
            name="total_rw"
            id="f-rwp"
            checked={
              tableFilters2
                ? tableFilters2[0].total_rw
                : tableFilters[0].total_rw
            }
            onChange={updateTableFilters}
          />
          <label htmlFor="f-rwp" className="label-center">
            {LANG.find((item) => item.lang === langu).total_rw}
          </label>
        </div>
        <div className="filter-option-item">
          <input
            type="checkbox"
            name="total_sc"
            id="f-ts"
            checked={
              tableFilters2
                ? tableFilters2[0].total_sc
                : tableFilters[0].total_sc
            }
            onChange={updateTableFilters}
          />
          <label htmlFor="f-ts" className="label-center">
            {LANG.find((item) => item.lang === langu).total_sc}
          </label>
        </div>
        <div className="filter-option-item">
          <input
            type="checkbox"
            name="total_wh"
            id="f-twh"
            checked={
              tableFilters2
                ? tableFilters2[0].total_wh
                : tableFilters[0].total_wh
            }
            onChange={updateTableFilters}
          />
          <label htmlFor="f-twh" className="label-center">
            {LANG.find((item) => item.lang === langu).total_wh}
          </label>
        </div>
      </div>
    </ModalCard>
  );
};

export default FilterTable;
