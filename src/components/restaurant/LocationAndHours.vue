<script setup>
import { utils } from "@/javascript/utils";
import { onMounted, ref } from "vue";

const props = defineProps({
  restaurant: Object,
  getDirections: Function,
  destination: String,
});

const openDirections = () => {
  props.getDirections(props.destination);
};

const isCurrentDay = (day) => {
  const currentDay = utils.getCurrentDay();
  return day === currentDay;
};

const mapIframeSrc = ref(
  "https://www.openstreetmap.org/export/embed.html?bbox=-122.4194,37.7749,-122.4174,37.7769&layer=mapnik",
);

const map = ref(null);

const initMap = async (restaurantLocation) => {
  try {
    const leaflet = await import("leaflet");
    map.value = leaflet.map("map").setView(restaurantLocation, 15);

    leaflet
      .tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      })
      .addTo(map.value);

    const customIcon = leaflet.divIcon({
      className: "custom-leaflet-div-icon",
      html: '<i class="fas fa-map-marker-alt fa-3x text-danger"></i>',
      iconAnchor: [18, 36],
    });

    leaflet.marker(restaurantLocation, { icon: customIcon }).addTo(map.value);
  } catch (error) {
    console.error("Error loading Leaflet:", error);
  }
};

onMounted(() => {
  initMap(props.restaurant.location.coordinates);
});
</script>

<template>
  <div class="main-container">
    <div class="map-container">
      <div id="map" class="map">
        <iframe
          class="map-iframe"
          width="350"
          height="150"
          :src="mapIframeSrc"
        ></iframe>
      </div>

      <div
        class="d-flex align-items"
        v-if="
          restaurant?.address &&
          restaurant?.location &&
          restaurant.location?.coordinates
        "
      >
        <p class="address-container">
          <a class="side-container-link">{{ restaurant.address }}</a>
        </p>
        <button class="btn btn-outline-dark btn" @click="openDirections">
          Get Directions
        </button>
      </div>
    </div>

    <div class="hours-list" v-if="restaurant?.opening_hours">
      <div
        v-for="(hours, day) in restaurant.opening_hours"
        :key="day"
        class="hours-item"
      >
        <span class="day">{{
          day.slice(0, 1).toUpperCase() + day.slice(1, 3)
        }}</span>
        <span class="hours">{{ hours }}</span>
        <span
          v-if="isCurrentDay(day)"
          class="opening"
          :style="{
            color: utils.isRestaurantOpen ? 'green' : 'red',
          }"
        >
          {{ utils.isRestaurantOpen ? "Open" : "Closed" }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.side-container-link {
  font-weight: bold;
  color: #dc3545;
  text-decoration: none;
}

.side-container-link:hover {
  text-decoration: underline;
}

.address-container {
  margin-right: 10px;
  margin-left: 40px;
  font-size: 0.9rem;
}

.hours-item {
  margin-bottom: 5px;
  align-items: baseline;
}

.day {
  display: inline-block;
  width: 60px;
}

.hours {
  margin-left: 30px;
}

.opening {
  margin-left: 30px;
}

.hours-list {
  margin-top: 10px;
  margin-left: 40px;
  display: flex;
  flex-direction: column;
  width: 100%;
}

.map {
  margin: 10px 10px 10px 40px;
}

@media (max-width: 665px) {
  .main-container {
    display: flex;
    flex-direction: column;
  }
}

@media (min-width: 666px) {
  .main-container {
    display: flex;
    flex-direction: row;
  }
}
</style>
