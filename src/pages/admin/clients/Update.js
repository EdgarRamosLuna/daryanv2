import React, { useContext, useEffect } from "react";
import { CreateForm } from "../../../styles/Styles";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { updateClient } from "../../../api/daryan.api";
import { MainContext } from "../../../context/MainContext";
import { MenuItem, Select } from "@mui/material";
import { useTranslation } from "react-i18next";
const UpdateClient = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const {
    btnCloseRef,
    toast,
    dataClients,
    setDataClients,
    updateId,
    suppliers,
  } = useContext(MainContext);
  const [saving, setSaving] = useState(false);
  const { t } = useTranslation();
  const [supplierId, setSupplierId] = useState(0);
  useEffect(() => {
    if (updateId !== 0) {
      dataClients.map((item) => {
        if (item.id === updateId) {
          const { fullname, email, id_supplier, hour } = item;
          setValue("name", fullname);
          setValue("email", email);
          setValue("id_supplier", id_supplier);
          setValue("hour", hour === "1" ? true : false);
          setSupplierId(id_supplier)
        }
      });
    }
  }, []);
  const onSubmmit = handleSubmit(async (data) => {
    setSaving(true);
    data.id = updateId;
    await updateClient(data)
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
          setDataClients((prev) => {
            const newClients = prev.map((client) => {
              if (client.id === updateId) {
                return {
                  id: `${updateId}`,
                  id_supplier: `${id_supplier}`,
                  fullname: name,
                  email,
                  status: "1",
                  hour: hour === 1 ? true : false,
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
        toast.error(err, {
          duration: 5000,
        });
      });

    setSaving(false);
  });

  return (
    <CreateForm>
      <p>Actualizar Informacion del cliente</p>
      <form autoComplete="off" onSubmit={onSubmmit}>
        <div className="item-from-container">
          <label id="" sx={{ margin: "0 !important" }}>
            {t("clients_section.supplier")}
          </label>

          <Select
            name="id_supplier"
            labelId=""
            {...register("id_supplier", {
              validate: (value) => value !== "0" && value !== "",
            })}
            value={supplierId}
            onChange={(event) => {
              const selectedValue = event.target.value;
              setSupplierId(selectedValue);  // O cualquier acción que desees realizar
            }}
          >
            <MenuItem value="0">{t("clients_section.selectSupplier")}</MenuItem>
            {suppliers.map((supplier, indx) => (
              <MenuItem key={indx} value={supplier.id}>
                {supplier.fullname}
              </MenuItem>
            ))}
          </Select>
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
          />
          {errors.name && <span className="error">Informacion requerida</span>}
        </div>

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
          <label htmlFor="name">Reporte por hora</label>
          <div className="checkbox-contain">
     
            <div className="checkbox-item">
              <input
                type="checkbox"
                id="hour"
                name="hour"
                {...register("hour", { required: false })}
              />
            </div>
          </div>
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

export default UpdateClient;
