import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useContext } from "react";
import { MainContext } from "../../context/MainContext";

function CustomTabPanel({ value, index, children }) {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
/**
 * Un componente para mostrar varias pestañas, cada una con su propio contenido.
 * Cada pestaña se activa haciendo clic en ella y tiene tres secciones: parte superior, media e inferior.
 * El componente utiliza la biblioteca de Material-UI para los componentes de la interfaz de usuario.
 * 21/07/2023 11pm
 * @param {Object} props - Las propiedades del componente.
 * @param {Object} props.tabContent - Un objeto que mapea las claves a los objetos de contenido de la pestaña. 
 *                                    Cada objeto de contenido de la pestaña debe tener las propiedades `componenteTitle`, 
 *                                    `componenteTop`, `componenteMiddle` y `componenteBottom`.
 *                                    - `componenteTitle` es la etiqueta de la pestaña.
 *                                    - `componenteTop`, `componenteMiddle` y `componenteBottom` son los componentes JSX que 
 *                                      se renderizarán en la parte superior, media e inferior de la pestaña, respectivamente.
 *
 * @returns {JSX.Element} Un contenedor de pestañas.
 */
export default function TabContainer({ tabContent }) {
  const [value, setValue] = React.useState(0);
  const { setActiveTab } = useContext(MainContext);

  const handleChange = (event, newValue) => {
    setActiveTab(newValue + 1);
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          {Object.keys(tabContent).map((key, index) => (
            <Tab
              label={tabContent[key].componenteTitle}
              {...a11yProps(index)}
              key={key}
            />
          ))}
        </Tabs>
      </Box>
      {Object.entries(tabContent).map(([key, val], index) => (
        <CustomTabPanel value={value} index={index} key={index+1}>
          {val.componenteTop}
          {val.componenteMiddle}
          {val.componenteBottom}
        </CustomTabPanel>
      ))}
    </Box>
  );
}