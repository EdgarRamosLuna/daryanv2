import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Importa tus archivos de traducción
import enTranslation from '../locales/en/translation.json';
import esTranslation from '../locales/es/translation.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslation
      },
      es: {
        translation: esTranslation
      }
    },
    lng: 'es', // idioma por defecto
    fallbackLng: 'es', // idioma a utilizar si faltan traducciones en el idioma actual
    interpolation: {
      escapeValue: false // React ya escapa valores por defecto
    }
  });

export default i18n;
