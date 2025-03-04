<template>
  <div>
    <h1>Reembolsos</h1>
    <button @click="getReembolsos">Carregar Reembolsos</button>

    <h2>Adicionar Reembolso</h2>
    <form @submit.prevent="createReembolso">
      <input v-model="descricao" placeholder="Descrição" required />
      <input v-model="valor" type="number" placeholder="Valor" required />
      <input v-model="data" type="date" required />
      <button type="submit">Criar Reembolso</button>
    </form>

    <ul>
      <li v-for="reembolso in reembolsos" :key="reembolso.id">
        {{ reembolso.descricao }} - R$ {{ reembolso.valor }} ({{ reembolso.data }})
      </li>
    </ul>
  </div>
</template>

<script>
import api from "../api";

export default {
  data() {
    return {
      reembolsos: [],
      descricao: "",
      valor: "",
      data: "",
    };
  },
  methods: {
    async getReembolsos() {
      try {
        const response = await api.get("/reembolsos");
        this.reembolsos = response.data;
      } catch (error) {
        console.error("Erro ao buscar reembolsos", error);
      }
    },
    async createReembolso() {
      try {
        const response = await api.post("/reembolsos", {
          reembolso: {
            descricao: this.descricao,
            valor: parseFloat(this.valor),
            data: this.data,
          },
        });

        console.log("Reembolso criado:", response.data);

        // Add new reembolso to the list
        this.reembolsos.push(response.data);

        // Reset form
        this.descricao = "";
        this.valor = "";
        this.data = "";
      } catch (error) {
        console.error("Erro ao criar reembolso", error);
      }
    },
  },
};
</script>
