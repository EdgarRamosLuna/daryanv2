import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import {
    faFilePdf,
  } from "@fortawesome/free-solid-svg-icons";
const BtnReportViewPdf = ({item, tablaMuestreo, serverNodeUrl}) => {
    const numOfRows = item.reports_cc.length;
    return (
        <>        
        <a
            href={`${serverNodeUrl}reporte-inspeccion${numOfRows > 20 ? '-xl':''}/${item.id}/?tablaMuestreo=${tablaMuestreo ? 'show' : 'hide'}`}
            target="_blank"
            className="btn-pdf"
            rel="noreferrer"
        >
            {!navigator.onLine ? (
                <FontAwesomeIcon icon={faFilePdf}    />
            ) : (
                <i className="fa-solid fa-file-pdf"></i>
            )}
        </a>
        </>
    )
}

export default BtnReportViewPdf