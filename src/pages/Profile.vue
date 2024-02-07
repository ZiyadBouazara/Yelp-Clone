<template>
  <div class="container-fluid">
    <div class="row">
      <!-- Left Column: User Card -->
      <div class="col-md-4 d-flex justify-content-center">
        <!-- User Card Component -->
        <ProfileCard
          :location="location"
          :name="name"
          :score="score"
        ></ProfileCard>
      </div>
      <!-- Right Column: Visited Restaurants -->
      <div class="col-md-8">
        <h2 class="text-center mb-4">Visited Restaurants</h2>
        <VisitedRestaurants
          :visited-restaurants="visitedRestaurants"
        ></VisitedRestaurants>
      </div>
    </div>
  </div>
</template>

<script>
import "@/styles/global.css";
import ProfileCard from "@/components/profileComponent/ProfileCard.vue";
import VisitedRestaurants from "@/components/profileComponent/VisitedRestaurants.vue";

export default {
  components: {
    VisitedRestaurants,
    ProfileCard,
  },
  data() {
    return {
      name: "Bob Washington",
      location: "Montreal, QC",
      score: 75,
      visitedRestaurants: [
        {
          name: "Restaurant A",
          location: "City X",
          visits: 10,
          imageSrc: "https://placekitten.com/300/300",
        },
        {
          name: "Restaurant A",
          location: "City X",
          visits: 10,
          imageSrc: "https://placekitten.com/300/300",
        },
        {
          name: "Restaurant A",
          location: "City X",
          visits: 10,
          imageSrc: "https://placekitten.com/300/300",
        },
        {
          name: "Restaurant A",
          location: "City X",
          visits: 10,
          imageSrc: "https://placekitten.com/300/300",
        },
        {
          name: "Restaurant A",
          location: "City X",
          visits: 10,
          imageSrc: "https://placekitten.com/300/300",
        },
        {
          name: "Restaurant A",
          location: "City X",
          visits: 10,
          imageSrc: "https://placekitten.com/300/300",
        },
      ],
    };
  },
};
</script>
<style scoped>
.container-fluid {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
