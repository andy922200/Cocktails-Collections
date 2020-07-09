import {
  cocktailsAPIs,
  baseOnlineDbImageIngredientsURL
} from "../../utils/apis.js";

const data = {
  namespaced: true,

  state: {
    drinks: [],
    popularDrinks: [],
    searchRules: {
      drinkTypes: [],
      ingredients: [],
      keywords: []
    },
    searchResults: [],
    drinkTypesOptions: [],
    ingredientsOptions: [],
    fetchingData: false,
    fetchingSearchResults: false,
    fetchingOptions: false
  },

  getters: {
    drinks: state => state.drinks,
    popularDrinks: state => state.popularDrinks,
    searchRules: state => state.searchRules,
    searchResults: state => state.searchResults,
    drinkTypesOptions: state => state.drinkTypesOptions,
    ingredientsOptions: state => state.ingredientsOptions,
    fetchingData: state => state.fetchingData,
    fetchingSearchResults: state => state.fetchingSearchResults,
    fetchingOptions: state => state.fetchingOptions
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
        state.searchRules = { drinkTypes: [], ingredients: [], keywords: [] };
      } else {
        data.forEach(d => {
          state.searchRules[d.type].push(d.value);
        });
      }
      return state.searchRules;
    },
    setSearchResults(state, data) {
      state.searchResults = data;
    },
    setDrinkTypesOptions(state, data) {
      state.drinkTypesOptions = data;
    },
    setIngredientsOptions(state, data) {
      state.ingredientsOptions = data;
    },
    setFetchingData(state, status) {
      state.fetchingData = status;
    },
    setFetchingSearchResults(state, status) {
      state.fetchingSearchResults = status;
    },
    setFetchingOptions(state, status) {
      state.fetchingOptions = status;
    }
  },

  actions: {
    async getCocktails({ commit, getters, dispatch }) {
      try {
        let { searchRules } = getters;
        let ingredients = searchRules.ingredients;
        let drinkTypes = searchRules.drinkTypes;
        let rawData = [];
        commit("setFetchingSearchResults", true);

        if (drinkTypes.length > 0) {
          for (let i = 0; i < drinkTypes.length; i++) {
            let params = { c: drinkTypes[i] };

            let {
              data: { drinks: drinksRawData }
            } = await cocktailsAPIs.getFilteredCocktails({
              params
            });

            rawData.push(drinksRawData);
          }
        }

        if (ingredients.length > 0) {
          let paramsInput = null;

          for (let i = 0; i < ingredients.length; i++) {
            paramsInput += "," + ingredients[i];
          }
          paramsInput = paramsInput.slice(5, paramsInput.length);

          let params = { i: paramsInput };

          let {
            data: { drinks: drinksRawData }
          } = await cocktailsAPIs.getFilteredCocktails({
            params
          });

          rawData.push(drinksRawData);
        }

        await dispatch("formatSearchResults", rawData);
        await dispatch("resetSearchRules");

        commit("setFetchingSearchResults", false);
      } catch (err) {
        console.log(err);
        commit("setFetchingSearchResults", false);
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
          type: "setDrinks",
          data: drinkRawData
        });

        commit("setFetchingData", false);
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
        });

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
        });

        commit("setFetchingData", false);
      } catch (err) {
        console.log(err);
        commit("setFetchingData", false);
      }
    },

    async getListOptions({ commit }, types) {
      try {
        commit("setFetchingOptions", true);

        for (let i = 0; i < types.length; i++) {
          let {
            data: { drinks: rawData }
          } = await cocktailsAPIs.getListOptions({
            params: types[i]["params"]
          });
          let formattedData = [];

          if (rawData.length > 0) {
            formattedData = rawData.map(d => {
              let set = {};

              switch (types[i]["type"]) {
                case "drinkTypes":
                  set.type = "drinkTypes";
                  set.label = d.strCategory;
                  set.value = d.strCategory;
                  break;
                case "ingredients":
                  set.type = "ingredients";
                  set.label = d.strIngredient1;
                  set.value = d.strIngredient1;
                  break;
              }

              return set;
            });
            formattedData.sort((a, b) =>
              a.label.toLowerCase() > b.label.toLowerCase() ? 1 : -1
            );
          }

          switch (types[i]["type"]) {
            case "drinkTypes":
              commit("setDrinkTypesOptions", formattedData);
              break;
            case "ingredients":
              commit("setIngredientsOptions", formattedData);
              break;
          }
        }

        commit("setFetchingOptions", false);
      } catch (err) {
        console.log(err);
        commit("setFetchingOptions", false);
      }
    },

    async formatDrinksData({ commit }, dataSet) {
      try {
        let type = dataSet.type;

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
            let ingredient = item[`strIngredient${ingredientCount}`];
            let measure = item[`strMeasure${ingredientCount}`];
            if (ingredient) {
              set.name = ingredient.trim();

              if (measure) {
                set.measure = measure.trim();
              } else {
                set.measure = "Q.S.";
              }

              set.thumb = `${baseOnlineDbImageIngredientsURL}/${ingredient}-small.png`;
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

        if (type === "setPopularDrinks") {
          const resultLimit = 7;
          formattedDrinks = formattedDrinks.slice(0, resultLimit);
        }

        commit(`${type}`, formattedDrinks);
      } catch (err) {
        console.log(err);
      }
    },

    async formatSearchResults({ commit }, rawData) {
      try {
        let mergedRawData = [].concat.apply([], rawData);
        let result = mergedRawData.map(d => {
          let set = {};

          set.id = Number(d.idDrink);
          set.name = d.strDrink;
          set.thumbImg = d.strDrinkThumb;

          return set;
        });

        result = result.sort((a, b) =>
          a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
        );

        commit("setSearchResults", result);
      } catch (err) {
        console.log(err);
      }
    },

    async resetSearchRules({ commit }) {
      try {
        commit("setSearchRules", []);
      } catch (err) {
        console.log(err);
      }
    }
  }
};

export default data;
