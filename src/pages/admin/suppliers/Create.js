import React from "react";
import { CreateForm } from "../../../styles/Styles";

const CreateSupplier = () => {
  return (
    <CreateForm>
      <p>Crear Proveedor</p>
      <form autoComplete="off">
        <div className="item-from-container">
          <label htmlFor="name">Proveedor</label>
          <input type="text" id="name" required />
        </div>
        <div className="item-from-container">
          <label htmlFor="name">Usuario</label>
          <input type="text" id="name" required />
        </div>
        <div className="item-from-container">
          <label htmlFor="email">Correo</label>
          <input type="email" id="email" required />
        </div>
        <div className="item-from-container">
          <label htmlFor="password">Contraseña</label>
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

export default CreateSupplier;
