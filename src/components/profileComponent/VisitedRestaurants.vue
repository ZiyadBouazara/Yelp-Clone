<template>
  <div class="scroll-container" title="Visited Restaurants">
    <div class="scrollable-list">
      <ul>
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
  max-height: 300px;
  overflow-y: auto;
  justify-content: center;
}

.scrollable-list {
  padding-right: 15px;
}
</style>
