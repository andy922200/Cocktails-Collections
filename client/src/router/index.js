import Vue from "vue";
import VueRouter from "vue-router";
import homepage from "../views/homepage.vue";
import NotFound from "../views/notFound.vue";
import drinkInfo from "../views/drinkInfo.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "homePage",
    component: homepage
  },
  {
    path: "/drinks/:id",
    name: "drinkInfo",
    component: drinkInfo
  },
  {
    path: "*",
    name: "not-found",
    component: NotFound
  }
];

const router = new VueRouter({
  routes
});

router.afterEach(() => {
  document
    .querySelector("body")
    .setAttribute("style", "background-color: #2F0900");
});

export default router;
