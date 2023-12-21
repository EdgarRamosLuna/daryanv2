import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import {
    faFilePdf,
  } from "@fortawesome/free-solid-svg-icons";
const BtnReportViewPdf = ({item, tablaMuestreo}) => {
    return (
        <>        
        <a
            href={`http://phpstack-1070657-3746640.cloudwaysapps.com/reporte-inspeccion/${item.id}/?tablaMuestreo=${tablaMuestreo ? 'show' : 'hide'}`}
            target="_blank"
            className="btn-pdf"
            rel="noreferrer"
        >
            {!navigator.onLine ? (
                <FontAwesomeIcon icon={faFilePdf} />
            ) : (
                <i className="fa-solid fa-file-pdf"></i>
            )}
        </a>
        </>
    )
}

export default BtnReportViewPdf