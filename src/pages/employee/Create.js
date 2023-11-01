import React, { useState } from "react";

import SecondTableCreate from "./SecondTableCreate";
import Create3 from "./Create3";

import useReports from "../../hooks/useReports";
import ReportPart1 from "./ReportPart1";
import ReportPart3 from "./ReportPart3";

const Create = () => {
  const {
    reportIncidents,
    data,
    setData,
    suppliers,
    totalHours,
    serviceType,
    setServiceType,
    customerControl,
    setCustomerControl,
    onlyNumbers,
    total1,
    setTotal1,
    total2,
    setTotal2,
    total3,
    setTotal3,
    total4,
    setTotal4,
    total5,
    setTotal5,
    total6,
    setTotal6,
    total7,
    setTotal7,
    total8,
    setTotal8,
    total9,
    setTotal9,
    total10,
    setTotal10,
    total11,
    setTotal11,
    total12,
    setTotal12,
    total13,
    setTotal13,
    total14,
    setTotal14,
    container1Ref,
    handleScroll1,
    reportFooter2,
    divs2,
    numColumnas,
    reportFooter3,
    handleUpdate,
    producedBy,
    checkedBy,
    dataSes,
    setAuthorizedBy,
    authorizedBy,
    container2Ref,
    handleScroll2,
    titulosColumnas,
    divs,
    reportFooter,
    setProducedBy,
    setCheckedBy,
    divsSamplingTableInsp,
    setDivsSamplingTableInsp,
    activeTabReportInsp,
  } = useReports();

  
  const [dumpValue, setDumpValue] = useState("");

  const optionClause = [
    {
      value: "1",
      text: "Mal",
    },
    {
      value: "2",
      text: "Re trabajo",
    },
    {
      value: "3",
      text: "Scrap",
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => {
      return {
        ...prevData,
        rate: value,
      };
    });
  };
  const tabContent = {
    1: {
      component: (
        <>
          <ReportPart1
            data={data}
            setData={setData}
            suppliers={suppliers}
            totalHours={totalHours}
            handleInputChange={handleInputChange}
            serviceType={serviceType}
            setServiceType={setServiceType}
            customerControl={customerControl}
            setCustomerControl={setCustomerControl}
            onlyNumbers={onlyNumbers}
          />
          <div
            className="container c2 scrollX"
            ref={container1Ref}
            onScroll={handleScroll1}
          >
            <SecondTableCreate />
          </div>

          <ReportPart3
            reportFooter2={reportFooter2}
            divs2={divs2}
            dumpValue={dumpValue}
            optionClause={optionClause}
            numColumnas={numColumnas}
            reportFooter3={reportFooter3}
            handleUpdate={handleUpdate}
            reportIncidents={reportIncidents}
            producedBy={producedBy}
            checkedBy={checkedBy}
            dataSes={dataSes}
            setAuthorizedBy={setAuthorizedBy}
            authorizedBy={authorizedBy}
            container2Ref={container2Ref}
            handleScroll2={handleScroll2}
            titulosColumnas={titulosColumnas}
            divs={divs}
            total1={total1}
            setTotal1={setTotal1}
            total2={total2}
            setTotal2={setTotal2}
            total3={total3}
            setTotal3={setTotal3}
            total4={total4}
            setTotal4={setTotal4}
            total5={total5}
            setTotal5={setTotal5}
            total6={total6}
            setTotal6={setTotal6}
            total7={total7}
            setTotal7={setTotal7}
            total8={total8}
            setTotal8={setTotal8}
            total9={total9}
            setTotal9={setTotal9}
            total10={total10}
            setTotal10={setTotal10}
            total11={total11}
            setTotal11={setTotal11}
            total12={total12}
            setTotal12={setTotal12}
            total13={total13}
            setTotal13={setTotal13}
            total14={total14}
            setTotal14={setTotal14}
            reportFooter={reportFooter}
            setProducedBy={setProducedBy}
            setCheckedBy={setCheckedBy}
          />
        </>
      ),
    },
    2: {
      component: (
        <Create3
          divs={divsSamplingTableInsp}
          setDivs={setDivsSamplingTableInsp}
          reportType="insp"
        />
      ),
    },
  };
  return <>{tabContent[activeTabReportInsp]?.component}</>;
};

export default Create;
