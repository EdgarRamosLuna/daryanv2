
import { createContext } from 'react';

export const LanguageContext = createContext({
  lang: 'es', // default language
  changeLanguage: () => {} // placeholder function
});
