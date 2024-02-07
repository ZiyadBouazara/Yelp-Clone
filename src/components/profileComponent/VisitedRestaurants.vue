<template>
  <div class="scroll-container" title="Visited Restaurants">
    <div class="scrollable-list">
      <ul class="horizontal-scroll">
        <li
          v-for="(restaurant, index) in visitedRestaurants"
          :key="index"
          class="list-group-item"
        >
          <CardComponent
            :imageSrc="restaurant.imageSrc"
            :restaurantDescription="restaurant.visits"
            :restaurantName="restaurant.name"
          ></CardComponent>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import CardComponent from "@/components/generalComponent/baseRestaurantCards.vue";

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
  max-height: 400px; /* Set the maximum height */
  width: 100%; /* Set the width to 100% for responsiveness */
  overflow-x: auto; /* Enable horizontal scrolling */
  overflow-y: hidden; /* Hide vertical scrollbar */
}

.scrollable-list {
  padding-right: 15px;
}

.horizontal-scroll {
  display: flex;
  flex-wrap: nowrap;
  gap: 10px;
  padding: 10px;
  margin: 0;
  list-style-type: none;
}

.list-group-item {
  flex: 0 0 auto;
  width: 200px; /* Set the width of each card */
}
</style>
