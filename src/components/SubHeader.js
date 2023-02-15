import style from './styles.module.css';

import { Link, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { MainContext } from '../context/MainContext';

let val;
if (typeof window !== "undefined") {
  // This code will only be executed in the browser
  const value = localStorage.getItem("sesType");
  val = value;
}
export default function SubHeader() {
    const pathname = useLocation().pathname;
  const {saveReport} = useContext(MainContext);
    //console.log(pathname);
    const path = pathname.replaceAll('/', '');
 //   const name = path.replace('user', '');
    //console.log(path.replace('user', ''));

  return (
    <div className={style.subHeader}>
        {path === 'userreports' && <Link to="/user/reports/create">Nuevo Reporte</Link>}
        {path === 'userreportscreate' && <button onClick={(e) => saveReport(e)}>Enviar Reporte</button>}
        
    </div>
  )
}

