<script setup>
import { ref, onMounted } from "vue";
import api from "../api";

const reembolsos = ref([]);

const fetchReembolsos = async () => {
  try {
    const res = await api.get("/reembolsos", {
      headers: {
        "access-token": localStorage.getItem("token"),
        "client": localStorage.getItem("client"),
        "uid": localStorage.getItem("uid"),
      },
    });
    reembolsos.value = res.data;
  } catch (error) {
    console.error("Erro ao buscar reembolsos", error);
  }
};

onMounted(fetchReembolsos);
</script>

<template>
  <div>
    <h2>Lista de Reembolsos</h2>
    <ul>
      <li v-for="reembolso in reembolsos" :key="reembolso.id">
        {{ reembolso.descricao }} - R$ {{ reembolso.valor }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
ul {
  list-style: none;
  padding: 0;
}
li {
  background: #eee;
  margin: 5px 0;
  padding: 10px;
}
</style>
