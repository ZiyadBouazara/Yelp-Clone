<script setup>
import { computed, onMounted, ref } from "vue";
import "leaflet/dist/leaflet.css";
import LocationAndHours from "@/components/restaurantComponent/LocationAndHours.vue";
import SideContainer from "@/components/restaurantComponent/SideContainer.vue";
import RestaurantHeader from "@/components/restaurantComponent/RestaurantHeader.vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

const store = useStore();
const route = useRoute();
const restaurantId = route.params.id;
const getRestaurant = (restaurantId) => {
  return store.getters.getRestaurantById(restaurantId);
};

const restaurant = ref({
  name: "Test Restaurant",
  address: {
    street: "1065 Av. de la Médecine",
    city: "Québec",
    province: "QC",
    zipCode: "G1V 0A6",
  },
  phone: "(888) 888-8888",
  openingHours: {
    Mon: "11:30 AM - 9:00 PM",
    Tue: "11:30 AM - 9:00 PM",
    Wed: "11:30 AM - 9:00 PM",
    Thu: "11:30 AM - 9:00 PM",
    Fri: "11:30 AM - 9:00 PM",
    Sat: "11:30 AM - 9:00 PM",
    Sun: "11:30 AM - 9:00 PM",
  },
});

const mapIframeSrc = ref(
  "https://www.openstreetmap.org/export/embed.html?bbox=-122.4194,37.7749,-122.4174,37.7769&layer=mapnik",
);

const description = ref(
  "hamburgers, poutines, vegetarians and vegan options. burgers gourmets,\n" +
    "        poutines, options végétariennes et Vgan.",
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

    <div class="flex-row">
      <LocationAndHours
        :map-iframe-src="mapIframeSrc"
        :restaurant="getRestaurant(restaurantId)"
      />
      <side-container :restaurant="restaurant" />
    </div>
    <div class="line"></div>
    <div class="about-commerce">
      <strong class="header">About the Business</strong>
      <p class="description">{{ description }}</p>
    </div>
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
