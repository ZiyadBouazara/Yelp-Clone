<template>
  <div class="scroll-container">
    <div class="title">
      <h6>My Lists</h6>
    </div>
    <div v-if="isLoading" class="loading-message">
      <p>Loading...</p>
    </div>
    <div v-else>
      <div
        v-if="!userFavoritesIsNotEmpty"
        class="no-favorites-list justify-content-center"
      >
        <h5>You have no favorites yet!</h5>
      </div>
      <div v-else class="favorite-lists-container">
        <div class="adding-list">
          <button
            class="btn btn-outline-danger adding-list-button"
            @click="openModalFavoriteList"
          >
            Add List
          </button>
        </div>
        <ModalFavoriteList :showModal="showModal" />
        <div class="favorite-lists">
          <div
            v-for="favoriteList in getUserFavoritesList"
            :key="favoriteList.id"
            @click="handleClickedList(favoriteList)"
            class="favorite-pill"
          >
            <h5>{{ favoriteList.name }}</h5>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, emit, onMounted, ref } from "vue";
import { useStore } from "vuex";
import ModalFavoriteList from "@/components/profileComponent/ModalFavoriteList.vue";

const store = useStore();
const showModal = ref(false);
const isLoading = ref(true);
const loggedUser = computed(() => store.getters.getLoggedInUser);
const userId = loggedUser.value?.id;

const openModalFavoriteList = () => (showModal.value = true); // Adjusted this line

const userFavoritesIsNotEmpty = computed(
  () => store.getters.getUserFavorites.length > 0,
);
const getUserFavoritesList = computed(() => store.getters.getUserFavorites);
const favoriteRestaurants = computed(() => getUserFavoritesList.value);

const handleClickedList = (favoriteList) => {
  if (favoriteList.restaurants.length > 0) {
    emit("favoriteListClicked", favoriteList);
    console.log("Voici les restos de cette liste:");
    favoriteList.restaurants.forEach((restaurant) => {
      console.log(restaurant.id);
    });
  } else {
    console.log("Aucun resto dans cette liste de fav!");
  }
};

onMounted(async () => {
  if (userId) {
    await store.dispatch("getAllUserFavoritesLists", { userId });
    isLoading.value = false;
  }
});
</script>

<style scoped>
.favorite-lists-container {
  overflow-x: auto;
  white-space: nowrap;
}

.favorite-lists {
  display: inline-flex;
}

.adding-list-button {
  border-radius: 10px;
  padding: 5px 10px;
  margin: 5px;
}

.favorite-pill {
  background-color: #ced4da;
  border-radius: 10px;
  padding: 5px 10px;
  margin: 5px;
}

.favorite-pill:hover {
  background-color: #ff6666;
}
.no-favorites-list {
  display: flex;
  justify-content: center;
  background-color: #ced4da;
  border-radius: 7px;
  height: auto;
  width: auto;
}

.loading-message {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
}

.title {
  margin-top: 10px;
}
</style>
