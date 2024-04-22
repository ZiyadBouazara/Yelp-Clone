<template>
  <div v-if="loggedInUser" class="container-fluid mt-5">
    <div class="row mt-3">
      <div class="col-12 d-flex justify-content-center">
        <ProfileCard :user="loggedInUser" />
      </div>
    </div>
    <div class="row mt-3 visited-restaurants-row">
      <h4 class="visited-restaurants-title">Visited restaurants</h4>
      <div class="col-12 d-flex justify-content-center">
        <VisitedRestaurants :visits="visits" />
      </div>
    </div>

    <div class="row mt-3">
      <div class="col-12 d-flex justify-content-center">
        <Suspense>
          <SectionFavorite />
        </Suspense>
      </div>
    </div>
  </div>
</template>

<script setup>
import ProfileCard from "@/components/profile/profile-card/ProfileCard.vue";
import VisitedRestaurants from "@/components/profile/VisitedRestaurants.vue";
import SectionFavorite from "@/components/profile/SectionFavorite.vue";
import { useStore } from "vuex";
import { ref, computed, onMounted } from "vue";

const store = useStore();

const followers = ref([]);
const following = ref([]);

const loggedInUser = computed(() => store.getters.getLoggedInUser);
const visits = computed(() => store.getters.getVisits);
console.log("user visits in user profile: ", visits);

onMounted(async () => {
  followers.value = await store.dispatch("fetchFollowersForUser");
  following.value = await store.dispatch("fetchFollowingForUser");
});
</script>
<style scoped>
.container-fluid {
  width: 100%;
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
