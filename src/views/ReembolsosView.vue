<template>
  <div class="container mt-4">
    <h1 class="text-center">Reembolsos</h1>

    <h2 class="mt-4">Adicionar Reembolso</h2>
    <form @submit.prevent="createReembolso" class="row g-3">
      <div class="col-md-4">
        <input v-model="descricao" class="form-control" placeholder="Descrição" required />
      </div>
      <div class="col-md-2">
        <input v-model="valor" class="form-control" placeholder="Valor" required />
      </div>
      <div class="col-md-3">
        <input v-model="data" class="form-control" type="date" :max="today" required />
      </div>
      <div class="col-md-3">
        <button class="btn btn-success w-100" type="submit">Criar Reembolso</button>
      </div>
    </form>

    <ul class="list-group mt-4">
      <li class="list-group-item d-flex justify-content-between align-items-center" v-for="reembolso in reembolsos" :key="reembolso.id">
        <span>{{ reembolso.descricao }} - <strong>R$ {{ reembolso.valor }}</strong> ({{ formatDate(reembolso.data) }})</span>
        <button class="btn btn-danger btn-sm" @click="deleteReembolso(reembolso.id)">❌</button>
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

    const deleteReembolso = async (id) => {
      if (!window.confirm("Reembolso: Tem certeza que deseja excluir este reembolso?")) return;

      try {
        await api.delete(`/reembolsos/${id}`);
        reembolsos.value = reembolsos.value.filter(reembolso => reembolso.id !== id);
        console.log("Reembolso deletado com sucesso.");
      } catch (error) {
        console.error("Erro ao deletar reembolso", error);
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
      deleteReembolso,
    };
  },
};
</script>
