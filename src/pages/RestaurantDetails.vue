<script setup>
import "leaflet/dist/leaflet.css";
import LocationAndHours from "@/components/restaurant/LocationAndHours.vue";
import SideContainer from "@/components/restaurant/SideContainer.vue";
import RestaurantHeader from "@/components/restaurant/RestaurantHeader.vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import AboutRestaurant from "@/components/restaurant/AboutRestaurant.vue";
import AddVisit from "@/components/visit/AddVisit.vue";
import { onMounted } from "vue";
import AddFavorite from "@/components/AddFavorite.vue";

const store = useStore();
const route = useRoute();
const restaurantId = route.params.id;
const getRestaurant = (restaurantId) => {
  return store.getters.getRestaurantById(restaurantId);
};

const getDirections = (destination) => {
  const url = `https://www.openstreetmap.org/directions?engine=osrm_car&to=${destination}`;
  window.open(url);
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

onMounted(() => {
  scrollToTop();
});
</script>

<template>
  <div>
    <restaurant-header :restaurant="getRestaurant(restaurantId)" />
    <div class="main-container d-flex">
      <button
        :data-bs-target="`#visitModal${restaurantId}`"
        class="btn btn-outline-danger btn-lg"
        data-bs-toggle="modal"
        style="margin-left: 40px"
        type="button"
      >
        <i class="fa-regular fa-star"></i> Write a review
      </button>
      <add-visit :restaurant-id="restaurantId" />
      <button class="btn btn-outline-dark btn-lg" style="margin-left: 5px">
        <i class="fa-solid fa-camera-retro"></i> Add photo
      </button>
      <button class="btn btn-outline-dark btn-lg" style="margin-left: 5px">
        <i class="fa-regular fa-share-from-square"></i> Share
      </button>
      <button
        class="btn btn-outline-dark btn-lg"
        style="margin-left: 5px"
        :data-bs-target="`#modalAddFavorite${restaurantId}`"
        data-bs-toggle="modal"
        type="button"
      >
        <i class="fa-regular fa-bookmark"></i> Save
      </button>
      <add-favorite :restaurant-id="restaurantId" />
    </div>

    <div class="line"></div>
    <div class="d-flex align-items-baseline">
      <strong class="header">Location & Hours</strong>
    </div>

    <div v-if="getRestaurant(restaurantId)?.address" class="flex-row">
      <LocationAndHours
        :restaurant="getRestaurant(restaurantId)"
        :get-directions="getDirections"
        :destination="getRestaurant(restaurantId).address"
      />
      <side-container
        :restaurant="getRestaurant(restaurantId)"
        :get-directions="getDirections"
        :destination="getRestaurant(restaurantId).address"
      />
    </div>
    <div class="line"></div>
    <about-restaurant :restaurant="getRestaurant(restaurantId)" />
    <div class="line"></div>
  </div>
</template>

<style scoped>
.header {
  font-size: 1.2em;
  margin: 10px 10px 10px 40px;
}

.line {
  border-bottom: 1px solid #ccc;
  margin: 20px 530px 20px 40px;
}

@media (min-width: 768px) {
  .flex-row {
    display: flex;
    flex-direction: row;
  }
}

@media (min-width: 576px) {
  .mobile-title {
    display: none;
  }
}
</style>
