import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enJson from "./locale/en.json";
import esJson from "./locale/es.json";

i18n.use(initReactI18next).init({
  resources: {
    es: { ...esJson },
    en: { ...enJson },
  }, // Where we're gonna put translations' files
  lng: "es", // Set the initial language of the App
});
