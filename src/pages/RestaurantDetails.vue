<script setup>
import { onMounted, ref } from "vue";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

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

const mapIframeSrc = ref(
  "https://www.openstreetmap.org/export/embed.html?bbox=-122.4194,37.7749,-122.4174,37.7769&layer=mapnik",
);
const map = ref(null);

const initMap = async () => {
  try {
    const leaflet = await import("leaflet");
    map.value = leaflet.map("map").setView([37.775, -122.418], 15);

    leaflet
      .tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      })
      .addTo(map.value);

    const restaurantLocation = [37.775, -122.418];

    const customIcon = leaflet.divIcon({
      className: "custom-leaflet-div-icon",
      html: '<i class="fas fa-map-marker-alt fa-3x text-danger"></i>',
      iconAnchor: [18, 36], // point of the icon that corresponds to the marker's location
    });

    leaflet.marker(restaurantLocation, { icon: customIcon }).addTo(map.value);
  } catch (error) {
    console.error("Error loading Leaflet:", error);
  }
};

const getDirections = () => {
  window.open(
    "https://www.openstreetmap.org/directions?engine=osrm_car&route=" +
      restaurant.value.address.city +
      ",%20" +
      restaurant.value.address.street,
  );
};

onMounted(() => {
  initMap();
});
</script>

<template>
  <div>
    <div class="main-container">
      <button class="red-button">
        <i class="fa-regular fa-star"></i> Write a review
      </button>
      <button class="white-button dark-text">
        <i class="fa-solid fa-camera-retro"></i> Ajouter une photo
      </button>
      <button class="white-button dark-text">
        <i class="fa-regular fa-share-from-square"></i> Partager
      </button>
      <button class="white-button dark-text">
        <i class="fa-regular fa-bookmark"></i> Sauvegarder
      </button>
    </div>

    <div class="line"></div>
    <div class="d-flex align-items-baseline">
      <strong class="header">Emplacement & horaires</strong>
      <a class="edit">Suggest an edit <i class="fa-solid fa-pen"></i></a>
    </div>

    <div class="d-flex flex-row">
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
          <button class="white-button small-btn" @click="getDirections">
            Obtenir l'itineraire
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
      <div class="side-container">
        <div class="contact-info">
          <p>{{ restaurant.phone }}</p>
          <i class="fas fa-phone-alt"></i>
        </div>
        <div class="small-line"></div>
        <div class="d-flex justify-content-between">
          <a class="side-container-link">Obtenir un itineraire</a>
          <i class="fas fa-map-marker-alt"></i>
        </div>
        <div class="d-flex align-items-end">
          <p class="side-container-address">
            {{ restaurant.address.street }}
            {{ restaurant.address.city }}, <br />{{
              restaurant.address.province
            }}
            {{ restaurant.address.zipCode }}
          </p>
        </div>
        <div class="small-line"></div>
        <div class="contact-info">
          <p><a class="side-container-link">Message the business</a></p>
          <i class="fas fa-envelope"></i>
        </div>
        <div class="align-items-center">
          <p>
            <button class="white-button side-container-btn">
              Suggest an edit <i class="fas fa-edit"></i>
            </button>
          </p>
        </div>
      </div>
    </div>
    <div class="line"></div>
  </div>
</template>

<style scoped>
@media (max-width: 768px) {
  .d-flex {
    flex-direction: column;
  }
}

.side-container-btn {
  width: 300px;
  height: 50px;
}

.side-container-link {
  font-weight: bold;
  color: cadetblue;
  text-decoration: none;
}

.side-container-link:hover {
  text-decoration: underline;
}

.side-container-address {
  font-size: 0.9rem;
}
.contact-info {
  display: flex;
  justify-content: space-between;
}

.main-container {
}

.side-container {
  width: 800px;
  height: 320px;
  padding: 20px;
  background-color: #ffff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  margin-right: 150px;
}
.address-container {
  margin-right: 10px;
  margin-left: 40px;
  font-size: 0.9rem;
}

.map-container {
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

.edit {
  text-decoration: none;
  color: #333;
  cursor: pointer;
  font-size: 1rem;
  margin-left: 400px;
  font-weight: bold;
}

.edit:hover {
  text-decoration: underline;
}

.header {
  font-size: 1.2em;
  margin: 10px 10px 10px 40px;
}

.line {
  border-bottom: 1px solid #ccc;
  margin: 20px 530px 20px 40px;
}
.small-line {
  border-bottom: 1px solid #ccc;
  margin: 5px 20px 20px 10px;
}

.red-button {
  background-color: #ff0000; /* Red background */
  color: #ffffff; /* White text */
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  margin: 20px 5px 5px 40px;
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
