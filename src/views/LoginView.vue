<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="login">
      <input v-model="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Senha" required />
      <button type="submit">Entrar</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return { email: "", password: "" };
  },
  methods: {
    async login() {
      const response = await fetch("http://localhost:4000/auth/sign_in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: this.email, password: this.password }),
      });
      const data = await response.json();
      console.log("Login:", data);
    },
  },
};
</script>
