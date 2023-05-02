import React, { useContext, useEffect } from "react";
import { CreateForm } from "../../../styles/Styles";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { createUser, getUserById } from "../../../api/daryan.api";
import { useNavigate, useParams } from "react-router-dom";
import { MainContext } from "../../../context/MainContext";
const CreateUser = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const {btnCloseRef, toast} = useContext(MainContext)
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  useEffect(() => {
    async function loadTask() {
      if (params.id) {
        const res = await createUser(params.id);
        const { title, description } = res.data;
        setValue("title", title);
        setValue("description", description);
      }
    }
    loadTask();
  }, []);
  const onSubmmit = handleSubmit(async (data) => {
    setSaving(true);
    await createUser(data).then((res) => {
      const data = res.data;
      if (data.error) {
        toast.error(data.message, {
          duration: 5000,
        });
      }else{
        toast.success(data.message, {
          duration: 4000,
        }
        );
      }
    })
    .catch((err) => {
      //console.log(err);
      toast.error(err, {
        duration: 5000,
      });
    });
    setSaving(false);
    btnCloseRef.current.click();
  });


  return (
    <CreateForm>
      <p>Crear Usuario</p>
      <form autoComplete="off" onSubmit={onSubmmit}>
        <div className="item-from-container">
          <label htmlFor="name">Nombre Completo</label>
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
        <div className="item-from-container">
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
        </div>
        <div className="item-from-container">
          <label htmlFor="email">Correo</label>
          <input
            type="text"
            id="email"
            name="email"
            {...register("email", { required: true })}
            //required
            // onFocus={(e) => e.target.select()}
            // value={dataToSave.email}
            // onChange={(e) =>
            //   setDataToSave({
            //     ...dataToSave,
            //     [e.target.dataset.name || e.target.name]: e.target.value,
            //   })
            // }
          />
          {errors.email && <span className="error">Informacion requerida</span>}
        </div>
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
            <span className="error">Informacion requeridaa</span>
          )}
          <br />
          <button type="submit">Guardar</button>
        </div>
      </form>
      {/*  <button type="submit">Create Account</button>

        <p>
          Already have an account? <a href="#">Sign in</a>
  </p>*/}
    </CreateForm>
  );
};

export default CreateUser;
