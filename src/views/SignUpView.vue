<template>
  <div class="signup-container">
    <h1>Cadastro</h1>
    <form @submit.prevent="register">
      <label for="email">Email:</label>
      <input type="email" v-model="email" required />

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

export default {
  name: "SignUpView",
  data() {
    return {
      email: "",
      password: "",
      password_confirmation: "",
      message: ""
    };
  },
  methods: {
    async register() {
      try {
        const response = await api.post("/auth", {
          email: this.email,
          password: this.password,
          password_confirmation: this.password_confirmation
        });

        this.message = "Cadastro realizado com sucesso! Confirme seu email.";
      } catch (error) {
        console.error("Erro no cadastro", error.response);
        this.message = "Erro ao cadastrar. Verifique os dados.";
      }
    }
  }
};
</script>
