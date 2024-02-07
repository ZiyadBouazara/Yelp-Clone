<script setup>
import { onMounted, onBeforeUnmount, ref } from "vue";
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

const restaurantImages = ref([
  "https://cdn.pixabay.com/photo/2017/01/26/02/06/platter-2009590_1280.jpg",
  "https://cdn.pixabay.com/photo/2017/06/06/22/46/mediterranean-cuisine-2378758_1280.jpg",
  "https://cdn.pixabay.com/photo/2017/02/15/10/57/pizza-2068272_1280.jpg",
]);

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
      iconAnchor: [18, 36],
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

const isSticky = ref(false);

const handleScroll = () => {
  const topDistance = 400;

  isSticky.value = window.scrollY >= topDistance;
};

onMounted(() => {
  initMap();
  window.addEventListener("scroll", handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <div>
    <div class="row">
      <div
        v-for="(imageUrl, index) in restaurantImages"
        :key="index"
        class="col-md-4"
        style="padding-left: 0; padding-right: 0"
      >
        <img :src="imageUrl" alt="Restaurant Image" class="img-fluid mb-3" />
      </div>
    </div>
    <div class="main-container">
      <button class="btn btn-outline-danger btn-lg" style="margin-left: 40px">
        <i class="fa-regular fa-star"></i> Write a review
      </button>
      <button class="btn btn-outline-dark btn-lg" style="margin-left: 5px">
        <i class="fa-solid fa-camera-retro"></i> Ajouter une photo
      </button>
      <button class="btn btn-outline-dark btn-lg" style="margin-left: 5px">
        <i class="fa-regular fa-share-from-square"></i> Partager
      </button>
      <button class="btn btn-outline-dark btn-lg" style="margin-left: 5px">
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
          <button class="btn btn-outline-dark btn-lg" @click="getDirections">
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

      <div
        :class="['side-container', isSticky ? 'sticky' : '']"
        ref="sideContainer"
      >
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
            <button
              class="btn btn-outline-dark"
              style="width: 300px; height: 50px"
            >
              Suggest an edit <i class="fas fa-edit"></i>
            </button>
          </p>
        </div>
      </div>
    </div>
    <div class="line"></div>
    <div class="line"></div>
    <div class="line"></div>
    <div class="line"></div>
    <div class="line"></div>
    <div class="line"></div>
    <div class="line"></div>
    <div class="line"></div>
    <div class="line"></div>
    <div class="line"></div>
    <div class="line"></div>
    <div class="line"></div>
    <div class="line"></div>
    <div class="line"></div>
    <div class="line"></div>
    <div class="line"></div>
    <div class="line"></div>
    <div class="line"></div>
    <div class="line"></div>
    <div class="line"></div>
    <div class="line"></div>
    <div class="line"></div>
    <div class="line"></div>
    <div class="line"></div>
    <div class="line"></div>
    <div class="line"></div>
    <div class="line"></div>
    <div class="line"></div>
    <div class="line"></div>
    <div class="line"></div>
    <div class="line"></div>
    <div class="line"></div>
    <div class="line"></div>
    d
  </div>
</template>

<style scoped>
.cropped-image {
  width: 100%;
  height: 200px; /* Adjust height as needed */
  object-fit: cover; /* Crop the image to cover its container */
}

@media (max-width: 768px) {
  .d-flex {
    flex-direction: column;
  }
}

.side-container-link {
  font-weight: bold;
  color: #dc3545;
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

.side-container {
  width: 400px;
  height: 320px;
  padding: 20px;
  background-color: Ghostwhite;
  border-radius: 10px;
  margin-right: 40px;
  box-shadow: 0 0 10px rgba(255, 0, 0, 0.5);
  position: absolute;
  top: 70%;
  right: 20px;
  transform: translateY(-50%);
}

.sticky {
  position: fixed;
  top: 22%;
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
</style>
