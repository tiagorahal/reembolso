<template>
  <div class="container mt-4">
    <h1 class="text-center">Reembolsos</h1>

    <h2 class="mt-4">Adicionar Reembolso</h2>
    <form @submit.prevent="createReembolso" class="row g-3">
      <div class="col-md-4">
        <input v-model="descricao" class="form-control" placeholder="Descrição" required />
      </div>
      <div class="col-md-2">
        <input v-model="valor" class="form-control" placeholder="Valor" required pattern="^\d+([.,]\d{1,2})?$" inputmode="decimal" />
      </div>
      <div class="col-md-3">
        <input v-model="data" class="form-control" type="date" :max="today" required />
      </div>
      <div class="col-md-3">
        <button class="btn btn-success w-100" type="submit">Criar Reembolso</button>
      </div>
    </form>

    <ul class="list-group mt-4">
      <li class="list-group-item d-flex justify-content-between align-items-center"
          v-for="reembolso in reembolsos"
          :key="reembolso.id">

        <span class="text-truncate flex-grow-1" style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
          {{ reembolso.descricao }}
        </span>

        <div class="d-flex align-items-center ms-3" style="white-space: nowrap;">
          <span class="fw-bold me-3">R$ {{ formatValor(reembolso.valor) }}</span>
          <span>{{ formatDate(reembolso.data) }}</span>
        </div>

        <button class="btn btn-primary btn-sm ms-3" @click="openEditModal(reembolso)">✏️</button>

        <button class="btn btn-danger btn-sm ms-3" @click="deleteReembolso(reembolso.id)">❌</button>
      </li>
    </ul>

    <div class="modal fade" id="editModal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Editar Reembolso</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="updateReembolso">
              <div class="mb-3">
                <label class="form-label">Descrição</label>
                <input v-model="editReembolso.descricao" class="form-control" required />
              </div>
              <div class="mb-3">
                <label class="form-label">Valor</label>
                <input v-model="editReembolso.valor"
                       class="form-control"
                       required
                       pattern="^\d+([.,]\d{1,2})?$"
                       inputmode="decimal"
                       @input="formatInputValue"
                />
              </div>
              <div class="mb-3">
                <label class="form-label">Data</label>
                <input v-model="editReembolso.data" class="form-control" type="date" :max="today" required />
              </div>
              <button type="submit" class="btn btn-primary w-100">Salvar Alterações</button>
            </form>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import api from "../api";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";

export default {
  setup() {
    const reembolsos = ref([]);
    const descricao = ref("");
    const valor = ref("");
    const data = ref("");
    const today = ref(new Date().toISOString().split("T")[0]);

    const editReembolso = ref({ id: null, descricao: "", valor: "", data: "" });
    let editModal;

    onMounted(() => {
      getReembolsos();
      editModal = new bootstrap.Modal(document.getElementById("editModal"));
    });

    const formatDate = (dateString) => {
      const date = new Date(dateString);
      if (isNaN(date)) return dateString;
      return date.toLocaleDateString("pt-BR");
    };

    const formatValor = (val) => {
      const num = parseFloat(val);
      return isNaN(num) ? "0.00" : num.toFixed(2);
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
      if (new Date(data.value) > new Date()) {
        alert("Não é possível criar um reembolso para uma data futura!");
        return;
      }

      try {
        const formattedValue = parseFloat(valor.value.replace(",", ".")).toFixed(2);

        const response = await api.post("/reembolsos", {
          reembolso: { descricao: descricao.value, valor: formattedValue, data: data.value },
        });

        let index = reembolsos.value.findIndex(r => new Date(r.data) > new Date(response.data.data));
        index === -1 ? reembolsos.value.push(response.data) : reembolsos.value.splice(index, 0, response.data);

        descricao.value = "";
        valor.value = "";
        data.value = "";
      } catch (error) {
        console.error("Erro ao criar reembolso", error);
      }
    };

    const deleteReembolso = async (id) => {
      if (!window.confirm("Reembolsos: Tem certeza que deseja excluir este reembolso?")) return;

      try {
        await api.delete(`/reembolsos/${id}`);
        reembolsos.value = reembolsos.value.filter(r => r.id !== id);
      } catch (error) {
        console.error("Erro ao deletar reembolso", error);
      }
    };

    const openEditModal = (reembolso) => {
      editReembolso.value = { ...reembolso };
      editModal.show();
    };

    const updateReembolso = async () => {
      try {
        const formattedValue = parseFloat(editReembolso.value.valor.replace(",", ".")).toFixed(2);

        const response = await api.put(`/reembolsos/${editReembolso.value.id}`, {
          reembolso: { descricao: editReembolso.value.descricao, valor: formattedValue, data: editReembolso.value.data },
        });

        reembolsos.value = reembolsos.value.filter(r => r.id !== editReembolso.value.id);

        let index = reembolsos.value.findIndex(r => new Date(r.data) > new Date(response.data.data));
        index === -1 ? reembolsos.value.push(response.data) : reembolsos.value.splice(index, 0, response.data);

        editModal.hide();
      } catch (error) {
        console.error("Erro ao atualizar reembolso", error);
      }
    };

    const formatInputValue = () => {
      editReembolso.value.valor = editReembolso.value.valor.replace(/[^0-9.,]/g, "");
    };

    return {
      reembolsos,
      descricao,
      valor,
      data,
      today,
      getReembolsos,
      createReembolso,
      formatDate,
      formatValor,
      deleteReembolso,
      editReembolso,
      openEditModal,
      updateReembolso,
      formatInputValue,
    };
  },
};
</script>
