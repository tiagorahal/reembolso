<template>
  <div class="container mt-4">
    <h1 class="text-center">Reembolsos</h1>

    <h2 class="mt-4">Adicionar Reembolso</h2>
    <form @submit.prevent="createReembolso" class="row g-3">
      <div class="col-md-3">
        <input v-model="descricao" class="form-control" placeholder="Descrição" required />
      </div>
      <div class="col-md-2">
        <input 
          v-model="valor" 
          class="form-control" 
          placeholder="Valor"
          required 
          @input="validateValor"
        />
      </div>
      <div class="col-md-3">
        <input v-model="data" class="form-control" type="date" :max="today" required />
      </div>
      <div class="col-md-4">
        <input
          v-model="tagsInput"
          class="form-control"
          placeholder="Tags (separadas por vírgula)"
        />
      </div>
      <div class="col-md-3">
        <button class="btn btn-success w-100" type="submit">Criar Reembolso</button>
      </div>
    </form>

    <ul class="list-group mt-4">
      <li class="list-group-item d-flex justify-content-between align-items-center"
          v-for="reembolso in reembolsos"
          :key="reembolso.id">

        <div class="text-truncate flex-grow-1">
          <span>{{ reembolso.descricao }}</span>
          <div class="small text-muted">
            <span v-for="tag in reembolso.tags" :key="tag.id" class="badge bg-primary me-1">
              {{ tag.nome }}
            </span>
          </div>
        </div>

        <div class="d-flex align-items-center ms-3" style="white-space: nowrap;">
          <span class="fw-bold me-3">
            R$ {{ parseFloat(reembolso.valor || 0).toFixed(2) }}
          </span>
          <span>{{ formatDate(reembolso.data) }}</span>
        </div>

        <button class="btn btn-warning btn-sm me-2" @click="openEditModal(reembolso)">✏️</button>
        <button class="btn btn-danger btn-sm" @click="deleteReembolso(reembolso.id)">❌</button>
      </li>
    </ul>


    <!-- Modal for Editing -->
    <div v-if="editModal" class="modal show d-block">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Editar Reembolso</h5>
            <button type="button" class="btn-close" @click="editModal = false"></button>
          </div>
          <div class="modal-body">
            <input v-model="editReembolso.descricao" class="form-control mb-2" placeholder="Descrição" required />
            <input v-model="editReembolso.valor" class="form-control mb-2" placeholder="Valor" @input="validateValor" required />
            <input v-model="editReembolso.data" class="form-control mb-2" type="date" :max="today" required />
            <input v-model="editReembolso.tags" class="form-control mb-2" placeholder="Tags (separadas por vírgula)" />
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" @click="editModal = false">Cancelar</button>
            <button class="btn btn-primary" @click="updateReembolso">Salvar Alterações</button>
          </div>
        </div>
      </div>
    </div>

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
    const tagsInput = ref("");
    const today = ref(new Date().toISOString().split("T")[0]);
    const editModal = ref(false);
    const editReembolso = ref({});

    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return isNaN(date) ? dateString : date.toLocaleDateString("pt-BR");
    };

    const getReembolsos = async () => {
      try {
        const response = await api.get("/reembolsos");
        reembolsos.value = response.data.map(r => ({
          ...r,
          valor: parseFloat(r.valor || 0),
          tags: r.tags || []
        })).sort((a, b) => new Date(a.data) - new Date(b.data));
      } catch (error) {
        console.error("Erro ao buscar reembolsos", error);
      }
    };




    const validateValor = () => {
      valor.value = valor.value.replace(/[^0-9.,]/g, "");
      const parts = valor.value.split(/[,.]/);
      if (parts.length > 2) {
        valor.value = parts[0] + "." + parts.slice(1).join("");
      }
    };

    const createReembolso = async () => {
      if (new Date(data.value) > new Date()) {
        alert("Não é possível criar um reembolso para uma data futura!");
        return;
      }

      const tagsArray = tagsInput.value
        .split(",")
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);

      try {
        const response = await api.post("/reembolsos", {
          reembolso: {
            descricao: descricao.value,
            valor: parseFloat(valor.value),
            data: data.value,
            tag_ids: tagsArray,
          },
        });

        reembolsos.value.push(response.data);
        reembolsos.value.sort((a, b) => new Date(a.data) - new Date(b.data));

        descricao.value = "";
        valor.value = "";
        data.value = "";
        tagsInput.value = "";
      } catch (error) {
        console.error("Erro ao criar reembolso", error);
      }
    };

    const openEditModal = (reembolso) => {
      editReembolso.value = { 
        ...reembolso, 
        tags: reembolso.tags ? reembolso.tags.map(tag => tag.nome).join(", ") : "" 
      };
      editModal.value = true;
    };


    const updateReembolso = async () => {
      const updatedTagsArray = editReembolso.value.tags
        .split(",")
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);

      await api.put(`/reembolsos/${editReembolso.value.id}`, {
        reembolso: {
          descricao: editReembolso.value.descricao,
          valor: parseFloat(editReembolso.value.valor),
          data: editReembolso.value.data,
          tag_ids: updatedTagsArray,
        },
      });

      editModal.value = false;
      getReembolsos();
    };

    onMounted(getReembolsos);

    return { reembolsos, descricao, valor, data, tagsInput, today, createReembolso, formatDate, validateValor, editModal, editReembolso, openEditModal, updateReembolso };
  },
};
</script>
