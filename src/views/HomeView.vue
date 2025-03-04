<template>
  <div>
    <h1>Bem-vindo ao Sistema de Reembolsos</h1>
    <router-link v-if="!isLoggedIn" to="/login">Fazer Login</router-link>
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
