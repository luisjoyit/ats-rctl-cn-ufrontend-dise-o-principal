import { useState } from "react";
import { useTranslation } from "react-i18next";

export const useLanguage = () => {
  const {
    i18n: { changeLanguage, language },
  } = useTranslation();

  const [currentLanguage, setCurrentLanguage] = useState(language);

  const handleChangeLanguage = () => {
    const newLanguage = currentLanguage === "en" ? "es" : "en";
    //setear en el local storage
    localStorage.setItem("language", newLanguage);
    // hacer un reload de la pagina
    setCurrentLanguage(newLanguage);
    changeLanguage(newLanguage);
  };

  return {
    currentLanguage,
    handleChangeLanguage,
    language,
  };
};
