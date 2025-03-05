<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item" v-if="!isLoggedIn">
            <router-link class="nav-link" to="/login">Login</router-link>
          </li>
          <li class="nav-item" v-if="!isLoggedIn">
            <router-link class="nav-link" to="/signup">Cadastro</router-link>
          </li>
          <li class="nav-item" v-if="isLoggedIn">
            <router-link class="nav-link" to="/reembolsos">Reembolsos</router-link>
          </li>
          <li class="nav-item" v-if="isLoggedIn">
            <button class="btn btn-danger" @click="confirmLogout">Logout</button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import Cookies from "js-cookie";
import { ref, watchEffect } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const isLoggedIn = ref(!!Cookies.get("access-token"));
    const router = useRouter();

    watchEffect(() => {
      isLoggedIn.value = !!Cookies.get("access-token");
    });

    const confirmLogout = () => {
      if (confirm("Reembolsos: Tem certeza que deseja sair?")) {
        Cookies.remove("access-token");
        Cookies.remove("client");
        Cookies.remove("uid");
        isLoggedIn.value = false;
        router.push("/login");
      }
    };

    return { isLoggedIn, confirmLogout };
  },
};
</script>
