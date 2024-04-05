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
    <div v-if="showMap" class="map-container">
      <iframe class="map-iframe" :src="mapIframeSrc"></iframe>
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
      mapIframeSrc:
        "https://www.openstreetmap.org/export/embed.html?bbox=-122.4194,37.7749,-122.4174,37.7769&layer=mapnik",
    };
  },
  computed: {
    ...homePageComputed,
  },
  methods: {
    ...homePageMethods,
    getMap() {
      this.showMap = true;
    },
    getList() {
      this.showMap = false;
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

.map-iframe {
  width: 100%;
  height: 100%;
  border: none; /* Optional: Remove iframe border */
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
