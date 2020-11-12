import Vue from "vue";
import Vuex from "vuex";
import { setToken, getToken, removeToken } from "@/plugins/auth";
import { logout, verify } from "@/api/account";

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
    registerFields: [],
    verificationPattern: 0,
    mcPageTitle: "",
    mcHeaderOption: false,
    mcOptionDialog: false,
    mcEditPanel: false
  },
  mutations: {
    SET_ACTIVE_PAGE(state, string) {
      state.activePage = string;
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
    },
    SET_REDIRECT_OBJ(state, payload) {
      state.redirectObj = payload;
    },
    RESET_USERINFO(state, payload) {
      state.userInfo = payload;
    },
    SET_MC_HEADER_OPTION(state, boolean) {
      state.mcHeaderOption = boolean;
    },
    TOGGLE_MC_OPTION(state, boolean) {
      state.mcOptionDialog = boolean;
    },
    TOGGLE_EDIT_PANEL(state, boolean) {
      state.mcEditPanel = boolean;
    }
  },
  actions: {
    changeActivePage({ commit }, string) {
      commit("SET_ACTIVE_PAGE", string);
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
    },
    checkLoginStatus({ commit }) {
      const token = getToken();
      verify({
        token: token
      }).then(res => {
        commit("SET_USERINFO_UID", res["userId"]);
      });

      commit("SET_USERINFO_TOKEN", token);
    },
    doLogout({ commit }) {
      const token = getToken();

      logout({
        token: token,
        tenantCode: 1
      }).then(() => {
        commit("RESET_USERINFO", {
          token: "",
          name: "",
          balance: "",
          vip: "",
          uid: ""
        });

        removeToken();
      });
    },
    doToggleMcHeaderOption({ commit }, boolean) {
      commit("SET_MC_HEADER_OPTION", boolean);
    },
    doToggleMcOption({ commit }, boolean) {
      commit("TOGGLE_MC_OPTION", boolean);
    },
    doToggleEditPanel({ commit }, boolean) {
      commit("TOGGLE_EDIT_PANEL", boolean);
    }
  },
  getters: {
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
    },
    getMcHeaderOption(state) {
      return state.mcHeaderOption;
    },
    getMcOptionDialog(state) {
      return state.mcOptionDialog;
    },
    getMcEditPanel(state) {
      return state.mcEditPanel;
    }
  }
});
