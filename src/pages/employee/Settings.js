import React from "react";
import { SettingsStyle } from "../../styles/Styles";
import { useContext } from "react";
import { MainContext } from "../../context/MainContext";
import { useState } from "react";
import { set } from "react-hook-form";

const Settings = () => {
  const { langu, setLangu } = useContext(MainContext);
  const [langI, setLangI] = useState(localStorage.getItem("lang"));
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setLangu(langI);
    console.log(langI);
  };
  return (
    <SettingsStyle>
      <div className="my-account-cont">
        <div className="my-acc-title">
          <h3>Editar informacion de la cuenta</h3>
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
          <label>Idioma</label>
          <select
            value={langI}
            onChange={(e) => {
              setLangI(e.target.value);
              setLangu(e.target.value);
            }}
          >
            <option value="es">{langI === "es" ? "Español" : "Spanish"}</option>
            <option value="en">{langI === "en" ? "English" : "Ingles"}</option>
          </select>
        </div>
        <div className="my-acc-input">
          <input type="submit" value="Guardar" onClick={handleSubmit} />
        </div>
      </div>
    </SettingsStyle>
  );
};

export default Settings;
