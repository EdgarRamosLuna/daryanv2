import { useEffect, useState } from "react";
import style from "../styles/login.module.css";
import { loginEmployee } from "../api/daryan.api";
import { MainContext } from "../context/MainContext";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const [user, setUser] = useState(" ");
  const [password, setPassword] = useState("");
  const cleanField = (e) => {
    setUser("");
    e.target.value = "";
  };
  const { toast } = useContext(MainContext);
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const onSubmmit = handleSubmit(async (data) => {
    setLoader(true);
    await loginEmployee(data)
      .then((res) => {
        const datares = res.data;
        if (datares.error) {
          toast.error(datares.msg, {
            duration: 5000,
          });
          setLoader(false);
        } else {
          localStorage.setItem("sesType", "user");
          localStorage.setItem("t", datares.token);
          setTimeout(() => {
            toast.success(datares.msg, {
              duration: 4000,
            });
            navigate("/user/reports");
            setLoader(false);
          }, 100);
          //router.push('/user/reports');
          //window.location.replace("/user/reports");
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
        //console.log(err);
        toast.error(err, {
          duration: 5000,
        });
      });
  });

  const [sesion, setSession] = useState(null);

  useEffect(() => {
    setSession(localStorage.getItem("sesType"));
    if (localStorage.getItem("sesType") === "user") {
      window.location.replace("/user/reports");
    }
  }, []);
  /**
   * const onSubmmit = handleSubmit(async (data) => {
    setSaving(true);
    await createClient(data)
      .then((res) => {
        const datares = res.data;
        if (datares.error) {
          toast.error(datares.message, {
            duration: 5000,
          });
        } else {
          toast.success(datares.message, {
            duration: 4000,
          });
          const { email, name, id_supplier, hour } = data;
          const { last_id } = datares;
          setDataClients((prev) => [
            {
              id: `${last_id}`,
              id_supplier: `${id_supplier}`,
              fullname: name,              
              email,
              status: "1",
              hour: Number(hour) === 1 ? true : false,
            },
            ...prev,
          ]);

          btnCloseRef.current.click();
        }
      })
      .catch((err) => {
        //console.log(err);
        toast.error(err, {
          duration: 5000,
        });
      });

    //console.log(res);

    setSaving(false);
  });

  return (
    <CreateForm>
      <p>Crear Cliente</p>
      <form autoComplete="off" onSubmit={onSubmmit}>
        <div className="item-from-container">
          <label htmlFor="name">Proveedor</label>
          <select
            name="id_supplier"
            {...register("id_supplier", {
              validate: (value) => value !== "0" && value !== "",
            })}
   * 
   * / */
  return (
    <main>
      <div className={style.login}>
        <div className={style.login_cont}>
          <div className={style.login_form}>
            <div className={style.logo}>
              <img
                src="/assets/img/logo.png"
                alt="Daryan"
                width={100}
                height={50}
              />
            </div>
            <form onSubmit={onSubmmit}>
              <div className={style.input_container}>
                <label htmlFor="email">Correo:</label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  {...register("email", {
                    required: "Correo requerido",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Ingresa un correo valido",
                    },
                    // minLength: {
                    //   value: 11,
                    //   message: "This input must exceed 10 characters",
                    // },
                  })}

                  // value={user}
                  //  onChange={(e) => setUser(e.target.value.replace(" ", ""))}
                />
                {errors.email && (
                  <span className="error">{errors.email.message}</span>
                )}
              </div>
              <div className={style.input_container}>
                <label htmlFor="password">Contraseña:</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  {...register("password", {
                    validate: (value) => value !== 0 && value !== "",
                    required: "Contraseña requerida",
                    minLength: {
                      value: 6,
                      message: "Contraseña debe tener al menos 6 caracteres",
                    },

                    //
                  })}
                  //value={password}
                  //onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && (
                  <span className="error">{errors.password.message}</span>
                )}
              </div>
              <div className={style.forget_container}>
                <div className="">
                  <span>Olvidaste tu contraseña?</span>
                </div>
              </div>
              <div className={style.button_container}>
                <button type="submit" disabled={loader === true ? true : false}>
                  {loader ? (
                    <img src="/assets/img/loading.svg" alt="" style={{height:"100%"}}/>
                  ) : (
                    "Ingresar"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
