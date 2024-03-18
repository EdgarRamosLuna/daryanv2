import React, { useContext, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { createUser } from "../../../api/daryan.api";
import { MainContext } from "../../../context/MainContext";
import Autocomplete from "@mui/material/Autocomplete";
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import ComboBoxMUI from "../../../components/inputs/ComboBoxMUI";
import ModalMui from "../../../components/modal/ModalMui";

const Create = () => {
  const { t } = useTranslation();
  const { btnCloseRef, toast, setDataUsers, suppliersByClient } =
    useContext(MainContext);
  const [saving, setSaving] = useState(false);
  const [accountType, setAccountType] = useState(0);

  const suppliersSelect = suppliersByClient.map((obj) => {
    return { id: obj.id, fullname: obj.fullname };
  });
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm();

  useEffect(() => {
    if (Number(accountType) === 3) {
      setOpenModal(true);
    } else {
      setOpenModal(false);
    }
  }, [accountType]);

  const options = [
    { label: "Admin", value: 1 },
    { label: t("Solo lectura"), value: 2 },
    { label: t("reports.plant"), value: 3 },
  ];
  const title = t("Tipo de cuenta");
  const [openModal, setOpenModal] = useState(false);

  const onSubmit = async (data) => {
    console.log(data);
    setSaving(true);
    try {
      const res = await createUser(data);
      const datares = res.data;
      if (datares.error) {
        toast.error(datares.message, { duration: 5000 });
      } else {
        toast.success(datares.message, { duration: 4000 });
        const { email, name, accountType, suppliers = [] } = data;
        const { last_id } = datares;
        setDataUsers((prev) => [
          {
            id: `${last_id}`,
            fullname: name,
            email,
            status: "1",
            accountType,
            suppliers,
          },
          ...prev,
        ]);
        btnCloseRef.current.click();
      }
    } catch (err) {
      toast.error(err, { duration: 5000 });
    }
    setSaving(false);
    reset(); // Reset form after submission
  };

  return (
    <>
      <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <h2>{t("Crear Usuario")}</h2>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label={t("suppliers_section.name")}
              {...register("name", { required: true })}
              error={!!errors.name}
              helperText={errors.name && t("Información requerida")}
              variant="filled"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label={t("clients_section.email")}
              {...register("email", {
                required: t("Información requerida"),
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: t("Ingresa un correo válido"),
                },
              })}
              error={!!errors.email}
              helperText={errors.email && errors.email.message}
              variant="filled"
              autoComplete="off"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="password"
              label={t("clients_section.password")}
              {...register("password", { required: true })}
              error={!!errors.password}
              helperText={errors.password && t("Información requerida")}
              variant="filled"
            />
          </Grid>

          <Grid item xs={12}>
            <>
              <FormGroup>
                <FormLabel id="demo-radio-buttons-group-label">
                  {title}
                </FormLabel>
                <Controller
                  name="accountType"
                  control={control}
                  rules={{ required: t("Información requerida") }} // Regla de validación requerida
                  render={({ field }) => (
                    <RadioGroup
                      row
                      aria-labelledby="demo-radio-buttons-group-label"
                      {...field} // Esto pasa onChange y value al RadioGroup
                      onChange={(e) => {
                        field.onChange(e);
                        setAccountType(e.target.value);
                      }}
                    >
                      {options.map((d) => (
                        <FormControlLabel
                          key={d.value}
                          value={d.value}
                          control={<Radio />}
                          label={d.label}
                        />
                      ))}
                    </RadioGroup>
                  )}
                />
                {errors.accountType && (
                  <FormHelperText error>
                    {errors.accountType.message}
                  </FormHelperText>
                )}
              </FormGroup>
              {openModal ? (
                <Grid>
                  <Controller
                    control={control}
                    name="suppliers"
                    rules={{ required: t("Información requerida") }} // Agregar regla de validación requerida
                    render={({ field }) => (
                      <Autocomplete
                        {...field}
                        multiple
                        id="tags-outlined"
                        options={suppliersSelect}
                        getOptionLabel={(option) => option.fullname}
                        defaultValue={[]}
                        filterSelectedOptions
                        onChange={(event, newValue) => {
                          field.onChange(newValue); // Actualizar el valor del campo controlado
                        }}
                        sx={{ width: "98%", padding: 0, margin: "10px 0" }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label={t("reports.suppliers")}
                            variant="outlined"
                            error={!!errors.suppliers} // Aplicar estilo de error si hay un error
                            helperText={
                              errors.suppliers && errors.suppliers.message
                            } // Mostrar mensaje de error
                          />
                        )}
                      />
                    )}
                  />
                  {/* {errors.suppliers && (
                    <FormHelperText error>
                      {errors.suppliers.message}
                    </FormHelperText>
                  )} */}
                </Grid>
              ) : (
                ""
              )}
            </>
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              disabled={saving}
              fullWidth
            >
              {saving ? (
                <img
                  src="/assets/img/loading.svg"
                  alt=""
                  style={{ width: "30px", height: "30px" }}
                />
              ) : (
                t("clients_section.save")
              )}
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default Create;
