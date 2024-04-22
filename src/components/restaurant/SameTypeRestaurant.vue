<template>
  <div class="scroll-container">
    <div class="similar-restaurants" v-if="restaurants">
      <div class="title justify-content-center">
        <h5 id="title">Similar restaurants</h5>
      </div>
      <div
        style="margin-top: 10px"
        id="similar-restaurant-card"
        v-for="restaurant in restaurants"
        :key="restaurant.id"
        class="resto"
      >
        <CardComponent
          :id="restaurant.id"
          :picture="restaurant.pictures"
          :readOnly="true"
          :restaurant-genres="restaurant.genres"
          :restaurant-hour="restaurant.opening_hours"
          :restaurant-number="restaurant.tel"
          :restaurant-price-range="restaurant.price_range"
          :restaurant-rating="restaurant.rating"
          :restaurantName="restaurant.name"
        ></CardComponent>
      </div>
    </div>
  </div>
</template>

<script setup>
import CardComponent from "@/components/BaseRestaurantCards.vue";
import { ref, provide, onMounted } from "vue";
import { useStore } from "vuex";

const store = useStore();
const loading = ref(false);
const props = defineProps({
  restaurants: {
    type: Array,
    required: true,
  },
});
const restaurants = props.restaurants;

console.log("similar restaurants", restaurants.length);
console.log("restos similaires: ", restaurants);
</script>

<style scoped>
.scroll-container {
  max-width: 90vw;
  min-width: 320px;
  margin: auto;
  overflow-x: auto;
  white-space: nowrap;
  background-color: #f0ad4e;
  border-radius: 10px;
  padding: 10px;
}

#title {
  font-weight: bold;
}

.card {
  margin-right: 10px;
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

.similar-restaurants {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  width: auto;
}

.resto {
  flex: 0 0 320px;
  scroll-snap-align: start;
  margin-right: 10px;
}

@media screen and (max-width: 576px) {
  .scroll-container {
    max-width: 20rem;
  }
}
</style>
