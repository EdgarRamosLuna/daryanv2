import React from "react";
import { CreateForm } from "../../../styles/Styles";

const CreateEmployee = () => {
  return (
    <CreateForm>
      <p>Crear Empleado</p>
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
        <button type="submit">Guardar</button>
      </form>
      {/*  <button type="submit">Create Account</button>

        <p>
          Already have an account? <a href="#">Sign in</a>
  </p>*/}
    </CreateForm>
  );
};

export default CreateEmployee;
