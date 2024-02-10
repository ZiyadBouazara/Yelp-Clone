<template>
  <div class="scroll-container" title="Visited Restaurants">
    <div
      v-for="(restaurant, index) in visitedRestaurants"
      :key="index"
      class="visited-restaurant-card"
    >
      <CardComponent
        :imageSrc="restaurant.imageSrc"
        :restaurantDescription="restaurant.visits"
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
  --spacer: 5%;
  max-width: 75%;
  display: grid;
  gap: var(--spacer);
  grid-auto-flow: column;
  scroll-behavior: auto;
  grid-auto-columns: 15%;
  overflow-y: auto;
  overscroll-behavior-x: contain;
  scroll-snap-type: x mandatory;
}
</style>
