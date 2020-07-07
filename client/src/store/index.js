import Vue from "vue";
import Vuex from "vuex";

import cocktails from "./modules/cocktails";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    windowWidth: 0
  },

  getters: {
    windowWidth: state => state.windowWidth
  },

  mutations: {
    setWindowWidth(state, value) {
      state.windowWidth = value;
    }
  },

  modules: {
    cocktails
  }
});
