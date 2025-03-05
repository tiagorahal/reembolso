<template>
  <div class="container d-flex justify-content-center align-items-center vh-100">
    <div class="card shadow p-4" style="width: 400px;">
      <h2 class="text-center">Cadastro</h2>
      <form @submit.prevent="register">
        <div class="mb-3">
          <label class="form-label">Email</label>
          <input v-model="email" @blur="validateEmail" type="email" class="form-control" placeholder="Digite seu email" required />
          <p v-if="showEmailError" class="text-danger small">{{ emailError }}</p>
        </div>

        <div class="mb-3">
          <label class="form-label">Senha</label>
          <input v-model="password" type="password" class="form-control" placeholder="Digite sua senha" required />
        </div>

        <div class="mb-3">
          <label class="form-label">Confirmar Senha</label>
          <input v-model="password_confirmation" type="password" class="form-control" placeholder="Confirme sua senha" required />
        </div>

        <button type="submit" class="btn btn-success w-100">Criar Conta</button>
      </form>
      <p v-if="message" class="mt-3 text-center text-danger">{{ message }}</p>
    </div>
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
