import { createI18n } from "vue-i18n";
import { Languages } from "../models/base.model";
import en_US from "./en_US";
import zh_CN from "./zh_CN";

export interface LocaleFile {
  [propName: string]: string | LocaleFile;
}

const initLanguage = (
  localStorage.getItem("language") || navigator.language
).includes("zh")
  ? Languages.zh
  : Languages.en;

const i18n = createI18n({
  locale: initLanguage,
  legacy: false,
  fallbackLocale: Languages.en,
  messages: { en_US, zh_CN },
  silentTranslationWarn: true,
  silentFallbackWarn: true,
});

export default i18n;
