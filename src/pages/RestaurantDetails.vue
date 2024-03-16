<script setup>
import { ref } from "vue";
import "leaflet/dist/leaflet.css";
import LocationAndHours from "@/components/restaurantComponent/LocationAndHours.vue";
import SideContainer from "@/components/restaurantComponent/SideContainer.vue";
import RestaurantHeader from "@/components/restaurantComponent/RestaurantHeader.vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import AboutRestaurant from "@/components/restaurantComponent/AboutRestaurant.vue";

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

const mapIframeSrc = ref(
  "https://www.openstreetmap.org/export/embed.html?bbox=-122.4194,37.7749,-122.4174,37.7769&layer=mapnik",
);
</script>

<template>
  <div>
    <restaurant-header :restaurant="getRestaurant(restaurantId)" />
    <div class="main-container">
      <button
        id="reviewButton"
        class="btn btn-outline-danger btn-lg"
        style="margin-left: 40px"
      >
        <i class="fa-regular fa-star"></i> Write a review
      </button>
      <button class="btn btn-outline-dark btn-lg" style="margin-left: 5px">
        <i class="fa-solid fa-camera-retro"></i> Add photo
      </button>
      <button class="btn btn-outline-dark btn-lg" style="margin-left: 5px">
        <i class="fa-regular fa-share-from-square"></i> Share
      </button>
      <button class="btn btn-outline-dark btn-lg" style="margin-left: 5px">
        <i class="fa-regular fa-bookmark"></i> Save
      </button>
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

.description {
  margin: 10px 10px 30px 40px;
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
