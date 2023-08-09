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

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import SubHeader from "./SubHeader";
import { MainContext } from "../context/MainContext";
import { useContext } from "react";
import { checkClient, checkEmployee, checkUser } from "../api/daryan.api";

let val;
if (typeof window !== "undefined") {
  // This code will only be executed in the browser
  const value = localStorage.getItem("sesType");
  val = value;
}
export default function Header() {
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
      label: `${langu === "es" ? "Reportes" : "Reports"}`,
      route: "/user/reports",
      ico: faFileLines,
      fun: (e) => {},
    },
    {
      label: `${langu === "es" ? "Configuracion" : "Configuration"}`,
      route: "/user/my-account",
      ico: faGear,
      fun: (e) => {
        setShowConfig(true);
      },
    },
    {
      label: `${langu === "es" ? "Salir" : "Logout"}`,
      route: "/user/login",
      ico: faRightFromBracket,
      fun: (e) => {
        localStorage.removeItem("sesType");
      },
    },
  ];
  const [linksUser, setLinksUser] = useState(initialForm);
  useEffect(() => {
    //language
    let val;
    if (typeof window !== "undefined") {
      // This code will only be executed in the browser
      const value = localStorage.getItem("sesType");
      val = value;
    }
    if (val === "user") {
      setLinksUser([
        {
          label: `${langu === "es" ? "Reportes" : "Reports"}`,
          route: "/user/reports",
          ico: faFileLines,
          fun: (e) => {},
        },
        {
          label: `${langu === "es" ? "Configuracion" : "Configuration"}`,
          route: "/user/my-account",
          ico: faGear,
          fun: (e) => {
            setShowConfig((prev) => !prev);
          },
        },
        {
          label: `${langu === "es" ? "Salir" : "Logout"}`,
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
          label: `${langu === "es" ? "Reportes" : "Reports"}`,
          route: "/client/reports",
          ico: faFileLines,
          fun: (e) => {},
        },
        {
          label: `${langu === "es" ? "Configuracion" : "Configuration"}`,
          route: "/client/my-account",
          ico: faGear,
          fun: (e) => {
            setShowConfig(true);
          },
        },
        {
          label: `${langu === "es" ? "Salir" : "Logout"}`,
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
            label: `${langu === "es" ? "Reportes" : "Reports"}`,
            route: "/admin/reports",
            ico: faFileLines,
            fun: (e) => {},
          },
          {
            //label: `${langu === "es" ? "Reportes" : "Reports"}`,
            label: `${langu === "es" ? "Usuarios" : "Users"}`,
            route: "/admin/users",
            ico: faUsers,
            fun: (e) => {},
          },
          {
            label: `${langu === "es" ? "Empleados" : "Employees"}`,
            route: "/admin/employees",
            ico: faUsersGear,
            fun: (e) => {},
          },
          {
            label: `${langu === "es" ? "Clientes" : "Clients"}`,
            route: "/admin/clients",
            ico: faUsersBetweenLines,
            fun: (e) => {},
          },
          {
            label: `${langu === "es" ? "Proveedores" : "Suppliers"}`,
            route: "/admin/suppliers",
            ico: faUsersViewfinder,
            fun: (e) => {},
          },
          {
            label: `${langu === "es" ? "Configuracion" : "Configuration"}`,
            route: "/admin/my-account",
            ico: faGear,
            fun: (e) => {
              setShowConfig(true);
            },
          },
          {
            label: `${langu === "es" ? "Salir" : "Logout"}`,

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
            label: `${langu === "es" ? "Reportes" : "Reports"}`,
            route: "/admin/reports",
            ico: faFileLines,
            fun: (e) => {},
          },
          {
            label: `${langu === "es" ? "Configuracion" : "Configuration"}`,
            route: "/admin/my-account",
            ico: faGear,
            fun: (e) => {
              setShowConfig(true);
            },
          },
          {
            label: `${langu === "es" ? "Salir" : "Logout"}`,

            route: "/admin/login",
            ico: faRightFromBracket,
            fun: (e) => {
              localStorage.removeItem("sesType");
            },
          },
        ]);
      }
    }
    // setLinksAdmin(initialForm);
    // setLinksClient(initialForm);
  }, [langu, isAdmin]);

  const [linksClient, setLinksClient] = useState([
    {
      label: `${langu === "es" ? "Reportes" : "Reports"}`,
      route: "/client/reports",
      ico: faFileLines,
      fun: (e) => {},
    },
    {
      label: `${langu === "es" ? "Configuracion" : "Configuration"}`,
      route: "/client/my-account",
      ico: faGear,
      fun: (e) => {
        setShowConfig((prev) => !prev);
      },
    },
    {
      label: `${langu === "es" ? "Salir" : "Logout"}`,
      route: "/client/login",
      ico: faRightFromBracket,
      fun: (e) => {
        localStorage.removeItem("sesType");
      },
    },
  ]);

  const [linksAdmin, setLinksAdmin] = useState([
    {
      label: `${langu === "es" ? "Configuracion" : "Configuration"}`,
      route: "/admin/my-account",
      ico: faGear,
      fun: (e) => {
        setShowConfig(true);
      },
    },
    {
      label: `${langu === "es" ? "Salir" : "Logout"}`,

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
      if (event.key === 'sesType') {
        
      }
    };
    window.addEventListener('storage', handleStorageChange);
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
                    label: `${langu === "es" ? "Reportes" : "Reports"}`,
                    route: "/admin/reports",
                    ico: faFileLines,
                    fun: (e) => {},
                  },
                  {
                    //label: `${langu === "es" ? "Reportes" : "Reports"}`,
                    label: `${langu === "es" ? "Usuarios" : "Users"}`,
                    route: "/admin/users",
                    ico: faUsers,
                    fun: (e) => {},
                  },
                  {
                    label: `${langu === "es" ? "Empleados" : "Employees"}`,
                    route: "/admin/employees",
                    ico: faUsersGear,
                    fun: (e) => {},
                  },
                  {
                    label: `${langu === "es" ? "Clientes" : "Clients"}`,
                    route: "/admin/clients",
                    ico: faUsersBetweenLines,
                    fun: (e) => {},
                  },
                  {
                    label: `${langu === "es" ? "Proveedores" : "Suppliers"}`,
                    route: "/admin/suppliers",
                    ico: faUsersViewfinder,
                    fun: (e) => {},
                  },
                  {
                    label: `${langu === "es" ? "Configuracion" : "My Account"}`,
                    route: "/admin/my-account",
                    ico: faGear,
                    fun: (e) => {
                      setShowConfig(true);
                    },
                  },
                  {
                    label: `${langu === "es" ? "Salir" : "Logout"}`,

                    route: "/admin/login",
                    ico: faRightFromBracket,
                    fun: (e) => {
                      localStorage.removeItem("sesType");
                    },
                  },
                ]);
              }else{
                setIsAdmin(false);
                setLinksAdmin([
                  {
                    label: `${langu === "es" ? "Reportes" : "Reports"}`,
                    route: "/admin/reports",
                    ico: faFileLines,
                    fun: (e) => {},
                  },                  
                  {
                    label: `${langu === "es" ? "Configuracion" : "My Account"}`,
                    route: "/admin/my-account",
                    ico: faGear,
                    fun: (e) => {
                      setShowConfig(true);
                    },
                  },
                  {
                    label: `${langu === "es" ? "Salir" : "Logout"}`,

                    route: "/admin/login",
                    ico: faRightFromBracket,
                    fun: (e) => {
                      localStorage.removeItem("sesType");
                    },
                  },
                ]);
              }
              //router.push('/user/reports');
              //    window.location.replace("/user/reports");
              //const { email, name, id_supplier, hour } = data;
              //const { last_id } = datares;
              // setDataClients((prev) => [
              //   {
              //     id: `${last_id}`,
              //     id_supplier: `${id_supplier}`,
              //     fullname: name,
              //     email,
              //     status: "1",
              //     hour: Number(hour) === 1 ? true : false,
              //   },
              //   ...prev,
              // ]);

              // btnCloseRef.current.click();
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
              //remove the sesType from local storage
            } else {
              //localStorage.setItem("sesType", "user");
              // get token from local storage
              //router.push('/user/reports');
              //    window.location.replace("/user/reports");
              //const { email, name, id_supplier, hour } = data;
              //const { last_id } = datares;
              // setDataClients((prev) => [
              //   {
              //     id: `${last_id}`,
              //     id_supplier: `${id_supplier}`,
              //     fullname: name,
              //     email,
              //     status: "1",
              //     hour: Number(hour) === 1 ? true : false,
              //   },
              //   ...prev,
              // ]);
              // btnCloseRef.current.click();
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
            } else {
              //localStorage.setItem("sesType", "user");
              // get token from local storage
              //router.push('/user/reports');
              //    window.location.replace("/user/reports");
              //const { email, name, id_supplier, hour } = data;
              //const { last_id } = datares;
              // setDataClients((prev) => [
              //   {
              //     id: `${last_id}`,
              //     id_supplier: `${id_supplier}`,
              //     fullname: name,
              //     email,
              //     status: "1",
              //     hour: Number(hour) === 1 ? true : false,
              //   },
              //   ...prev,
              // ]);
              // btnCloseRef.current.click();
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
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  //useEffect(() => {}, [val]);

  useEffect(() => {
    // const handleStorageChange = (event) => {
    //   if (event.key === 'sesType') {
    //     
    //   }
    // };
    // window.addEventListener('storage', handleStorageChange);
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
    return () => {
      // window.removeEventListener('storage', handleStorageChange);
      //setMapData(initialForm);
    };
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
                      label === "Mi Cuenta" ||
                      label === "My Account" ||
                      label === "Configuracion" ||
                      label === "Configuration"
                        ? "#"
                        : route
                    }
                    onClick={(e) =>
                      (label === "Salir" ||
                        label === "Logout" ||
                        label === "Mi Cuenta" ||
                        label === "My Account" ||
                        label === "Configuracion" ||
                        label === "Configuration") &&
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
