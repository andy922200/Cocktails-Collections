import { cocktailsAPIs } from "../../utils/apis.js";

const data = {
  namespaced: true,

  state: {
    drinks: [],
    searchRules: {
      ingredients: null
    }
  },

  getters: {
    drinks: state => state.drinks,
    searchRules: state => state.searchRules
  },

  mutations: {
    setDrinks(state, data) {
      state.drinks = data;
    },
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
    async getCocktails({ commit, getters }) {
      try {
        let { searchRules } = getters;
        let ingredients = searchRules.ingredients;

        let {
          data: { drinks }
        } = await cocktailsAPIs.getCocktails({
          params: { s: ingredients }
        });

        commit("setDrinks", drinks);
      } catch (err) {
        console.log(err);
      }
    },

    async getARandomCocktail({ commit }) {
      try {
        let {
          data: { drinks: randomDrink }
        } = await cocktailsAPIs.getARandomCocktail();

        commit("setDrinks", randomDrink);
      } catch (err) {
        console.log(err);
      }
    }
  }
};

export default data;
