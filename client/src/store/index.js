import Vue from "vue";
import Vuex from "vuex";

import cocktails from "./modules/cocktails";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    cocktails
  }
});
