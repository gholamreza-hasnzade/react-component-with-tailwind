import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enTranslation from "@/configurations/i18next/locales/en/en.json";
import faTranslation from "@/configurations/i18next/locales/fa/fa.json";

i18n
  .use(initReactI18next) 
  .init({
    resources: {
      en: {
        translation: enTranslation,
      },
      fa: {
        translation: faTranslation, 
      },
    },
    lng: "fa", 
    fallbackLng: "fa", 
    interpolation: {
      escapeValue: false, 
    },
    debug: false, 
  });

export default i18n;
