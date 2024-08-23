import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    component: () => import("../views/AboutView.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/LoginPage.vue"),
  },
  {
    path: "/signup",
    name: "signup",
    component: () => import("../views/SignupPage.vue"),
  },
  {
    path: "",
    name: "toolbar",
    component: () => import("../views/ToolBar.vue"),
    children: [
      {
        path: "/search",
        name: "search",
        component: () => import("../views/SearchBar.vue"),
        children: [
          {
            path: "/main",
            name: "main",
            component: () => import("../views/MainPage.vue"),
          },
          {
            path: "/cart",
            name: "cart",
            component: () => import("../views/CartPage.vue"),
          },
          {
            path: "/profile",
            name: "profile",
            component: () => import("../views/ProfilePage.vue"),
          },
          {
            path: "/product/:id",
            name: "product",
            component: () => import("../views/ProductPage.vue"),
          },
        ],
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;