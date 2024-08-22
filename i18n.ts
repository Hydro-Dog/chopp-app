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
        maxLength: "maxLength {{length}}",
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
        // "maxLength_one": "item",
        // "maxLength_other": "items",
        maxLength_one: "Длина не должна превышать Длина не должна превышать {{count}} символ",
        maxLength_two: "Длина не должна превышать Длина не должна превышать {{count}} символа",
        maxLength_few: "Длина не должна превышать Длина не должна превышать {{count}} символа",
        maxLength_other: "Длина не должна превышать Длина не должна превышать {{count}} символов",
        maxLength_many: "Длина не должна превышать Длина не должна превышать {{count}} символов",
      },
    },
  },
};

export const initI18n = () =>
  i18n
    //   .use(languageDetector) // Detects language from device settings
    .use(initReactI18next) // Passes i18n down to react-i18next
    .init({
      resources,
      fallbackLng: "ru",
      lng: "ru",
      debug: true,
      interpolation: {
        escapeValue: false, // React is safe from XSS
      },
    });
