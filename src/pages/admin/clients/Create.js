import React, { useContext } from "react";
import { CreateForm } from "../../../styles/Styles";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { createClient } from "../../../api/daryan.api";
import { MainContext } from "../../../context/MainContext";
import { FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";
import { useTranslation } from "react-i18next";
const CreateClient = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const { t } = useTranslation();
  const { btnCloseRef, toast, setDataClients, suppliers } =
    useContext(MainContext);
  const [saving, setSaving] = useState(false);

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
        toast.error(err, {
          duration: 5000,
        });
      });

    setSaving(false);
  });

  return (
    <CreateForm>
      <p>{t('clients_section.title')}</p>
      <form autoComplete="off" onSubmit={onSubmmit}>
        <Grid className="">          
          <FormControl variant="standard" fullWidth>
            <label id="" sx={{margin:'0 !important'}}>
              {t('clients_section.supplier')}
            </label>
            <Select
              name="id_supplier"
              labelId=""
              {...register("id_supplier", {
                validate: (value) => value !== "0" && value !== "",
              })}
            >
              <MenuItem value="0">{t('clients_section.selectSupplier')}</MenuItem>
              {suppliers.map((supplier, indx) => (
                <MenuItem key={indx} value={supplier.id}>
                  {supplier.fullname}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {errors.id_supplier && (
            <span className="error">{t('requiredInfo')}</span>
          )}
        </Grid>
        <div className="item-from-container">
          <label htmlFor="name">{t('clients_section.clientName')}</label>
          <input
            type="text"
            id="name"
            name="name"
            {...register("name", { required: true })}
          />
          {errors.name && <span className="error">{t('requiredInfo')}</span>}
        </div>
  
        <div className="item-from-container">
          <label htmlFor="email">{t('requiredInfo')}</label>
          <input
            {...register("email", {
              required: t('requiredInfo'),
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
          <label htmlFor="name">{t('button_texts.hourlyReport')}</label>
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
          <label htmlFor="password">{t('clients_section.password')}</label>
          <input
            type="password"
            id="password"
            name="password"
            {...register("password", { required: true })}
    
          />
          {errors.password && (
            <span className="error">{t('requiredInfo')}</span>
          )}
          <br />
          <button type="submit" disabled={saving === true ? true : false}>
          {saving ? <img src="/assets/img/loading.svg" alt="" /> : t('clients_section.save')}
          </button>
        </div>
      </form>
    </CreateForm>
  );
};

export default CreateClient;
