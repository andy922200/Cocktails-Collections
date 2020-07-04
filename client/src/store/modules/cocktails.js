// import { baseOnlineDbURL } from './../../utils/helpers.js'

const data = {
  namespaced: true,

  state: {
    searchRules: {
      ingredients: null
    }
  },

  getters: {
    searchRules: state => state.searchRules
  },

  mutations: {
    setSearchRules(state, data) {
      if (data.length === 0) {
        state.searchRules = {};
      } else {
        data.forEach(d => {
          state.searchRules[d.name] = d.value;
        });
      }

      return state.searchRules;
    }
  },

  actions: {
    async getCocktails() {
      try {
        console.log("start");
      } catch (err) {
        console.log(err);
      }
    }
  }
};

export default data;
