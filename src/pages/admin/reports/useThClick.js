import { useContext, useState } from "react";
import { MainContext } from "../../../context/MainContext";

export default function useThClick(eliminarColumna2) {
    const {deletingInc, setDeletingInc} = useContext(MainContext);
    const [currentThText, setCurrentThText] = useState('');
    const [previousThText, setPreviousThText] = useState('');
  
    function handleClick(e) {
      const td = e.target;
      const columnIndex = td.cellIndex;
      const ths = td.closest('table').querySelectorAll('thead th');
      const th = ths[columnIndex];
      if(th === undefined) return false;
      const thText = th.textContent;
      //console.log(thText);

      setCurrentThText(thText);
      const previousTh = th.previousElementSibling;
      if (previousTh && previousTh.tagName === 'TH') {
        const previousThText = previousTh.textContent;
        if(previousThText === 'E' || previousThText === 'F' || previousThText === 'G' || previousThText === 'H' || previousThText === 'I'){
          //setPreviousThText(previousThText);
          //setDeletingInc(previousThText);
          eliminarColumna2(previousThText);

        }
        //console.log(previousThText);
      } else {
        setPreviousThText('');
      }
    }
  
    return [currentThText, previousThText, handleClick];
  }
  