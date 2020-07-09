import Vue from "vue";
import Vuex from "vuex";

import cocktails from "./modules/cocktails";
import moment from "moment";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    windowWidth: 0,
    today: moment().format("LL")
  },

  getters: {
    windowWidth: state => state.windowWidth,
    today: state => state.today
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
