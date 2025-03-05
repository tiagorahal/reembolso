<template>
  <div>
    <h1>Reembolsos</h1>

    <h2>Adicionar Reembolso</h2>
    <form @submit.prevent="createReembolso">
      <input v-model="descricao" placeholder="Descrição" required />
      <input 
        v-model="valor" 
        placeholder="Valor (ex: 10,50 ou 10.50)" 
        @input="formatValor" 
        required 
      />
      <input v-model="data" type="date" :max="today" required />
      <button type="submit">Criar Reembolso</button>
    </form>

    <ul>
      <li v-for="reembolso in reembolsos" :key="reembolso.id">
        {{ reembolso.descricao }} - R$ {{ formatCurrency(reembolso.valor) }} ({{ formatDate(reembolso.data) }})
      </li>
    </ul>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import api from "../api";

export default {
  setup() {
    const reembolsos = ref([]);
    const descricao = ref("");
    const valor = ref("");
    const data = ref("");
    const today = ref(new Date().toISOString().split("T")[0]);

    const formatDate = (dateString) => {
      const date = new Date(dateString);
      if (isNaN(date)) return dateString;
      return date.toLocaleDateString("pt-BR");
    };

    const formatCurrency = (value) => {
      return parseFloat(value).toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    };

    const formatValor = () => {
      valor.value = valor.value
        .replace(/[^0-9,\.]/g, "")
        .replace(",", ".");
    };

    const getReembolsos = async () => {
      try {
        const response = await api.get("/reembolsos");
        reembolsos.value = response.data.sort((a, b) => new Date(a.data) - new Date(b.data));
      } catch (error) {
        console.error("Erro ao buscar reembolsos", error);
      }
    };

    const createReembolso = async () => {
      const selectedDate = new Date(data.value);
      const currentDate = new Date();

      if (selectedDate > currentDate) {
        alert("Não é possível criar um reembolso para uma data futura!");
        return;
      }

      try {
        const response = await api.post("/reembolsos", {
          reembolso: {
            descricao: descricao.value,
            valor: parseFloat(valor.value),
            data: data.value,
          },
        });

        console.log("Reembolso criado:", response.data);

        let index = reembolsos.value.findIndex(r => new Date(r.data) > new Date(response.data.data));
        if (index === -1) {
          reembolsos.value.push(response.data);
        } else {
          reembolsos.value.splice(index, 0, response.data);
        }

        descricao.value = "";
        valor.value = "";
        data.value = "";
      } catch (error) {
        console.error("Erro ao criar reembolso", error);
      }
    };

    onMounted(getReembolsos);

    return {
      reembolsos,
      descricao,
      valor,
      data,
      today,
      getReembolsos,
      createReembolso,
      formatDate,
      formatCurrency,
      formatValor,
    };
  },
};
</script>
