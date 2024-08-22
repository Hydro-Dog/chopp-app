import { initReactI18next } from "react-i18next";
import i18n from "i18next";
// import languageDetector from 'i18next-react-native-language-detector';

const resources = {
  en: {
    translation: {
      jopa1: "Jopa",
      welcome: "Welcome to React Native",
      description: "This is a simple localization example.",
      errors: {
        emptyText: "emptyText",
        maxLength: "Max length: {{count}}",
      },
    },
  },
  ru: {
    translation: {
      jopa1: "Жопа",
      welcome: "Добро пожаловать в React Native",
      description: "Это простой пример локализации.",
      errors: {
        emptyText: "Введите текст",
        maxLength: "Превышен лимит символов: {{count}}",
      },
    },
  },
};

export const initI18n = () =>
  i18n
    //   .use(languageDetector) // Detects language from device settings
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
