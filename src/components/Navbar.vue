<template>
  <nav>
    <ul>
      <li><router-link to="/">Home</router-link></li>
      <li v-if="!isLoggedIn"><router-link to="/login">Login</router-link></li>
      <li v-if="!isLoggedIn"><router-link to="/signup">Cadastro</router-link></li>
      <li v-if="isLoggedIn"><router-link to="/reembolsos">Reembolsos</router-link></li>
      <li v-if="isLoggedIn"><button @click="logout">Sair</button></li>
    </ul>
  </nav>
</template>

<script>
import Cookies from "js-cookie";
import { ref, onMounted, watchEffect } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const isLoggedIn = ref(false);
    const router = useRouter();

    const checkLoginStatus = () => {
      const token = Cookies.get("access-token");
      const client = Cookies.get("client");
      const uid = Cookies.get("uid");

      isLoggedIn.value = !!(token && client && uid);
    };

    const logout = () => {
      Cookies.remove("access-token");
      Cookies.remove("client");
      Cookies.remove("uid");
      isLoggedIn.value = false;
      router.push("/");
    };

    onMounted(checkLoginStatus);
    watchEffect(checkLoginStatus);

    return { isLoggedIn, logout };
  },
};
</script>

<style scoped>
nav {
  background: #333;
  padding: 1rem;
}
ul {
  display: flex;
  list-style: none;
  gap: 1rem;
}
a, button {
  color: white;
  text-decoration: none;
  background: none;
  border: none;
  cursor: pointer;
}
button:hover {
  text-decoration: underline;
}
</style>
