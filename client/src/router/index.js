import Vue from "vue";
import VueRouter from "vue-router";
import homePage from "../views/homePage.vue";
import NotFound from "../views/notFound.vue";
import drink from "../views/drink.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "homePage",
    component: homePage
  },
  {
    path: "/drinks/:id",
    name: "drink",
    component: drink
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

export default router;
