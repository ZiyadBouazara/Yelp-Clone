<template>
  <div class="text-center">
    <div class="row" style="margin-top: 10px">
      <div class="col-md-4">
        <filter-off-canvas :filter="genres"></filter-off-canvas>
      </div>
      <div class="col-md-4">
        <FormHome></FormHome>
      </div>
      <div class="col-md-4">
        <ListMapSwitch :get-list="getList" :get-map="getMap"></ListMapSwitch>
      </div>
    </div>
    <div v-if="showMap">
      <div class="map-container" id="map"></div>
    </div>
    <div v-else>
      <div class="row restaurant-cards">
        <div
          v-for="(restaurant, index) in filteredCardData"
          :key="index"
          class="col-12 col-md-6 col-lg-4 mb-4"
        >
          <div class="card-wrapper">
            <CardComponent
              :id="restaurant.id"
              :picture="getRestaurant(restaurant).pictures"
              :restaurantName="getRestaurant(restaurant).name"
              :restaurant-hour="getRestaurant(restaurant).opening_hours"
              :restaurant-number="getRestaurant(restaurant).tel"
              :restaurant-genres="getRestaurant(restaurant).genres"
              :restaurant-price-range="getRestaurant(restaurant).price_range"
              :restaurant-rating="getRestaurant(restaurant).rating"
            ></CardComponent>
          </div>
        </div>
      </div>
      <div class="pagination">
        <button
          class="btn btn-outline-danger btn-lg buttonBas"
          type="button"
          @click="previousPage"
          :disabled="currentPage === 1"
        >
          Previous
        </button>
        <span class="buttonBas textBas" style="margin-top: 13px">
          Page {{ currentPage }} of {{ totalPages }}</span
        >
        <button
          class="btn btn-outline-danger btn-lg buttonBas"
          type="button"
          @click="nextPage"
          :disabled="currentPage === totalPages"
        >
          Next
        </button>
        <form @submit.prevent="goToPage">
          <label class="buttonBas textBas" for="pageNumber">Go to Page:</label>
          <input
            type="number"
            id="pageNumber"
            v-model.number="inputPage"
            min="1"
            :max="totalPages"
            required
            style="margin-right: 10px"
          />
          <button class="btn btn-outline-danger btn-lg" type="submit">
            Go
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import FilterOffCanvas from "@/components/homePageComponent/FilterOffCanvas.vue";
import FormHome from "@/components/homePageComponent/FormHome.vue";
import CardComponent from "@/components/generalComponent/BaseRestaurantCards.vue";
import { EventBus } from "@/App.vue";
import { homePageMethods } from "@/javascript/pages/homePage/homePageMethods";
import { homePageComputed } from "@/javascript/pages/homePage/homePageComputed";
import ListMapSwitch from "@/components/homePageComponent/ListMapSwitchButtons.vue";
import "leaflet/dist/leaflet.css";
import leaflet from "leaflet";

export default {
  components: {
    ListMapSwitch,
    FilterOffCanvas,
    FormHome,
    CardComponent,
  },
  created() {
    EventBus.emit("open-authentication-modal", this.openAuthenticationModal);
  },
  mounted() {
    // this.getLocation();
    // this.initMarkerLocation();
  },
  data() {
    return {
      inputPage: 0,
      currentPage: 1,
      itemsPerPage: 10,
      isModalVisible: false,
      showMap: false,
      map: null,
      latitude: 0,
      longitude: 0,
      markerLocations: [],
    };
  },
  computed: {
    ...homePageComputed,
  },
  methods: {
    ...homePageMethods,
    getMap() {
      this.showMap = true;
      this.initMap();
    },
    getList() {
      this.showMap = false;
    },
    getLocation() {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.latitude = position.coords.latitude;
            this.longitude = position.coords.longitude;
          },
          (error) => {
            console.error("Error getting geolocation:", error);
          },
        );
      }
    },
    initMarkerLocation() {
      const restaurants = this.$store.getters.getRestaurants;
      restaurants.forEach((restaurant) => {
        const coordinates = restaurant.location.coordinates;
        this.markerLocations.push(coordinates);
      });
    },
    async initMap() {
      try {
        const leaflet = await import("leaflet");
        this.getLocation();
        this.map = leaflet
          .map("map")
          .setView([this.latitude, this.longitude], 4);

        leaflet
          .tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: "© OpenStreetMap contributors",
          })
          .addTo(this.map);
        const customIcon = leaflet.divIcon({
          className: "custom-leaflet-div-icon",
          html: '<i class="fas fa-map-marker-alt fa-3x text-danger"></i>',
          iconAnchor: [18, 36],
        });
        this.initMarkerLocation();
        console.log(this.markerLocations);
        this.markerLocations.forEach((location) => {
          leaflet.marker(location, { icon: customIcon }).addTo(this.map);
        });
      } catch (error) {
        console.error("Error loading Leaflet:", error);
      }
    },
  },
};
</script>

<style scoped>
.textBas {
  display: inline-block;
  margin-right: 10px;
}

.buttonBas {
  margin-left: 10px;
  font-family: "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0;
  line-height: 20px;
  color: rgba(45, 46, 47, 1);
}

.card-wrapper {
  margin: 0 auto;
}

.map-container {
  width: 100%;
  height: calc(100vh - 50px);
}

@media (min-width: 768px) {
  .col-md-6 .card-wrapper {
    margin: 0;
  }
}

@media (min-width: 992px) {
  .col-lg-4 .card-wrapper {
    margin: 0;
  }
}
</style>
