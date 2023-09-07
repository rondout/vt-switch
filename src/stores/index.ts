import { computed, reactive, toRefs } from "vue";
import { defineStore } from "pinia";
import { Languages } from "@/models/base.model";
import i18n from "@/i18n";
import { CurrentUserInfo, UserRole } from "@/models/user.model";

export const useMainStore = defineStore("main", () => {
  const state = reactive({
    language: i18n.global.locale.value as Languages,
    userInfo: {} as CurrentUserInfo,
    getUserInfoFinish: false,
  });

  const changeLanguage = (lang?: Languages) => {
    if (!lang) {
      lang = state.language === Languages.en ? Languages.zh : Languages.en;
    }
    state.language = lang;
    window.localStorage.setItem("language", lang);
    i18n.global.locale.value = lang;
  };

  const setUserInfo = (userInfo: CurrentUserInfo) => {
    state.userInfo = userInfo;
  };

  const isAdmin = computed(() => {
    return state.userInfo?.roles === UserRole.ADMINISTRATOR;
  });

  return { ...toRefs(state), changeLanguage, setUserInfo, isAdmin };
});
