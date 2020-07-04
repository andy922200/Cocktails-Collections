import axios from "axios";

const baseOnlineDbURL = "https://www.thecocktaildb.com/api/json/v1/1";
const baseLocalDbURL = "http://localhost:3000/api";

export const apiOnlineDbHelper = axios.create({
  baseOnlineDbURL
});

export const apiLocalDbHelper = axios.create({
  baseLocalDbURL
});
