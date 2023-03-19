import React, { useEffect, useState } from "react";
import style from "./styles.module.css";
import {
  faFileLines,
  faUser,
  faGear,
  faRightFromBracket,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, Outlet, useLocation } from "react-router-dom";
import SubHeader from "./SubHeader";
const linksUser = [
  {
    label: "Mis Reportes",
    route: "/user/reports",
    ico: faFileLines,
    fun: () => {},
  },
  {
    label: "Mi Cuenta",
    route: "/user/my-account",
    ico: faGear,
    fun: () => {},
  },
  {
    label: "Salir",
    route: "/user/login",
    ico: faRightFromBracket,
    fun: (e) => {
      localStorage.removeItem("sesType");
    },
  },
];

const linksClient = [
  {
    label: "Mis Reportes",
    route: "/client/reports",
    ico: faFileLines,
    fun: () => {},
  },
/*  {
    label: "Mi Cuenta",
    route: "/client/my-account",
    ico: faGear,
    fun: () => {},
  },*/
  {
    label: "Salir",
    route: "/client/login",
    ico: faRightFromBracket,
    fun: (e) => {
      localStorage.removeItem("sesType");
    },
  },
];
const linksAdmin = [
  {
    label: "Reportes",
    route: "/admin/reports",
    ico: faFileLines,
    fun: (e) => {},
  },
  {
    label: "Usuarios",
    route: "/admin/users",
    ico: faUsers,
    fun: (e) => {},
  },
  {
    label: "Empleados",
    route: "/admin/employees",
    ico: faUsers,
    fun: (e) => {},
  },
  {
    label: "Clientes",
    route: "/admin/clients",
    ico: faUsers,
    fun: (e) => {},
  },
  {
    label: "Proveedores",
    route: "/admin/suppliers",
    ico: faUsers,
    fun: (e) => {},
  },
  /*{
    label: "Mi Cuenta",
    route: "/admin/my-account",
    ico: faGear,
    fun: (e) => {},
  },*/
  {
    label: "Salir",
    route: "/admin/login",
    ico: faRightFromBracket,
    fun: (e) => {
      localStorage.removeItem("sesType");
    },
  },
];

let val;
if (typeof window !== "undefined") {
  // This code will only be executed in the browser
  const value = localStorage.getItem("sesType");
  val = value;
}
export default function Header() {
  const [mapData, setMapData] = useState([]);
  useEffect(() => {
    if (val === "user") {
      setMapData(linksUser);
    }
    if (val === "client") {
      setMapData(linksClient);
    }
    if (val === "admin") {
      setMapData(linksAdmin);
    }
  }, []);
  const pathname = useLocation().pathname;

  console.log(pathname.includes("reports"));
  return (
    <>
      <header className={style.header}>
        <div className="menu-container">
          <nav>
            <ul>
            <li className={style.logo}>
                <Link href="/app/admin" className="logo">
                  <img src="/assets/img/logo.png" alt="Daryan Saltillo" />
                </Link>
              </li>
              {mapData.map(({ label, route, ico, fun }, ind) => (
                <li key={route}>
                  <Link
                    to={route}
                    onClick={(e) => (label === "Salir" ? fun(e) : "")}
                    className={pathname.includes(`${route}`) ? "active" : ""}
                  >
                    <div className={style.ico}>
                      <FontAwesomeIcon icon={ico} />
                    </div>
                    <div className={style.linkText}>{label}</div>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>
      <div className={style.childrenContainer}>
        <SubHeader />
        <div className={style.children}>
          <Outlet />
        </div>
      </div>
    </>
  );
}
