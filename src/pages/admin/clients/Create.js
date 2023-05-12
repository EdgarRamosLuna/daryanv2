import React, { useContext, useEffect } from "react";
import { CreateForm } from "../../../styles/Styles";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { createClient, getSuppliers, getUser } from "../../../api/daryan.api";
import { useNavigate, useParams } from "react-router-dom";
import { MainContext } from "../../../context/MainContext";
const CreateClient = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const { btnCloseRef, toast, dataClients, setDataClients, updateId, suppliers, setSuppliers } =
    useContext(MainContext);
  const [saving, setSaving] = useState(false);

  
  //console.log(dataSupplier);
  const onSubmmit = handleSubmit(async (data) => {
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
          >
            <option value="0">Selecciona un proveedor</option>
            {suppliers.map((supplier, indx) => (
              <option value={supplier.id}>{supplier.fullname}</option>
            ))}
          </select>

          {/* <input
            list="supplier"
            name="supplier"
            {...register("id_supplier", { required: true })}

            //   required
            //   onFocus={(e) => e.target.select()}
            // //  value={dataToSave.name}
          />
          <datalist id="supplier">
            <option value="1" key="">Test</option>
            {/* {uniquePart_number.map((part_number, indx) => {
              // Verificar si el navegador es Firefox, Safari o Edge
              const isFirefox = navigator.userAgent.indexOf("Firefox") !== -1;
              const isSafari =
                navigator.userAgent.indexOf("Safari") !== -1 ||
                navigator.userAgent.indexOf("AppleWebKit") !== -1;
              const isEdge = navigator.userAgent.indexOf("Edge") !== -1;

              // Crear etiqueta de opción
              const option = (
                <option value={part_number}>
                  {isFirefox ? `Parte #${part_number}` : "# Parte"}
                </option>
              );

              // Devolver opción
              return option;
            })} }
          </datalist> */}
          {errors.id_supplier && (
            <span className="error">Informacion requerida</span>
          )}
        </div>
        <div className="item-from-container">
          <label htmlFor="name">Nombre del cliente</label>
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
        <div className="item-from-container">
          <label htmlFor="name">Reporte por hora</label>
          <div className="checkbox-contain">
            {/* <div className="checkbox-item">
              <input
                type="checkbox"
                id="insp"
                name="insp"
                {...register("insp", { required: false })}
              />
              <label htmlFor="insp">Inspeccion</label>
            </div> */}
            <div className="checkbox-item">
              <input
                type="checkbox"
                id="hour"
                name="hour"
                {...register("hour", { required: false })}
              />
              {/* <label htmlFor="hour">Por Hora</label> */}
            </div>
          </div>
        </div>
        {/* {errors.insp && errors.hour && <span className="error">Debes seleccionar una opción para continuar</span>} */}
        <div className="item-from-container">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            name="password"
            {...register("password", { required: true })}
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

export default CreateClient;
