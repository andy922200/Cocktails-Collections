import Vue from "vue";
import Vuex from "vuex";

import cocktails from "./modules/cocktails";
import moment from "moment";

import { usersAPI } from "../utils/apis";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    windowWidth: 0,
    today: moment().format("LL"),
    isValidatingUser: false,
    isAuthenticated: false,
    currentUser: {
      id: -1,
      name: "",
      email: "",
      role: -1,
      isSponsor: false
    },
    token: ""
  },

  getters: {
    windowWidth: state => state.windowWidth,
    today: state => state.today,
    isValidatingUser: state => state.isValidatingUser,
    isAuthenticated: state => state.isAuthenticated,
    currentUser: state => state.currentUser,
    token: state => state.token
  },

  mutations: {
    setWindowWidth(state, value) {
      state.windowWidth = value;
    },
    setIsValidatingUser(state, status) {
      state.isValidatingUser = status;
    },
    setCurrentUser(state, currentUser) {
      state.currentUser = {
        ...state.currentUser,
        ...currentUser
      };
      state.token = localStorage.getItem("token");
      state.isAuthenticated = true;
    },
    revokeAuthentication(state) {
      state.currentUser = {
        id: -1,
        name: "",
        email: "",
        role: -1,
        isSponsor: false
      };
      state.isAuthenticated = false;
      state.token = "";
      localStorage.removeItem("token");
    }
  },

  actions: {
    async signIn({ commit }, logInForm) {
      try {
        commit("setIsValidatingUser", true);

        let { statusText, data } = await usersAPI.signIn(logInForm);

        if (statusText !== "OK" || data.status !== "success") {
          throw new Error();
        }

        localStorage.setItem("token", data.token);
        commit("setCurrentUser", data.user);

        commit("setIsValidatingUser", false);
        return true;
      } catch (err) {
        console.log(err);
        commit("setIsValidatingUser", false);
        return false;
      }
    },
    async fetchCurrentUser({ commit }) {
      try {
        const { data, statusText } = await usersAPI.getCurrentUser();

        if (statusText !== "OK") {
          throw new Error(statusText);
        }

        // change the state by commit and the response
        localStorage.setItem("token", data.token);
        commit("setCurrentUser", data.user);

        return true;
      } catch (err) {
        console.log(err);
        commit("revokeAuthentication");
        return false;
      }
    }
  },

  modules: {
    cocktails
  }
});
