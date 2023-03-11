import React, { useContext, useState } from "react";
import { MainContext } from "../../../context/MainContext";
import { CreateForm } from "../../../styles/Styles";

const UpdateEmployee = ({id}) => {
  const {data} = useContext(MainContext);
  const [updateData, setUpdateData] = useState(data.filter(item => item.id === id));

  return (
    <CreateForm>
      <p>Actualizar Informacion</p>
      <form autoComplete="off">
        <div className="item-from-container">
          <label for="name">Nombre</label>
          <input type="text" id="name" required />
        </div>
        <div className="item-from-container">
          <label for="name">Usuario</label>
          <input type="text" id="name" required />
        </div>
        <div className="item-from-container">
          <label for="email">Correo</label>
          <input type="email" id="email" required />
        </div>
        <div className="item-from-container">
          <label for="password">Contraseña</label>
          <input type="password" id="password" required />
        </div>
        <button type="submit">Guardar cambios</button>
      </form>
      {/*  <button type="submit">Create Account</button>

        <p>
          Already have an account? <a href="#">Sign in</a>
  </p>*/}
    </CreateForm>
  );
};

export default UpdateEmployee;
