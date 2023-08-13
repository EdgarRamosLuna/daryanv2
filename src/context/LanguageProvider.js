import React, { useState, useEffect } from 'react';
import i18n from './i18n'; // tu configuración de i18next
import { LanguageContext } from './LanguageContext';
import { toast } from 'sonner';
import { t } from 'i18next';

export const LanguageProvider = ({ children }) => {
  // Inicializa el estado con el valor del localStorage o 'es' si no hay ningún valor guardado.

  
  const [lang, setLang] = useState(localStorage.getItem('lang') || 'es');

  useEffect(() => {
    // Cambia el idioma de i18next cuando el estado lang cambie.
    i18n.changeLanguage(lang);

    toast.success(t('languageUpdated'));
    
  }, [lang]);

  const changeLanguage = (language) => {
    setLang(language);
    localStorage.setItem('lang', language); // Guarda el idioma en el localStorage.
  };

  return (
    <LanguageContext.Provider value={{ lang, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
