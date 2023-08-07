import React from "react";
import { SettingsStyle } from "../../styles/Styles";
import { useContext } from "react";
import { MainContext } from "../../context/MainContext";
import { useState } from "react";
import { set } from "react-hook-form";
import { Box, Button, Grid, MenuItem, Select } from "@mui/material";

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

        <Box>
                    <Select
                      value={langI}
                      onChange={(e) => {
                        setLangI(e.target.value);
                      }}
                      defaultValue={0}
                      sx={{
                        width: "100%",
                      }}
                    >
                      <MenuItem value="0">{langI === "es" ? "Idioma" : "Language"}</MenuItem>
                      <MenuItem value="es">
                      {langI === "es" ? "Español" : "Spanish"}
                        </MenuItem>
                      <MenuItem value="es">
                      {langI === "en" ? "English" : "Ingles"}
                        </MenuItem>
                    </Select>
                  </Box>        
        </div>
        <Grid className="my-acc-input" sx={{
          mt:'12px'
        }}>
          <Button variant="outlined" type="submit" children={`${langI === "es" ? "Guardar" : "Save"}`} onClick={handleSubmit} />
        </Grid>
      </div>
    </SettingsStyle>
  );
};

export default Settings;
