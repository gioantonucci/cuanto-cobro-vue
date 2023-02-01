import { createRouter, createWebHistory } from "vue-router";
import DiaView from "../views/DiaView.vue";
import HomeView from "../views/HomeView.vue";
const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/por-dia",
    name: "por-dia",
    component: DiaView,
  },
  {
    path: "/por-hora",
    name: "por-hora",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/HorasView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
