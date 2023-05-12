import React, { useContext } from "react";
import { CreateForm } from "../../../styles/Styles";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { createUser } from "../../../api/daryan.api";
import { MainContext } from "../../../context/MainContext";
const CreateSupplier = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { btnCloseRef, toast, setDataUsers } = useContext(MainContext);
  const [saving, setSaving] = useState(false);

  //console.log(dataSupplier);
  const onSubmmit = handleSubmit(async (data) => {
    setSaving(true);
    await createUser(data)
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
          const { email, name, } = data;
          const { last_id } = datares;
          setDataUsers((prev) => [
            {
              id: `${last_id}`,
              fullname: name,              
              email,
              status: "1",
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
      <p>Crear Usuario</p>
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
              },
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
            {...register("password", { required: true })}
          />
          {errors.password && (
            <span className="error">Informacion requerida</span>
          )}
        </div>
        <div className="item-from-container">
          <>
            <label htmlFor="admin">
              Admin:{" "}
              <input
                type="checkbox"
                id="admin"
                name="admin"
                {...register("admin", { required: false })}
              />
            </label>
          </>
          <br />
          <button type="submit" disabled={saving === true ? true : false}>
            {saving ? <img src="/assets/img/loading.svg" alt="" /> : "Guardar"}
          </button>
        </div>
      </form>
    </CreateForm>
  );
};

export default CreateSupplier;
