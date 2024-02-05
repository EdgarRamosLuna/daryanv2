import React, { useContext} from "react";
import { CreateForm } from "../../../styles/Styles";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { createEmployee,} from "../../../api/daryan.api";
import { MainContext } from "../../../context/MainContext";
import { useTranslation } from "react-i18next";
const CreateEmployee = () => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { btnCloseRef, toast, setDataEmployees } =
    useContext(MainContext);
  const [saving, setSaving] = useState(false);
  
  const onSubmmit = handleSubmit(async (data) => {
    setSaving(true);
    await createEmployee(data)
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
          const { last_id } = datares;
          setDataEmployees((prev) => [
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
        toast.error(err, {
          duration: 5000,
        });
      });


    setSaving(false);
  });

  return (
    <CreateForm>
      <p>{t('Crear Empleado')}</p>
      <form autoComplete="off" onSubmit={onSubmmit}>
        <div className="item-from-container">
          <label htmlFor="name">{t('suppliers_section.name')}</label>
          <input
            type="text"
            id="name"
            name="name"
            {...register("name", { required: true })}
          />
          {errors.name && <span className="error">{t('Información requerida')}</span>}
        </div>

        <div className="item-from-container">
          <label htmlFor="email">{t('clients_section.email')}</label>
          <input
            {...register("email", {
              required: t('Información requerida'),
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: t("Ingresa un correo válido"),
              },
             
            })}
          />
          {errors.email && (
            <span className="error">{errors.email.message}</span>
          )}
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
            <span className="error">{t('Información requerida')}</span>
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

export default CreateEmployee;
