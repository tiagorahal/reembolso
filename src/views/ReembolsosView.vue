<template>
  <div>
    <h1>Reembolsos</h1>
    <button @click="getReembolsos">Carregar Reembolsos</button>
    <ul>
      <li v-for="reembolso in reembolsos" :key="reembolso.id">
        {{ reembolso.descricao }} - R$ {{ reembolso.valor }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return { reembolsos: [] };
  },
  methods: {
    async getReembolsos() {
      const response = await fetch("http://localhost:4000/reembolsos", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      this.reembolsos = await response.json();
    },
  },
};
</script>
