<script setup>
const props = defineProps({
  restaurant: Object,
  mapIframeSrc: String,
});

const getDirections = () => {
  const destination = "46.7799,-71.2772";
  const url = `https://www.openstreetmap.org/directions?engine=osrm_car&to=${destination}`;
  window.open(url);
};
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

      <div class="d-flex align-items">
        <p class="address-container">
          <a class="side-container-link">{{ restaurant.address.street }}</a
          ><br />
          {{ restaurant.address.city }}, {{ restaurant.address.province }}
          {{ restaurant.address.zipCode }}
        </p>
        <button class="btn btn-outline-dark btn-lg" @click="getDirections">
          Get Directions
        </button>
      </div>
    </div>

    <div class="hours-list">
      <div
        v-for="(hours, day) in restaurant.openingHours"
        :key="day"
        class="hours-item"
      >
        <span class="day">{{ day }}</span>
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
  margin-left: 10px;
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
