<template>
  <nav>
    <ul>
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/login">Login</router-link></li>
      <li><router-link to="/signup">Cadastro</router-link></li>
      <li><router-link to="/reembolsos">Reembolsos</router-link></li>
      <li v-if="isLoggedIn"><a @click="logout" href="#">Sair</a></li>
    </ul>
  </nav>
</template>

<script>
import api from "../api";

export default {
  computed: {
    isLoggedIn() {
      return localStorage.getItem("access-token") !== null;
    },
  },
  methods: {
    async logout() {
      try {
        await api.delete("/auth/sign_out");
        localStorage.clear();
        window.location.reload();
      } catch (error) {
        console.error("Erro ao fazer logout", error);
      }
    },
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
a {
  color: white;
  text-decoration: none;
  cursor: pointer;
}
</style>
