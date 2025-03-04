<script setup>
import { ref } from "vue";
import api from "../api";

const email = ref("");
const password = ref("");
const loginError = ref("");

const login = async () => {
  try {
    const res = await api.post("/auth/sign_in", {
      email: email.value,
      password: password.value,
    });
    localStorage.setItem("token", res.headers["access-token"]);
    localStorage.setItem("client", res.headers["client"]);
    localStorage.setItem("uid", res.headers["uid"]);
    window.location.href = "/reembolsos";
  } catch (error) {
    loginError.value = "Credenciais inválidas";
  }
};
</script>

<template>
  <div>
    <h2>Login</h2>
    <input v-model="email" type="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Senha" />
    <button @click="login">Entrar</button>
    <p v-if="loginError" class="error">{{ loginError }}</p>
  </div>
</template>

<style scoped>
input, button {
  display: block;
  margin: 10px 0;
  padding: 10px;
}
.error {
  color: red;
}
</style>
