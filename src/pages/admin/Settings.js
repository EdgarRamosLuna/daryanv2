
import React, { useContext, useEffect, useState } from "react";
import i18n from 'i18next';
import { SettingsStyle } from "../../styles/Styles";
import { MainContext } from "../../context/MainContext";
import { LanguageContext } from "../../context/LanguageContext";
import { useTranslation } from 'react-i18next';
import { Box, Button, Grid, MenuItem, Select } from "@mui/material";

const Settings = () => {
  const { btnCloseRef, toast } = useContext(MainContext);
  const { lang: globalLang, changeLanguage } = useContext(LanguageContext);
  const { t } = useTranslation();

  // Local state for the selected language in the component
  const [selectedLang, setSelectedLang] = useState(globalLang);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Change the language and wait for it to complete
    await i18n.changeLanguage(selectedLang);
    
    btnCloseRef.current && btnCloseRef.current.click();
    
};

  return (
    <SettingsStyle>
      <div className="my-account-cont">
        <div className="my-acc-title">
          <h2>{t('settings')}</h2>
        </div>
        <div className="my-acc-input">
          <Grid py={'10px'}>
            <label>{t('language')}</label>

          </Grid>
          <Box>
            <Select
              value={globalLang}
              onChange={(e) => changeLanguage(e.target.value)}  // Updating the local state              
              sx={{ width: "100%" }}
            >
              <MenuItem value="es">{t('spanish')}</MenuItem>
              <MenuItem value="en">{t('english')}</MenuItem>
            </Select>
          </Box>        
        </div>
        {/* <Grid className="my-acc-input" sx={{ mt:'12px' }}>
          <Button variant="outlined" type="submit" children={t('save')} onClick={handleSubmit} />
        </Grid> */}
      </div>
    </SettingsStyle>
  );
};

export default Settings;
