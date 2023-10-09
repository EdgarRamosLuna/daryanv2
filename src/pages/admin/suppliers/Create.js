import React, { useContext } from "react";
import { CreateForm } from "../../../styles/Styles";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { createSupplier } from "../../../api/daryan.api";
import { MainContext } from "../../../context/MainContext";
import { useTranslation } from "react-i18next";
const CreateSupplier = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { btnCloseRef, toast, setDataSuppliers } = useContext(MainContext);
  const [saving, setSaving] = useState(false);
  const { t } = useTranslation();
  const onSubmit = handleSubmit(async (data) => {
    setSaving(true);
    await createSupplier(data)
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
          const { name, address, phone } = data;
          const { last_id } = datares;
          setDataSuppliers((prev) => [
            {
              id: `${last_id}`,
              fullname: name,
              address,
              phone,
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
      <p>{t("suppliers_section.createProvider")}</p>
      <form autoComplete="off" onSubmit={onSubmit}>
        <div className="item-form-container">
          <label htmlFor="name">{t("suppliers_section.name")}</label>
          <input
            type="text"
            id="name"
            name="name"
            {...register("name", { required: true })}
          />
          {errors.name && (
            <span className="error">{t("suppliers_section.requiredInfo")}</span>
          )}
        </div>
        <div className="item-form-container">
          <label htmlFor="phone">{t("suppliers_section.phone")}</label>
          <input
            type="text"
            id="phone"
            name="phone"
            {...register("phone", { required: true })}
          />
          {errors.phone && (
            <span className="error">{t("suppliers_section.requiredInfo")}</span>
          )}
        </div>
        <div className="item-form-container">
          <label htmlFor="address">{t("suppliers_section.address")}</label>
          <input
            type="text"
            id="address"
            name="address"
            {...register("address", { required: true })}
          />
          {errors.address && (
            <span className="error">{t("suppliers_section.requiredInfo")}</span>
          )}
        </div>
        <div className="item-form-container">
          <br />
          <button type="submit" disabled={saving === true ? true : false}>
            {saving ? (
              <img src="/assets/img/loading.svg" alt="" />
            ) : (
              t("suppliers_section.save")
            )}
          </button>
        </div>
      </form>
    </CreateForm>
  );
};

export default CreateSupplier;
