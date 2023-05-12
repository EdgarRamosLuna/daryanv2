import React, { useContext, useEffect } from "react";
import { CreateForm } from "../../../styles/Styles";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { updateUser } from "../../../api/daryan.api";
import { useNavigate, useParams } from "react-router-dom";
import { MainContext } from "../../../context/MainContext";
const UpdateUser = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const {
    btnCloseRef,
    toast,
    dataUsers,
    setDataUsers,
    updateId,
  } = useContext(MainContext);
  const [saving, setSaving] = useState(false);
  useEffect(() => {
    if (updateId !== 0) {
      dataUsers.map((item) => {
        if (item.id === updateId) {
          const { fullname, email } = item;
          setValue("name", fullname);
          setValue("email", email);
        }
      });
    }
  }, []);
  const onSubmmit = handleSubmit(async (data) => {
    setSaving(true);
    data.id = updateId;
    await updateUser(data)
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
          setDataUsers((prev) => {
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
      <p>Actualizar información del usuario</p>
      <form autoComplete="off" onSubmit={onSubmmit}>
        <div className="item-from-container">
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            id="name"
            name="name"
            {...register("name", { required: true })}
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
              }
            })}
          />
          {errors.email && (
            <span className="error">{errors.email.message}</span>
          )}
        </div> 
        <div className="item-from-container">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            name="password"
            {...register("password", { required: false })}
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
    </CreateForm>
  );
};

export default UpdateUser;
