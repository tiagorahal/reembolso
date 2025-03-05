<template>
  <div class="signup-container">
    <h1>Cadastro</h1>
    <form @submit.prevent="register">
      <label for="email">Email:</label>
      <input type="email" v-model="email" required />
      <p v-if="showEmailError" class="error">{{ emailError }}</p>

      <label for="password">Senha:</label>
      <input type="password" v-model="password" required />

      <label for="password_confirmation">Confirmar Senha:</label>
      <input type="password" v-model="password_confirmation" required />

      <button type="submit">Criar Conta</button>
    </form>
    <p v-if="message" class="message">{{ message }}</p>
  </div>
</template>

<script>
import api from "../api";
import { useRouter } from "vue-router";

export default {
  name: "SignUpView",
  data() {
    return {
      email: "",
      password: "",
      password_confirmation: "",
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
    async register() {
      this.validateEmail();
      if (this.emailError) return;

      try {
        await api.post("/auth", {
          email: this.email,
          password: this.password,
          password_confirmation: this.password_confirmation
        });

        this.message = "Cadastro realizado com sucesso! Redirecionando para o login...";
        
        setTimeout(() => {
          this.router.push("/login");
        }, 2000);

      } catch (error) {
        console.error("Erro no cadastro", error.response);
        this.message = "Erro ao cadastrar. Verifique os dados.";
      }
    }
  }
};
</script>

<style>
.error {
  color: red;
  font-size: 0.9em;
}
</style>
