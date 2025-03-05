import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import ReembolsosView from "../views/ReembolsosView.vue";
import SignUpView from "../views/SignUpView.vue";

const routes = [
  { path: "/", component: HomeView },
  { path: "/login", component: LoginView },
  { path: "/reembolsos", component: ReembolsosView },
  { path: "/signup", component: SignUpView }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
