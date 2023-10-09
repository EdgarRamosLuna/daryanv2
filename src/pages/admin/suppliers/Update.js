import React, { useContext, useEffect } from "react";
import { CreateForm } from "../../../styles/Styles";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { updateSupplier } from "../../../api/daryan.api";
import { MainContext } from "../../../context/MainContext";
import { useTranslation } from "react-i18next";
const UpdateSupplier = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const { btnCloseRef, toast, dataSuppliers, setDataSuppliers, updateId } =
    useContext(MainContext);
  const [saving, setSaving] = useState(false);
  const { t } = useTranslation();
  useEffect(() => {
    if (updateId !== 0) {
      dataSuppliers.map((item) => {
        if (item.id === updateId) {
          const { fullname, phone, address } = item;
          setValue("name", fullname);
          setValue("phone", phone);
          setValue("address", address);
        }
      });
    }
  }, []);
  const onSubmit = handleSubmit(async (data) => {
    setSaving(true);
    data.id = updateId;
    await updateSupplier(data)
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
          const { phone, name, address } = data;
          setDataSuppliers((prev) => {
            const newClients = prev.map((client) => {
              if (client.id === updateId) {
                return {
                  id: `${updateId}`,
                  fullname: name,
                  phone,
                  address,
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
        toast.error(err, {
          duration: 5000,
        });
      });

    setSaving(false);
  });

  return (
    <CreateForm>
      <p>{t("suppliers_section.updateProviderInfo")}</p>
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
          <label htmlFor="address">{t("suppliers_section.address")}</label>
          <input
            type="text"
            id="address"
            name="address"
            {...register("address", { required: true })}
          />
          {errors.address && (
            <span className="error">{errors.address.message}</span>
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
            <span className="error">{errors.phone.message}</span>
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

export default UpdateSupplier;
