import axios from "axios";

const cocktailsUserId = process.env.VUE_APP_cocktailsUserId;

const baseOnlineDbURL = `https://www.thecocktaildb.com/api/json/v2/${cocktailsUserId}`;
// const baseLocalDbURL = "http://localhost:3000/api";

const onlineDbRequest = axios.create({
  baseURL: baseOnlineDbURL
});

// const LocalDbRequest = axios.create({
//   baseLocalDbURL
// });

export const cocktailsAPIs = {
  getCocktails: data => {
    return onlineDbRequest.get(`/search.php`, data);
  },
  getARandomCocktail: () => {
    return onlineDbRequest.get(`random.php`);
  }
};
