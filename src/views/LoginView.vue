<template>
  <div class="container d-flex justify-content-center align-items-center vh-100">
    <div class="card shadow p-4" style="width: 350px;">
      <h2 class="text-center">Login</h2>
      <form @submit.prevent="login">
        <div class="mb-3">
          <label class="form-label">Email</label>
          <input v-model="email" @blur="validateEmail" type="email" class="form-control" placeholder="Digite seu email" required />
          <p v-if="showEmailError" class="text-danger small">{{ emailError }}</p>
        </div>

        <div class="mb-3">
          <label class="form-label">Senha</label>
          <input v-model="password" type="password" class="form-control" placeholder="Digite sua senha" required />
        </div>

        <button type="submit" class="btn btn-primary w-100">Entrar</button>
      </form>
      <p v-if="message" class="mt-3 text-center text-danger">{{ message }}</p>
    </div>
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
