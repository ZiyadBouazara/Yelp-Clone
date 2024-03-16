<template>
  <div class="text-center">
    <div class="row bs-gutter-x-0" style="margin-top: 10px; margin-right: 0px">
      <div class="col-md-3">
        <filter-off-canvas :filter="genres"></filter-off-canvas>
      </div>
      <div class="col-md-6">
        <FormHome></FormHome>
      </div>
    </div>
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
      <button @click="previousPage" :disabled="currentPage === 1">
        Previous
      </button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">
        Next
      </button>
      <form @submit.prevent="goToPage">
        <label for="pageNumber">Go to Page:</label>
        <input
          type="number"
          id="pageNumber"
          v-model.number="inputPage"
          min="1"
          :max="totalPages"
          required
        />
        <button type="submit">Go</button>
      </form>
    </div>
  </div>
</template>

<script>
import FilterOffCanvas from "@/components/homePageComponent/FilterOffCanvas.vue";
import FormHome from "@/components/homePageComponent/FormHome.vue";
import CardComponent from "@/components/generalComponent/BaseRestaurantCards.vue";
import { EventBus } from "@/App.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    FilterOffCanvas,
    FormHome,
    CardComponent,
  },
  created() {
    this.$store.dispatch("fetchRestaurant");
    EventBus.emit("open-authentication-modal", this.openAuthenticationModal);
  },
  data() {
    return {
      currentPage: 1,
      itemsPerPage: 10,
      isModalVisible: false,
    };
  },
  computed: {
    filteredCardData() {
      const priceSelected = this.$store.getters.getPrice;
      const filterSelected = this.$store.getters.getGenres;
      const searchTerm = this.$store.getters.getSearchTerm;
      const searchGenre = this.$store.getters.getSearchTermGenre;

      let filteredRestaurants = this.restaurants.filter((cardItem) => {
        const hasMatchingName = cardItem.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        const hasMatchingGenre = cardItem.genres.some((genre) =>
          genre.toLowerCase().includes(searchGenre.toLowerCase()),
        );
        const filterSelectedd =
          filterSelected.length === 0 ||
          cardItem.genres.some((genre) =>
            filterSelected.some((selected) =>
              genre.toLowerCase().includes(selected.toLowerCase()),
            ),
          );
        if (!priceSelected) {
          return hasMatchingName && hasMatchingGenre && filterSelectedd;
        }

        const priceRangeSymbol = this.getPriceRangeSymbol(cardItem.price_range);
        const filteredPrice = priceRangeSymbol === priceSelected;

        return (
          hasMatchingName &&
          hasMatchingGenre &&
          filterSelectedd &&
          filteredPrice
        );
      });
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return filteredRestaurants.slice(startIndex, endIndex);
    },

    ...mapGetters(["getRestaurants"]),
    restaurants() {
      return this.getRestaurants;
    },
    ...mapGetters(["getUsers"]),
    users() {
      return this.getUsers;
    },
    totalPages() {
      // return Math.ceil(this.filteredCardData.length / this.itemsPerPage);
      return Math.ceil(130 / this.itemsPerPage);
    },
  },
  methods: {
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    goToPage() {
      const pageNumber = parseInt(this.inputPage);
      if (pageNumber >= 1 && pageNumber <= this.totalPages) {
        this.currentPage = pageNumber;
      } else {
        alert("Please enter a valid page number.");
      }
    },
    getPriceRangeSymbol(priceRange) {
      switch (priceRange) {
        case 1:
          return "$";
        case 2:
          return "$$";
        case 3:
          return "$$$";
        default:
          return " ";
      }
    },
    openAuthenticationModal() {
      this.isModalVisible = true;
    },
    getRestaurant(restaurant) {
      const restaurantId = restaurant.id;
      return this.$store.getters.getRestaurantById(restaurantId);
    },
  },
};
</script>

<style scoped>
.card-wrapper {
  margin: 0 auto;
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

.row {
  --bs-gutter-x: 0;
}
</style>
