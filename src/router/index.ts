import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import ReembolsosView from "../views/ReembolsosView.vue";
import SignUpView from "../views/SignUpView.vue";
import Cookies from "js-cookie";

const routes = [
  { path: "/", component: HomeView },
  { path: "/login", component: LoginView },
  { path: "/signup", component: SignUpView },
  { 
    path: "/reembolsos", 
    component: ReembolsosView, 
    meta: { requiresAuth: true }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isLoggedIn = !!Cookies.get("access-token");

  if (to.meta.requiresAuth && !isLoggedIn) {
    next("/login");
  } else {
    next();
  }
});

export default router;
export { routes };
