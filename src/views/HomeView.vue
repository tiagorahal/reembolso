<template>
  <div class="container text-center mt-5">
    <h1 class="display-4">Bem-vindo ao Sistema de Reembolsos</h1>
    <router-link v-if="!isLoggedIn" to="/login" class="btn btn-primary mt-3">Fazer Login</router-link>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import { ref, watchEffect } from "vue";

export default {
  setup() {
    const isLoggedIn = ref(!!Cookies.get("access-token"));

    watchEffect(() => {
      isLoggedIn.value = !!Cookies.get("access-token");
    });

    return { isLoggedIn };
  }
};
</script>
