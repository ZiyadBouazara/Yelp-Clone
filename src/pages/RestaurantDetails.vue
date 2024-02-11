<script setup>
import { onMounted, onBeforeUnmount, ref } from "vue";
import "leaflet/dist/leaflet.css";

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

const map = ref(null);

const restaurantImages = ref([
  "https://cdn.pixabay.com/photo/2017/01/26/02/06/platter-2009590_1280.jpg",
  "https://cdn.pixabay.com/photo/2017/06/06/22/46/mediterranean-cuisine-2378758_1280.jpg",
  "https://cdn.pixabay.com/photo/2017/02/15/10/57/pizza-2068272_1280.jpg",
]);

const initMap = async () => {
  try {
    const leaflet = await import("leaflet");
    map.value = leaflet.map("map").setView([46.7799, -71.2772], 15);

    leaflet
      .tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      })
      .addTo(map.value);

    const restaurantLocation = [46.7799, -71.2772];

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
  const destination = "46.7799,-71.2772"; // Coordinates for the destination address
  const url = `https://www.openstreetmap.org/directions?engine=osrm_car&to=${destination}`;
  window.open(url);
};

// const isSticky = ref(false);
//
// const handleScroll = () => {
//   const topDistance = 450;
//   isSticky.value = window.scrollY >= topDistance;
// };

const description = ref(
  "hamburgers, poutines, vegetarians and vegan options. burgers gourmets,\n" +
    "        poutines, options végétariennes et Vgan.",
);

onMounted(() => {
  initMap();
  // window.addEventListener("scroll", handleScroll);
});
//
// onBeforeUnmount(() => {
//   window.removeEventListener("scroll", handleScroll);
// });
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
        <div style="position: relative">
          <img :src="imageUrl" alt="Restaurant Image" class="img-fluid mb-3" />
          <div class="lg-screen-title">
            <span class="restaurant-title" v-if="index === 0">Resto des pd</span>
            <div class="restaurant-rating" v-if="index === 0">
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-regular fa-star"></i>
              <span style="color: white; margin-left: 5px">4.0</span>
            </div>
            <div v-if="index === 0" class="restaurant-genre-price">
              <p>
                <span
                  >$$ <span style="vertical-align: 0.3em">.</span> Italian,
                  Poutine</span
                >
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="main-container">
      <div class="mobile-title">
        <header class="header">Resto des pd</header>
        <div class="header">
        <i class="fa-solid fa-star "></i>
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
        <i class="fa-regular fa-star"></i>
        <span style="margin-left: 5px">4.0</span>
          <p>
              <span
              >$$ <span style="vertical-align: 0.3em">.</span> Italian,
                Poutine</span
              >
          </p>
        </div>
      </div>
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

      <div
        id="sideContainer"
        :class="['side-container', isSticky ? 'sticky' : '']"
      >
        <div class="contact-info">
          <p>{{ restaurant.phone }}</p>
          <i class="fas fa-phone-alt"></i>
        </div>
        <div class="small-line"></div>
        <div class="d-flex justify-content-between">
          <a class="side-container-link">Get Directions</a>
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
    <div class="about-commerce">
      <strong class="header">About the Business</strong>
      <p class="description">{{ description }}</p>
    </div>
    <div class="line"></div>
  </div>
</template>

<style scoped>

.restaurant-genre-price {
  position: absolute;
  color: white;
  bottom: 8%;
  left: 10%;
  padding: 0.2em;
  font-weight: bold;
  font-size: 2vw;
}

.restaurant-rating {
  position: absolute;
  color: orange;
  bottom: 20%;
  left: 7%;
  padding: 0.5em;
  font-weight: bold;
  font-size: 2.5vw;
}

.restaurant-title {
  position: absolute;
  color: white;
  bottom: 30%;
  left: 5%;
  padding: 0.5em;
  font-weight: bold;
  font-size: 4vw;
}

.contact-info {
  display: flex;
  justify-content: space-between;
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

.side-container {
  width: 400px;
  height: 320px;
  padding: 20px;
  background-color: Ghostwhite;
  border-radius: 10px;
  margin-right: 40px;
  margin-top: 40px;
  box-shadow: 0 0 10px rgba(255, 0, 0, 0.5);
  position: absolute;
  right: 1.5%;
  transform: translateY(-50%);
}

.sticky {
  position: fixed;
  top: 20%;
  transform: translateY(-50%);
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

.description {
  margin: 10px 10px 30px 40px;
}

@media (max-width: 1439px) {
  .side-container {
    display: none;
  }
}

@media (min-width: 768px) {
  .flex-row {
    display: flex;
    flex-direction: row;
  }
}

@media (max-width: 768px) {
  .img-fluid {
    width: 100%;
    height: auto;
  }
}

@media (min-width: 576px) {
  .mobile-title {
    display: none;
  }
}

@media (max-width: 576px) {
  .lg-screen-title {
    display: none;
  }
}
</style>
