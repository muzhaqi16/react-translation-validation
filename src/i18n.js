import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them)
const resources = {
  en: {
    translation: {
      "Welcome to React": "Welcome to React and react-i18next",
      "password-requirements":"The password must have a minimum of eight characters, at least one letter, one number and one special character",
      "email-label":"Email address",
      "password-label":"Password",
      "submit":"Submit"
    }
  },
  al: {
    translation: {
      "Welcome to React": "Miresevini ne React dhe react-i18next",
      "password-requirements":"Fjalekalimi duhet te kete nje minimum prej tete karakteresh,te pakten nje shkronje, nje numer dhe nje karakter special",
      "email-label":"Adresa e Emailit",
      "password-label":"Fjalekalimi",
      "submit":"Dergo"
    }
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en",

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;