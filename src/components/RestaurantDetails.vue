<script setup>
import { ref } from "vue";

const restaurant = ref({
  name: "Test Restaurant",
  address: {
    street: "888 rue des potters",
    city: "Quebec",
    province: "QC",
    zipCode: "G1V 2T8",
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
</script>

<template>
  <div>
    <div>
      <button class="red-button">Write a review</button>
      <button class="white-button dark-text">Ajouter une photo</button>
      <button class="white-button dark-text">Partager</button>
      <button class="white-button dark-text">Sauvegarder</button>
    </div>
    <div class="line"></div>
    <div class="d-flex align-items-baseline">
      <strong class="header">Emplacement & horaires</strong>
      <p class="edit">Suggest an edit</p>
    </div>
    <div class="d-flex">
      <div class="map-container">
        <iframe
          class="map"
          width="400"
          height="150"
          src="https://www.openstreetmap.org/export/embed.html?bbox=-122.4194,37.7749,-122.4174,37.7769&layer=mapnik"
        ></iframe>
        <div class="d-flex align-items-md-end">
          <p class="address-container">
            <strong>{{ restaurant.address.street }}</strong><br />
            {{ restaurant.address.city }}, {{ restaurant.address.province }}
            {{ restaurant.address.zipCode }}
          </p>
          <button class="white-button small-btn">Obtenir l'itineraire</button>
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
    <div class="line"></div>

  </div>
</template>

<style scoped>
.address-container {
  margin-right: 10px;
}

.map-container {
  margin-right: 20px;
}

.hours-item {
  margin-bottom: 5px; /* Adjust the bottom margin as needed */
  align-items: baseline;
}

.day {
  display: inline-block;
  width: 60px; /* Adjust the width as needed */
}

.hours {
  margin-left: 10px; /* Adjust the left margin as needed */
}

.hours-list {
  margin-top: 20px;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
}

.map {
  margin: 10px;
}

.edit {
  font-size: 1rem;
  margin-left: 400px;
  font-weight: bold;
}

.header {
  font-size: 1.2em;
  margin: 10px;
}

.line {
  border-bottom: 1px solid #ccc;
  margin: 20px 0;
}

.red-button {
  background-color: #ff0000; /* Red background */
  color: #ffffff; /* White text */
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  margin: 5px;
  cursor: pointer;
}

.white-button {
  background-color: #ffffff; /* White background */
  color: #333333; /* Dark text */
  padding: 10px 20px;
  border: 1px solid #333333; /* Dark border */
  border-radius: 5px;
  margin: 5px;
  cursor: pointer;
  font-weight: bold;
}

.small-btn {
  width: 190px;
  height: 40px;
}
</style>
