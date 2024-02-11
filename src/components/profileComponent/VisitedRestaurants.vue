<template>
  <div class="scroll-container" title="Visited Restaurants">
    <div v-if="visitedRestaurants.length === 0" class="no-visited-restaurants">
      <p class="no-restaurants-message">You have no visited restaurants</p>
      <a class="link-to-home" href="#">Browse restaurants here</a>
    </div>

    <div
      v-for="(restaurant, index) in visitedRestaurants"
      v-else
      :key="index"
      class="visited-restaurant-card"
    >
      <CardComponent
        :imageSrc="restaurant.imageSrc"
        :restaurantDescription="'My visits : ' + restaurant.visits"
        :restaurantName="restaurant.name"
      ></CardComponent>
    </div>
  </div>
</template>

<script>
import CardComponent from "@/components/generalComponent/BaseRestaurantCards.vue";

export default {
  name: "VisitedRestaurants",
  components: { CardComponent },
  props: {
    visitedRestaurants: Array,
  },
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

.visited-restaurant-card {
  height: 500px;
}

@media screen and (max-width: 576px) {
  .scroll-container {
    max-width: 20rem;
  }
}
</style>
