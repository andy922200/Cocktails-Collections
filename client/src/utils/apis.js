import axios from "axios";

const baseOnlineDbURL = "https://www.thecocktaildb.com/api/json/v1/1";
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
