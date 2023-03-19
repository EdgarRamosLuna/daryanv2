import React from "react";
import { SettingsStyle } from "../../styles/Styles";

const Settings = () => {
  return (
    <SettingsStyle>
      <div className="my-account-cont">
        <div className="my-acc-title">
          <h1>Editar informacion de la cuenta</h1>
        </div>
        <div className="my-acc-input">
          <label>Nombre de usuario</label>
          <input type="text" />
        </div>
        <div className="my-acc-input">
          <label>Correo</label>
          <input type="text" />
        </div>
        <div className="my-acc-input">
          <label>Contraseña</label>
          <input type="text" />
        </div>
        <div className="my-acc-input">
          <input type="submit" value="Guardar" />
        </div>
      </div>
    </SettingsStyle>
  );
};

export default Settings;
