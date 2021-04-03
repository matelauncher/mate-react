import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { loadLocaleMessages } from "./utils";

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: loadLocaleMessages(),
    lng: "ru-RU",
    fallbackLng: "en-US",
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;