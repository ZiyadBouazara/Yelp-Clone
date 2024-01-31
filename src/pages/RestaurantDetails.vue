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
        <p class="edit">Suggest an edit <i class="fa-solid fa-pen"></i></p>
      </div>
      <div class="d-flex">
        <div class="map-container">
          <iframe
            class="map"
            width="350"
            height="150"
            src="https://www.openstreetmap.org/export/embed.html?bbox=-122.4194,37.7749,-122.4174,37.7769&layer=mapnik"
          ></iframe>
          <div class="d-flex align-items">
            <p class="address-container">
              <strong>{{ restaurant.address.street }}</strong
              ><br />
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
      <div class="side-container">
        <h1>Contactez-nous</h1>
        <div class="contact-info">
          <i class="fas fa-phone-alt"></i>
          <p>(418) 781-2511</p>
        </div>
        <div class="contact-info">
          <i class="fas fa-map-marker-alt"></i>
          <p>300 Rue Saint-Paul Suite 140 Québec, QC G1K 7R1</p>
        </div>
        <div class="contact-info">
          <i class="fas fa-envelope"></i>
          <p><a href="mailto:info@example.com">info@example.com</a></p>
        </div>
        <div class="contact-info">
          <i class="fas fa-comment-alt"></i>
          <p><a href="#">Message the business</a></p>
        </div>
        <div class="contact-info">
          <i class="fas fa-edit"></i>
          <p><a href="#">Suggest an edit</a></p>
        </div>
      </div>
    </div>
    <div class="line"></div>
  </div>
</template>

<style scoped>
.side-container {
  max-width: 300px;
  max-height: 480px;
  padding: 20px;
  background-color: #ffff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}
.address-container {
  margin-right: 10px;
  margin-left: 40px;
  font-size: 0.9rem;
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
  margin: 10px 10px 10px 40px;
}

.edit {
  font-size: 1rem;
  margin-left: 400px;
  font-weight: bold;
}

.header {
  font-size: 1.2em;
  margin: 10px 10px 10px 40px;
}

.line {
  border-bottom: 1px solid #ccc;
  margin: 20px 530px 20px 40px;
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
