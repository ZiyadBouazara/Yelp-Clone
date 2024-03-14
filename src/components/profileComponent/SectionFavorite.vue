<template>
  <div class="container" title="Favorites">
    <h3 class="col-12" id="title">Add a new favorites list</h3>
    <div v-if="!userFavoritesIsNotEmpty">
      <div
        :class="{ 'border-danger': isHovered }"
        class="card custom-card"
        style="margin-top: 0"
      >
        <div class="card-body" style="height: 250px; text-align: center">
          <h5 class="card-title">Add some favorites</h5>
          <font-awesome-icon :icon="['far', 'heart']" beat />
        </div>
      </div>
    </div>
    <div class="favorites-section">
      <div class="favorite-group-add">
        <button class="btn-outline-danger button-favorite-add">
          Add favorite Group
        </button>
        <font-awesome-icon :icon="['far', 'plus']" />
      </div>
      <div
        id="favorites-card"
        v-for="favorite in userFavorites"
        :key="favorite.id"
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
import { computed } from "vue";
import { useStore } from "vuex";
import CardComponent from "@/components/generalComponent/BaseRestaurantCards.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const store = useStore();
const userId = "625792ae43cb87000460b7c0";

const userFavoritesIsNotEmpty = computed(
  () => store.getters.getUserFavorites.length > 0,
);
const userFavorites = computed(() => store.getters.getUserFavorites);

const isHovered = false; // You can define reactive variables here

store.dispatch("fetchUserFavorites", userId);
</script>

<style scoped>
.favorite-group-add {
  background-color: #ababab;
  border-radius: 7px;
  display: flex;
  justify-content: start;
}

.container {
  max-width: 90vw;
  margin: auto;
  display: grid;
  grid-auto-flow: column;
  scroll-behavior: auto;
  grid-auto-columns: 20rem;
  overflow-y: hidden;
  overscroll-behavior-x: contain;
  scroll-snap-type: x mandatory;
  background-color: ghostwhite;
  border: 1px solid #ccc;
  border-radius: 10px;
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

#title {
  display: flex;
  justify-content: center;
}

a:hover {
  color: #d94848;
  text-decoration: underline;
}

#favorites-card {
  height: 500px;
}

@media screen and (max-width: 576px) {
  .container {
    max-width: 20rem;
  }
}

.card {
  transition: border-color 0.3s ease;
  background-color: ghostwhite;
  border-color: transparent;
  box-shadow: rgba(235, 235, 235, 1);
}

.card:hover {
  border-color: rgba(0, 0, 0, 0.1);
}

.custom-card {
  padding: 20px;
}
</style>
