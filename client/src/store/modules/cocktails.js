import { cocktailsAPIs } from "../../utils/apis.js";

const data = {
  namespaced: true,

  state: {
    drinks: [],
    popularDrinks: [],
    searchRules: {
      ingredients: null
    }
  },

  getters: {
    drinks: state => state.drinks,
    popularDrinks: state => state.popularDrinks,
    searchRules: state => state.searchRules
  },

  mutations: {
    setDrinks(state, data) {
      state.drinks = data;
    },
    setPopularDrinks(state, data) {
      state.popularDrinks = data;
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
    },

    async getPopularCocktails({ commit }) {
      try {
        let {
          data: { drinks: drinksRawData }
        } = await cocktailsAPIs.getPopularCocktails();

        const resultLimit = 10;

        let formattedDrinks = drinksRawData.map(item => {
          let result = {};
          let ingredientCount = 1;
          let stopGenerateIngredientItems = false;

          result.id = Number(item.idDrink);
          result.name = item.strDrink;
          result.category = item.strCategory;
          result.alcoholic = item.strAlcoholic;
          result.modifiedDate = item.dateModified;
          result.thumbImg = item.strDrinkThumb;
          result.glass = item.strGlass;
          result.instructions = item.strInstructions;

          result.ingredients = [];
          while (!stopGenerateIngredientItems) {
            let set = {};
            if (
              item[`strIngredient${ingredientCount}`] &&
              item[`strMeasure${ingredientCount}`]
            ) {
              set.name = item[`strIngredient${ingredientCount}`].trim();
              set.measure = item[`strMeasure${ingredientCount}`].trim();
              result.ingredients.push(set);
              ingredientCount += 1;
            } else {
              stopGenerateIngredientItems = true;
            }
          }

          if (item.strTags) {
            result.tags = item.strTags.split(",");
          } else {
            result.tags = [];
          }

          return result;
        });

        let result = formattedDrinks.slice(0, resultLimit);

        commit("setPopularDrinks", result);
      } catch (err) {
        console.log(err);
      }
    }
  }
};

export default data;
