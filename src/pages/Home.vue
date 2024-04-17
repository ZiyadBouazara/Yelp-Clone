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
      <div v-if="loading">
        <div
          class="spinner-border spinner-border-lg text-primary"
          role="status"
          style="width: 6rem; height: 6rem; margin: 10% auto auto"
        ></div>
        <p>Loading map...</p>
      </div>
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
import FilterOffCanvas from "@/components/home/FilterOffCanvas.vue";
import FormHome from "@/components/home/FormHome.vue";
import CardComponent from "@/components/BaseRestaurantCards.vue";
import { EventBus } from "@/App.vue";
import { homePageMethods } from "@/javascript/home/homePageMethods";
import { homePageComputed } from "@/javascript/home/HomePageComputed";
import ListMapSwitch from "@/components/home/ListMapSwitchButtons.vue";
import "leaflet/dist/leaflet.css";

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
      loading: true,
    };
  },
  computed: {
    ...homePageComputed,
  },
  methods: {
    ...homePageMethods,
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
