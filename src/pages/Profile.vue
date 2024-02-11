<template>
  <div class="container-fluid mt-5">
    <div class="row justify-content-center">
      <div class="col-12 d-flex justify-content-center">
        <ProfileCard
          :location="location"
          :name="name"
          :score="score"
        ></ProfileCard>
      </div>
      <div
        class="row justify-content-center my-3 visited-restaurants-row"
        style="text-align: start"
      >
        <h4 class="visited-restaurants-title">Visited restaurants</h4>
        <div class="col-12 d-flex justify-content-center">
          <VisitedRestaurants
            :visited-restaurants="visitedRestaurants"
          ></VisitedRestaurants>
        </div>
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
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

h4 {
  font-family: "Poppins", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 24px;
  font-weight: 700;
}

.visited-restaurants-title {
  margin-left: 80px;
}
</style>
