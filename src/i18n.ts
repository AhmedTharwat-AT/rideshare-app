import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import translate_ar from "./locales/ar/translation.json";
import translate_en from "./locales/en/translation.json";

i18next.use(initReactI18next).init({
  fallbackLng: "en",
  lng: "en",
  resources: {
    ar: { translation: translate_ar },
    en: { translation: translate_en },
  },

  interpolation: {
    escapeValue: false,
  },
});
