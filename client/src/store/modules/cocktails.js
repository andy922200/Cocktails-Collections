import { cocktailsAPIs } from "../../utils/apis.js";

const data = {
  namespaced: true,

  state: {
    drinks: [],
    popularDrinks: [],
    searchRules: {
      ingredients: null
    },
    fetchingData: false
  },

  getters: {
    drinks: state => state.drinks,
    popularDrinks: state => state.popularDrinks,
    searchRules: state => state.searchRules,
    fetchingData: state => state.fetchingData
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
    },
    setFetchingData(state, status) {
      state.fetchingData = status;
    }
  },

  actions: {
    async getCocktails({ commit, getters, dispatch }) {
      try {
        let { searchRules } = getters;
        let ingredients = searchRules.ingredients;

        commit("setFetchingData", true);
        let {
          data: { drinksRawData }
        } = await cocktailsAPIs.getCocktails({
          params: { s: ingredients }
        });

        await dispatch("formatDrinksData", {
          type: "setDrinks",
          data: drinksRawData
        })

        commit("setFetchingData", false);
      } catch (err) {
        console.log(err);
        commit("setFetchingData", false);
      }
    },

    async getACocktail({ commit, dispatch }, drinkId) {
      try {
        commit("setFetchingData", true);

        let {
          data: { drinks: drinkRawData }
        } = await cocktailsAPIs.getACocktailById({
          params: { i: drinkId }
        });

        await dispatch("formatDrinksData", {
          type:"setDrinks",
          data:drinkRawData
        })

      } catch (err) {
        console.log(err);
        commit("setFetchingData", false);
      }
    },

    async getARandomCocktail({ commit, dispatch }) {
      try {
        commit("setFetchingData", true);

        let {
          data: { drinks: randomDrink }
        } = await cocktailsAPIs.getARandomCocktail();

        await dispatch("formatDrinksData", {
          type: "setDrinks",
          data: randomDrink
        })

        commit("setFetchingData", false);
      } catch (err) {
        console.log(err);
        commit("setFetchingData", false);
      }
    },

    async getPopularCocktails({ commit, dispatch }) {
      try {
        commit("setFetchingData", true);

        let {
          data: { drinks: drinksRawData }
        } = await cocktailsAPIs.getPopularCocktails();

        await dispatch("formatDrinksData", {
          type: "setPopularDrinks",
          data: drinksRawData
        })

        commit("setFetchingData", false);
      } catch (err) {
        console.log(err);
        commit("setFetchingData", false);
      }
    },

    async formatDrinksData({ commit }, dataSet){
      try{
        let type = dataSet.type

        let formattedDrinks = dataSet.data.map(item => {
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

        if (type === "setPopularDrinks"){
          const resultLimit = 10
          formattedDrinks = formattedDrinks.slice(0, resultLimit)
        }

        commit(`${type}`, formattedDrinks);
      }catch(err){
        console.log(err)
      }
    }
  }
};

export default data;
