<template>
  <div class="scroll-container" title="Favorites">
    <h4 id="title" class="col-12 justify-content-start">My Favorites</h4>
    <div v-if="!userFavoritesIsNotEmpty">
      <div
        :class="{ 'border-danger': isHovered }"
        class="card custom-card"
        style="margin-top: 0"
      >
        <div class="card-body" style="height: 250px; text-align: center">
          <h5 class="card-title justify-content-center">
            You have no favorites yet
          </h5>
        </div>
      </div>
    </div>

    <div class="col-12 d-flex justify-content-center">
      <FavoritesLists />
    </div>

    <form class="buttons-control">
      <input v-model="listName" class="list-name" placeholder="List Name" />
      <button class="btn btn-outline-danger" @click="addFavoriteList">
        Create Favorite
      </button>
    </form>
    <div class="favorites-section">
      <div
        v-for="favorite in userFavorites"
        id="favorites-card"
        :key="favorite.id"
        class="favorite-item"
      >
        <CardComponent
          :imageSrc="favorite.restaurants.imageSrc"
          :restaurantDescription="favorite.restaurants.description"
          :restaurantName="favorite.restaurants.name"
        ></CardComponent>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { useStore } from "vuex";
import CardComponent from "@/components/generalComponent/BaseRestaurantCards.vue";
import FavoritesLists from "@/components/profileComponent/FavoritesLists.vue";
import ModalFavoriteList from "@/components/profileComponent/ModalFavoriteList.vue";

const listName = ref("");
const isHovered = false;
const store = useStore();
const loggedInUser = computed(() => store.getters.getLoggedInUser);
const userId = computed(() => loggedInUser.value?.id);
const userEmail = computed(() => loggedInUser.value?.email);
const userFavoritesIsNotEmpty = computed(
  () => store.getters.getUserFavorites.length > 0,
);
const userFavorites = computed(() => store.getters.getUserFavorites);

const addFavoriteList = () => {
  if (listName.value && userEmail) {
    store.dispatch("createNewFavoritesList", {
      listName: listName.value,
      ownerEmail: userEmail,
    });
  } else {
    console.error("List Name or user Email missing!");
  }
};

watch(userId, (newUserId) => {
  if (newUserId !== null) {
    store.dispatch("getAllUserFavoritesLists", newUserId);
  }
});
</script>

<style scoped>
.scroll-container {
  max-width: 90vw;
  min-width: 320px;
  margin: auto;
  overflow-x: auto;
  white-space: nowrap;
}

#title {
  font-weight: bold;
}

.card {
  margin-right: 10px;
}

p {
  font-size: 1rem;
  margin-bottom: 1rem;
  align-items: center;
}

a {
  color: crimson;
  text-decoration: none;
  font-weight: bold;
  transition: color 0.3s;
}

a:hover {
  color: #d94848;
  text-decoration: underline;
}

.favorites-section {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  width: auto;
}

.favorite-item {
  flex: 0 0 320px;
  scroll-snap-align: start;
  margin-right: 10px;
}

@media screen and (max-width: 576px) {
  .scroll-container {
    max-width: 20rem;
  }
}
</style>
