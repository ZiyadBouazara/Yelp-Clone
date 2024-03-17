<template>
  <div>
    <div class="scroll-container" title="Visited Restaurants">
      <div v-if="visits.length === 0" class="no-visited-restaurants">
        <p class="no-restaurants-message">You have no visited restaurants</p>
        <a class="link-to-home" href="#">Browse restaurants here</a>
      </div>

      <div
        v-for="visit in paginatedVisits"
        v-else
        id="visited-restaurant-card"
        :key="visit.restaurant_id"
      >
        <CardComponent
          :id="visit.restaurant_id"
          :picture="getRestaurantFromVisit(visit).pictures"
          :readOnly="true"
          :restaurant-genres="getRestaurantFromVisit(visit).genres"
          :restaurant-hour="getRestaurantFromVisit(visit).opening_hours"
          :restaurant-number="getRestaurantFromVisit(visit).tel"
          :restaurant-price-range="getRestaurantFromVisit(visit).price_range"
          :restaurant-rating="getRestaurantFromVisit(visit).rating"
          :restaurantName="getRestaurantFromVisit(visit).name"
        ></CardComponent>
      </div>
    </div>
    <div v-if="totalPages > 1" id="pagination" class="mt-4">
      <ul class="pagination justify-content-center">
        <li :class="{ disabled: currentPage === 1 }" class="page-item">
          <button class="page-link bg-danger text-white" @click="prevPage">
            Previous
          </button>
        </li>
        <li class="page-item disabled">
          <span class="page-link bg-danger text-white"
            >Page {{ currentPage }} of {{ totalPages }}</span
          >
        </li>
        <li :class="{ disabled: currentPage === totalPages }" class="page-item">
          <button class="page-link bg-danger text-white" @click="nextPage">
            Next
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import CardComponent from "@/components/generalComponent/BaseRestaurantCards.vue";

const store = useStore();

const props = defineProps({ visits: Array });

const getRestaurantFromVisit = (visit) => {
  const restaurant = store.getters.getRestaurantById(visit.restaurant_id);
  return restaurant || {};
};

const visitsPerPage = ref(10);
const currentPage = ref(1);

const uniqueVisits = computed(() => {
  const duplicateRestaurants = new Set();
  const unique = [];

  props.visits.forEach((visit) => {
    const visitId = visit.restaurant_id;
    if (!duplicateRestaurants.has(visitId)) {
      duplicateRestaurants.add(visitId);
      unique.push(visit);
    }
  });

  return unique;
});

const totalPages = computed(() => {
  return Math.ceil(uniqueVisits.value.length / visitsPerPage.value);
});

const paginatedVisits = computed(() => {
  const start = (currentPage.value - 1) * visitsPerPage.value;
  const end = start + visitsPerPage.value;
  return uniqueVisits.value.slice(start, end);
});

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};
</script>

<style scoped>
.scroll-container {
  max-width: 90vw;
  margin: auto;
  display: grid;
  grid-auto-flow: column;
  scroll-behavior: auto;
  grid-auto-columns: 20rem;
  overflow-y: hidden;
  overscroll-behavior-x: contain;
  scroll-snap-type: x mandatory;
  background-color: ghostwhite;
  border: 1px solid #ccc;
  border-radius: 10px;
}

.no-visited-restaurants {
  text-align: center;
}

p {
  font-size: 1rem;
  margin-bottom: 1rem;
  align-items: center;
}

a {
  color: crimson;
  text-decoration: none;
  font-weight: bold;
  transition: color 0.3s;
}

a:hover {
  color: #d94848;
  text-decoration: underline;
}

#visited-restaurant-card {
  height: 500px;
}

@media screen and (max-width: 576px) {
  .scroll-container {
    max-width: 20rem;
  }
}
</style>
