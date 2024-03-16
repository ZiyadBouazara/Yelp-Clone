<template>
  <div class="container">
    <div
      class="modal fade"
      :class="{ show: showModal }"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-primary text-light">
            <h5 class="modal-title" id="exampleModalLabel">
              Create New Favorite List
            </h5>
            <button
              type="button"
              class="btn-close btn-close-white"
              data-bs-dismiss="modal"
              aria-label="Close"
              @click="closeModal"
            ></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label for="favoriteListName" class="form-label"
              >Favorite List Name:</label
              >
              <input
                type="text"
                class="form-control"
                id="favoriteListName"
                v-model="listName"
              />
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              @click="closeModal"
            >
              Close
            </button>
            <button type="button" class="btn btn-primary" @click="addNewList">
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, emit } from "vue";

const props = defineProps({
  showModal: Boolean,
  openModalFavoriteList: Function,
});

const openModal = () => {
  props.openModalFavoriteList();
};

const listName = ref("");

const closeModal = () => {
  emit("update:showModal", false);
  listName.value = ""; // Reset the input value when modal is closed
};

const addNewList = () => {
  console.log("Adding new list with name:", listName.value);
  listName.value = ""; // Reset the input value after adding the list
};
</script>

<style scoped>
.modal-header {
  background-color: #007bff;
  color: #fff;
  border-bottom: 1px solid #dee2e6;
}

.modal-body {
  padding: 20px;
}

.modal-footer {
  justify-content: space-between;
  border-top: 1px solid #dee2e6;
}

.btn-close-white {
  color: #fff;
}
</style>
