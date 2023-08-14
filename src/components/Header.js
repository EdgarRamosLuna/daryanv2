import React, { useEffect, useState } from "react";
import style from "./styles.module.css";
import {
  faFileLines,
  faUser,
  faGear,
  faRightFromBracket,
  faUsers,
  faUsersGear,
  faUsersBetweenLines,
  faUsersViewfinder,
} from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import SubHeader from "./SubHeader";
import { MainContext } from "../context/MainContext";
import { useContext } from "react";
import { checkClient, checkEmployee, checkUser } from "../api/daryan.api";
import { LanguageContext } from "../context/LanguageContext";

let val;
if (typeof window !== "undefined") {
  // This code will only be executed in the browser
  const value = localStorage.getItem("sesType");
  val = value;
}
export default function Header() {
  const { t } = useTranslation();
  const { lang, changeLanguage } = useContext(LanguageContext);

  
  const {
    toast,
    btnCloseRef,
    showConfig,
    setShowConfig,
    langu,
    isAdmin,
    setIsAdmin,
  } = useContext(MainContext);
  const pathname = useLocation().pathname;
  const navigate = useNavigate();
  const [mapData, setMapData] = useState([]);
  const initialForm = [
    {
      label: t("button_texts.reports"),
      route: "/user/reports",
      ico: faFileLines,
      fun: (e) => {},
    },
    {
      label: t("button_texts.myAccount"),
      route: "/user/my-account",
      ico: faGear,
      fun: (e) => {
        setShowConfig(true);
      },
    },
    {
      label: t("button_texts.logout"),
      route: "/user/login",
      ico: faRightFromBracket,
      fun: (e) => {
        localStorage.removeItem("sesType");
      },
    },
  ];
  const [linksUser, setLinksUser] = useState(initialForm);
  useEffect(() => {
    let val;
    if (typeof window !== "undefined") {
      const value = localStorage.getItem("sesType");
      val = value;
    }
    if (val === "user") {
      setLinksUser([
        {
          label: t("button_texts.reports"),
          route: "/user/reports",
          ico: faFileLines,
          fun: (e) => {},
        },
        {
          label: t("button_texts.myAccount"),
          route: "/user/my-account",
          ico: faGear,
          fun: (e) => {
            setShowConfig((prev) => !prev);
          },
        },
        {
          label: t("button_texts.logout"),
          route: "/user/login",
          ico: faRightFromBracket,
          fun: (e) => {
            localStorage.removeItem("sesType");
          },
        },
      ]);
    }
    if (val === "client") {
      setLinksClient([
        {
          label: t("button_texts.reports"),
          route: "/client/reports",
          ico: faFileLines,
          fun: (e) => {},
        },
        {
          label: t("button_texts.myAccount"),
          route: "/client/my-account",
          ico: faGear,
          fun: (e) => {
            setShowConfig(true);
          },
        },
        {
          label: t("button_texts.logout"),
          route: "/client/login",
          ico: faRightFromBracket,
          fun: (e) => {
            localStorage.removeItem("sesType");
          },
        },
      ]);
    }

    if (val === "admin") {
      if (isAdmin) {
        setLinksAdmin([
          {
            label: t("button_texts.reports"),
            route: "/admin/reports",
            ico: faFileLines,
            fun: (e) => {},
          },
          {
            label: t("button_texts.users"),
            route: "/admin/users",
            ico: faUsers,
            fun: (e) => {},
          },
          {
            label: t("button_texts.employees"),
            route: "/admin/employees",
            ico: faUsersGear,
            fun: (e) => {},
          },
          {
            label: t("button_texts.clients"),
            route: "/admin/clients",
            ico: faUsersBetweenLines,
            fun: (e) => {},
          },
          {
            label: t("button_texts.suppliers"),
            route: "/admin/suppliers",
            ico: faUsersViewfinder,
            fun: (e) => {},
          },
          {
            label: t("button_texts.myAccount"),
            route: "/admin/my-account",
            ico: faGear,
            fun: (e) => {
              setShowConfig(true);
            },
          },
          {
            label: t("button_texts.logout"),
            route: "/admin/login",
            ico: faRightFromBracket,
            fun: (e) => {
              localStorage.removeItem("sesType");
            },
          },
        ]);
      } else {
        setLinksAdmin([
          {
            label: t("button_texts.reports"),
            route: "/admin/reports",
            ico: faFileLines,
            fun: (e) => {},
          },
          {
            label: t("button_texts.myAccount"),
            route: "/admin/my-account",
            ico: faGear,
            fun: (e) => {
              setShowConfig(true);
            },
          },
          {
            label: t("button_texts.logout"),
            route: "/admin/login",
            ico: faRightFromBracket,
            fun: (e) => {
              localStorage.removeItem("sesType");
            },
          },
        ]);
      }
    }
  }, [lang, isAdmin]);

  const [linksClient, setLinksClient] = useState([
    {
      label: t("button_texts.reports"),
      route: "/client/reports",
      ico: faFileLines,
      fun: (e) => {},
    },
    {
      label: t("button_texts.myAccount"),
      route: "/client/my-account",
      ico: faGear,
      fun: (e) => {
        setShowConfig((prev) => !prev);
      },
    },
    {
      label: t("button_texts.logout"),
      route: "/client/login",
      ico: faRightFromBracket,
      fun: (e) => {
        localStorage.removeItem("sesType");
      },
    },
  ]);

  const [linksAdmin, setLinksAdmin] = useState([
    {
      label: t("button_texts.myAccount"),
      route: "/admin/my-account",
      ico: faGear,
      fun: (e) => {
        setShowConfig(true);
      },
    },
    {
      label: t("button_texts.logout"),
      route: "/admin/login",
      ico: faRightFromBracket,
      fun: (e) => {
        localStorage.removeItem("sesType");
      },
    },
  ]);

  useEffect(() => {
    // request to api to valida the token
    const token = localStorage.getItem("t");
    const handleStorageChange = (event) => {
      if (event.key === "sesType") {
      }
    };
    window.addEventListener("storage", handleStorageChange);
    const val = localStorage.getItem("sesType");

    const validateUser = async (token) => {
      if (val === "admin") {
        await checkUser(token)
          .then((res) => {
            const datares = res.data;
            if (datares.error) {
              toast.error(datares.message, {
                duration: 5000,
              });
              localStorage.removeItem("sesType");
              navigate("/admin/login");
            } else {
              // get token from local storage

              if (Number(datares.i) === 1) {
                setIsAdmin(true);
                setLinksAdmin([
                  {
                    label: t("button_texts.reports"),
                    route: "/admin/reports",
                    ico: faFileLines,
                    fun: (e) => {},
                  },
                  {
                    label: t("button_texts.users"),
                    route: "/admin/users",
                    ico: faUsers,
                    fun: (e) => {},
                  },
                  {
                    label: t("button_texts.employees"),
                    route: "/admin/employees",
                    ico: faUsersGear,
                    fun: (e) => {},
                  },
                  {
                    label: t("button_texts.clients"),
                    route: "/admin/clients",
                    ico: faUsersBetweenLines,
                    fun: (e) => {},
                  },
                  {
                    label: t("button_texts.suppliers"),
                    route: "/admin/suppliers",
                    ico: faUsersViewfinder,
                    fun: (e) => {},
                  },
                  {
                    label: t("button_texts.myAccount"),
                    route: "/admin/my-account",
                    ico: faGear,
                    fun: (e) => {
                      setShowConfig(true);
                    },
                  },
                  {
                    label: t("button_texts.logout"),
                    route: "/admin/login",
                    ico: faRightFromBracket,
                    fun: (e) => {
                      localStorage.removeItem("sesType");
                    },
                  },
                ]);
              } else {
                setIsAdmin(false);
                setLinksAdmin([
                  {
                    label: t("button_texts.reports"),
                    route: "/admin/reports",
                    ico: faFileLines,
                    fun: (e) => {},
                  },
                  {
                    label: t("button_texts.myAccount"),
                    route: "/admin/my-account",
                    ico: faGear,
                    fun: (e) => {
                      setShowConfig(true);
                    },
                  },
                  {
                    label: t("button_texts.logout"),
                    route: "/admin/login",
                    ico: faRightFromBracket,
                    fun: (e) => {
                      localStorage.removeItem("sesType");
                    },
                  },
                ]);
              }
            }
          })
          .catch((err) => {
            toast.error(err, {
              duration: 5000,
            });
          });
      }
      if (val === "user") {
        await checkEmployee(token)
          .then((res) => {
            const datares = res.data;
            if (datares.error) {
              toast.error(datares.message, {
                duration: 5000,
              });
              localStorage.removeItem("sesType");
              navigate("/user/login");
            }
          })
          .catch((err) => {
            toast.error(err, {
              duration: 5000,
            });
          });
      }
      if (val === "client") {
        await checkClient(token)
          .then((res) => {
            const datares = res.data;
            if (datares.error) {
              toast.error(datares.message, {
                duration: 5000,
              });
              localStorage.removeItem("sesType");
              navigate("/client/login");
            }
          })
          .catch((err) => {
            toast.error(err, {
              duration: 5000,
            });
          });
      }
    };
    validateUser(token);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [lang]);

  useEffect(() => {
    const val = localStorage.getItem("sesType");
    if (val === null) {
      navigate("/");
    }
    if (val === "user") {
      setMapData(linksUser);
    }
    if (val === "client") {
      setMapData(linksClient);
    }
    if (val === "admin") {
      setMapData(linksAdmin);
    }
  }, [linksUser, linksClient, linksAdmin]);

  useEffect(() => {
    btnCloseRef.current && btnCloseRef.current.click();
  }, [pathname]);
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
                    to={
                      ["Salir" ,
                    "Logout" ,
                    "Mi Cuenta",
                    "My Account",
                    "Configuración",
                    "Configuration",
                    "Settings"].includes(label)
                        ? "#"
                        : route
                    }
                    onClick={(e) =>
                    ["Salir" ,
                    "Logout" ,
                    "Mi Cuenta",
                    "My Account",
                    "Configuración",
                    "Configuration",
                    "Settings"].includes(label) &&
                      fun(e)
                    }
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
      <div className={`${style.childrenContainer} container-app`}>
        <SubHeader />
        <div className={style.children}>
          <Outlet />
        </div>
      </div>
    </>
  );
}
