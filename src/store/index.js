import Vue from "vue";
import Vuex from "vuex";
import { setToken } from "@/plugins/auth";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    activePage: "home",
    userInfo: {
      token: "",
      name: "",
      balance: "",
      vip: "",
      uid: ""
    },
    loginDialog: false,
    signupDialog: false,
    registerFields: [],
    verificationPattern: 0,
    mcPageTitle: ""
  },
  mutations: {
    SET_ACTIVE_PAGE(state, string) {
      state.activePage = string;
    },
    SET_LOGIN_DIALOG(state, boolean) {
      state.loginDialog = boolean;
    },
    SET_SIGNUP_DIALOG(state, boolean) {
      state.signupDialog = boolean;
    },
    SET_SITE_REGISTER_FIELDS(state, payload) {
      state.registerFields = payload;
    },
    SET_VERIFICATION_PATTERN(state, num) {
      state.verificationPattern = num;
    },
    SET_USERINFO_TOKEN(state, string) {
      state.userInfo.token = string;
    },
    SET_USERINFO_UID(state, token) {
      state.userInfo.uid = token;
    },
    SET_MC_PAGE_TITLE(state, title) {
      state.mcPageTitle = title;
    }
  },
  actions: {
    changeActivePage({ commit }, string) {
      commit("SET_ACTIVE_PAGE", string);
    },
    openLoginDialog({ commit }) {
      commit("SET_LOGIN_DIALOG", true);
      commit("SET_SIGNUP_DIALOG", false);
    },
    openSignupDialog({ commit }) {
      commit("SET_LOGIN_DIALOG", false);
      commit("SET_SIGNUP_DIALOG", true);
    },
    closeDialog({ commit }) {
      commit("SET_LOGIN_DIALOG", false);
      commit("SET_SIGNUP_DIALOG", false);
    },
    setSiteRegisterFields({ commit }, payload) {
      commit("SET_SITE_REGISTER_FIELDS", payload);
    },
    setVerificationPattern({ commit }, num) {
      commit("SET_VERIFICATION_PATTERN", num);
    },
    setUserToken({ commit }, token) {
      commit("SET_USERINFO_TOKEN", token);
      setToken(token);
    },
    setUserUid({ commit }, uid) {
      commit("SET_USERINFO_UID", uid);
    },
    setMcPageTitle({ commit }, title) {
      commit("SET_MC_PAGE_TITLE", title);
    }
  },
  getters: {
    getLoginDialog(state) {
      return state.loginDialog;
    },
    getSignupDialog(state) {
      return state.signupDialog;
    },
    getRegisterFields(state) {
      return state.registerFields;
    },
    getVerificationPattern(state) {
      return state.verificationPattern;
    },
    getToken(state) {
      return state.userInfo.token;
    },
    getIsLogin(state) {
      return state.userInfo.token !== "" && state.userInfo.token !== undefined;
    },
    getActivePage(state) {
      return state.activePage;
    },
    getMcPageTitle(state) {
      return state.mcPageTitle;
    },
    getUserInfo(state) {
      return state.userInfo;
    }
  }
});
