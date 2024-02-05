import React from "react";

import SecondTableCreate3 from "./SecondTableCreate3";
import SecondTableCreate4 from "./SecondTableCreate4";
import { useTranslation } from "react-i18next";
const Create3 = ({
  divs,
  setDivs,
  reportType,
  divsR4,
  setDivsR4,
  setDivsSamplingTableInsp,
}) => {

  const { t } = useTranslation();

  return (
    <>
      <div className="container c3">
        <div className="title">
          <h3>{t("Tabla de muestreo")}</h3>
          <p>
            {t(`TablaMuestreoDesc`)}
          </p>
          <br />
        </div>
      </div>
      <div className="container c4">
        {reportType === "insp" && (
          <SecondTableCreate3 divs={divs} setDivs={setDivs} />
        )}
        {reportType === "byh" && (
          <SecondTableCreate4 divs={divsR4} setDivs={setDivsR4} />
        )}
      </div>
    </>
  );
};

export default Create3;
