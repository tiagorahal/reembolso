<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="login">
      <input v-model="email" placeholder="Email" required />
      <p v-if="showEmailError" class="error">{{ emailError }}</p>

      <input v-model="password" type="password" placeholder="Senha" required />
      <button type="submit">Entrar</button>
    </form>
    <p v-if="message" class="message">{{ message }}</p>
  </div>
</template>

<script>
import api from "../api";
import Cookies from "js-cookie";
import { useRouter } from "vue-router";

export default {
  data() {
    return { 
      email: "", 
      password: "", 
      message: "", 
      emailError: "", 
      showEmailError: false 
    };
  },
  setup() {
    const router = useRouter();
    return { router };
  },
  methods: {
    validateEmail() {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      this.emailError = emailPattern.test(this.email) ? "" : "Insira um email válido.";
      this.showEmailError = !!this.emailError;
    },
    async login() {
      this.validateEmail();
      if (this.emailError) return;

      try {
        const response = await api.post("/auth/sign_in", {
          email: this.email,
          password: this.password,
        });

        console.log("Login bem-sucedido!", response.data);
        this.message = "Login realizado com sucesso!";

        Cookies.set("access-token", response.headers["access-token"]);
        Cookies.set("client", response.headers["client"]);
        Cookies.set("uid", response.headers["uid"]);

        window.location.href = "/reembolsos";
      } catch (error) {
        console.error("Erro no login", error.response);
        this.message = "Erro ao fazer login. Verifique suas credenciais.";
      }
    },
  },
};
</script>

<style>
.error {
  color: red;
  font-size: 0.9em;
}
</style>
