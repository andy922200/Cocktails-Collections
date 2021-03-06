import axios from "axios";

const cocktailsUserId = process.env.VUE_APP_cocktailsUserId;
const baseOnlineDbURL = `https://www.thecocktaildb.com/api/json/v2/${cocktailsUserId}`;
// const baseLocalDbURL = "http://localhost:3000/api";
const baseLocalDbURL = "https://cocktails-collections-sml.herokuapp.com/api";
export const baseOnlineDbImageIngredientsURL = `https://www.thecocktaildb.com/images/ingredients`;
const getToken = () => localStorage.getItem("token");

const onlineDbRequest = axios.create({
  baseURL: baseOnlineDbURL
});

const LocalDbRequest = axios.create({
  baseURL: baseLocalDbURL
});

export const cocktailsAPIs = {
  getFilteredCocktails: data => {
    return onlineDbRequest.get(`/filter.php`, data);
  },
  getSearchedCocktails: data => {
    return onlineDbRequest.get(`/search.php`, data);
  },
  getACocktailById: data => {
    return onlineDbRequest.get(`lookup.php`, data);
  },
  getARandomCocktail: () => {
    return onlineDbRequest.get(`random.php`);
  },
  getPopularCocktails: () => {
    return onlineDbRequest.get(`popular.php`);
  },
  getListOptions: data => {
    return onlineDbRequest.get(`list.php`, data);
  }
};

export const usersAPI = {
  signIn: data => {
    return LocalDbRequest.post(`/signin`, data);
  },
  signUp: data => {
    return LocalDbRequest.post(`/signUp`, data);
  },
  getCurrentUser: () => {
    return LocalDbRequest.get(`/get_current_user`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    });
  }
};
