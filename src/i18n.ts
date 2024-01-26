import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import TRANSLATION_DE from "./i18n/de/translation.json";
import TRANSLATION_EN from "./i18n/en/translation.json";

const resources = {
  de: {
    translation: TRANSLATION_DE,
  },
  en: {
    translation: TRANSLATION_EN,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "de",
    debug: true,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
