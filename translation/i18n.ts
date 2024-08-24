import { initReactI18next } from "react-i18next";
import i18n from "i18next";
import { en } from "./en";
import { ru } from "./ru";
// import languageDetector from 'i18next-react-native-language-detector';

const resources = {
  en: {
    translation: en,
  },
  ru: {
    translation: ru,
  },
};

export const initI18n = () =>
  i18n
      // .use(languageDetector) // Detects language from device settings
    .use(initReactI18next) // Passes i18n down to react-i18next
    .init({
      compatibilityJSON: 'v3',
      resources,
      fallbackLng: "ru",
      lng: "ru",
      debug: true,
      interpolation: {
        escapeValue: false, // React is safe from XSS
      },
    });
