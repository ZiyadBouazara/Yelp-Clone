<script setup>
import { onMounted, ref } from "vue";

const props = defineProps({
  restaurant: Object,
});

const mapIframeSrc = ref(
  "https://www.openstreetmap.org/export/embed.html?bbox=-122.4194,37.7749,-122.4174,37.7769&layer=mapnik",
);

const getDirections = (destination) => {
  const url = `https://www.openstreetmap.org/directions?engine=osrm_car&to=${destination}`;
  window.open(url);
};

const map = ref(null);

const initMap = async () => {
  try {
    const restaurantLocation = [46.7799, -71.2772];
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
  initMap();
});
</script>

<template>
  <div class="d-flex">
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
        <button
          class="btn btn-outline-dark btn"
          @click="getDirections(restaurant.address)"
        >
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

.hours-list {
  margin-top: 10px;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  width: 100%;
}

.map {
  margin: 10px 10px 10px 40px;
}
</style>
