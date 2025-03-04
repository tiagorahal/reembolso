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
import api from "../api";

export default {
  data() {
    return { reembolsos: [] };
  },
  methods: {
    async getReembolsos() {
      try {
        const response = await api.get("/reembolsos");
        this.reembolsos = response.data;
      } catch (error) {
        console.error("Erro ao buscar reembolsos", error);
      }
    }
  }
};
</script>
