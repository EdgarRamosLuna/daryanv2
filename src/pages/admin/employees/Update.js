import React, { useContext, useEffect } from "react";
import { CreateForm } from "../../../styles/Styles";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { updateEmployee, getSuppliers, getUser } from "../../../api/daryan.api";
import { useNavigate, useParams } from "react-router-dom";
import { MainContext } from "../../../context/MainContext";
const UpdateEmployee = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const {
    btnCloseRef,
    toast,
    dataEmployees,
    setDataEmployees,
    updateId,
    setUpdateId,
    suppliers,
    setSuppliers,
  } = useContext(MainContext);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  useEffect(() => {
    if (updateId !== 0) {
      dataEmployees.map((item) => {
        if (item.id === updateId) {
          const { fullname, email } = item;
          setValue("name", fullname);
          setValue("email", email);
        }
      });
    }
    //        const res = await getUser(updateId);
    //      const { name, user, email, id_supplier } = res.data;
    // console.log(title, description);
    // setValue("title", title);
    // setValue("description", description);
  }, []);
  //console.log(dataSupplier);
  const onSubmmit = handleSubmit(async (data) => {
    setSaving(true);
    data.id = updateId;
    await updateEmployee(data)
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
          const { email, name } = data;
          setDataEmployees((prev) => {
            const newClients = prev.map((client) => {
              if (client.id === updateId) {
                return {
                  id: `${updateId}`,
                  fullname: name,
                  email,
                  status: "1",
                };
              } else {
                return client;
              }
            });
            return newClients;
          });

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
      <p>Actualizar Informacion del empleado</p>
      <form autoComplete="off" onSubmit={onSubmmit}>
        <div className="item-from-container">
          <label htmlFor="name">Nombre del empleado</label>
          <input
            type="text"
            id="name"
            name="name"
            {...register("name", { required: true })}

            //   required
            //   onFocus={(e) => e.target.select()}
            // //  value={dataToSave.name}
          />
          {errors.name && <span className="error">Informacion requerida</span>}
        </div>
        {/* <div className="item-from-container">
          <label htmlFor="user">Usuario</label>
          <input
            type="text"
            id="user"
            name="user"
            {...register("user", { required: true })}
            // required
            // onFocus={(e) => e.target.select()}
            // value={dataToSave.user}
            // onChange={(e) =>
            //   setDataToSave({
            //     ...dataToSave,
            //     [e.target.dataset.name || e.target.name]: e.target.value,
            //   })
            // }
          />
          {errors.user && <span className="error">Informacion requerida</span>}
        </div> */}
        <div className="item-from-container">
          <label htmlFor="email">Correo</label>
          <input
            {...register("email", {
              required: "Informacion requerida",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Ingresa un correo valido",
              },
              // minLength: {
              //   value: 11,
              //   message: "This input must exceed 10 characters",
              // },
            })}
          />
          {errors.email && (
            <span className="error">{errors.email.message}</span>
          )}
        </div>
        {/* {errors.insp && errors.hour && <span className="error">Debes seleccionar una opción para continuar</span>} */}
        <div className="item-from-container">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            name="password"
            {...register("password", { required: false })}
            // required
            // onFocus={(e) => e.target.select()}
            // value={dataToSave.password}
          />
          {errors.password && (
            <span className="error">Informacion requerida</span>
          )}
          <br />
          <button type="submit" disabled={saving === true ? true : false}>
            {saving ? <img src="/assets/img/loading.svg" alt="" /> : "Guardar"}
          </button>
        </div>
      </form>
      {/*  <button type="submit">Create Account</button>

        <p>
          Already have an account? <a href="#">Sign in</a>
  </p>*/}
    </CreateForm>
  );
};

export default UpdateEmployee;
