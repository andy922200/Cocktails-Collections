import Vue from "vue";
import VueRouter from "vue-router";
import homepage from "../views/homepage.vue";
import NotFound from "../views/notFound.vue";
import drink from "../views/drink.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "homePage",
    component: homepage
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
