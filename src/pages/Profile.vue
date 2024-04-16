<template>
  <div v-if="loggedInUser" class="container-fluid mt-5">
    <div class="row justify-content-center">
      <div class="col-12 d-flex justify-content-center">
        <ProfileCard></ProfileCard>
      </div>
      <div
        class="row justify-content-center my-3 visited-restaurants-row"
        style="text-align: start"
      >
        <h4 class="visited-restaurants-title">Visited restaurants</h4>
        <div class="col-12 d-flex justify-content-center">
          <VisitedRestaurants :visits="visits"></VisitedRestaurants>
        </div>
        <div class="col-12 d-flex justify-content-center">
          <Suspense>
            <SectionFavorite />
          </Suspense>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import ProfileCard from "@/components/profile/ProfileCard.vue";
import VisitedRestaurants from "@/components/profile/VisitedRestaurants.vue";
import SectionFavorite from "@/components/profile/SectionFavorite.vue";
import { computed } from "vue";
import store from "@/store";

const loggedInUser = computed(() => store.getters.getLoggedInUser);
const visits = computed(() => store.getters.getVisits);
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
