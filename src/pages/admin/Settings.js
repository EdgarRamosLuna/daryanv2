import React from "react";
import { SettingsStyle } from "../../styles/Styles";
import { useContext } from "react";
import { MainContext } from "../../context/MainContext";
import { useState } from "react";
import { set } from "react-hook-form";

const Settings = () => {
  const { langu, setLangu, btnCloseRef, toast } = useContext(MainContext);
  const [langI, setLangI] = useState(localStorage.getItem("lang"));

  console.log(localStorage.getItem("lang"));
  const handleSubmit = (e) => {
    e.preventDefault();
    setLangu(langI);
    btnCloseRef.current && btnCloseRef.current.click();
    toast.success(`${langI === "es"? "Idioma actualizado" : " Language updated"}`);
    //console.log(langI);
  };
  return (
    <SettingsStyle>
      <div className="my-account-cont">
        <div className="my-acc-title">
          <h2>{langI === "es"? "Configuración" : "Settings"}</h2>
        </div>
        {/* <div className="my-acc-input">
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
        </div> */}
        <div className="my-acc-input">
          <label>{langI === "es" ? "Idioma" : "Language"}</label>
          <select
            value={langI}
            onChange={(e) => {
              setLangI(e.target.value);
            }}
          >
            <option value="es">{langI === "es" ? "Español" : "Spanish"}</option>
            <option value="en">{langI === "en" ? "English" : "Ingles"}</option>
          </select>
        </div>
        <div className="my-acc-input">
          <input type="submit" value={`${langI === "es" ? "Guardar" : "Save"}`} onClick={handleSubmit} />
        </div>
      </div>
    </SettingsStyle>
  );
};

export default Settings;
