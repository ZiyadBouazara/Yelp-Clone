<template>
  <div v-if="user" class="container-fluid mt-5">
    <div class="row mt-3">
      <div class="col-12 d-flex justify-content-center">
        <ProfileCard :user="user" />
      </div>
    </div>
    <div class="row mt-3 friends-management justify-content-center">
      <button
        @click="handleFollowingUser"
        :class="{
          'btn btn-outline-danger follow-button': !isFollowing,
          'btn btn-outline-danger active unfollow-button': isFollowing,
        }"
      >
        <span v-if="isFollowing">Unfollow</span>
        <span v-else>Follow {{ user.name }}</span>
      </button>
    </div>
    <div class="row mt-3 visited-restaurants-row">
      <h4 class="visited-restaurants-title">Visited restaurants</h4>
      <div class="col-12 d-flex justify-content-center">
        <VisitedRestaurants :visits="visits" />
      </div>
    </div>
  </div>
</template>

<script setup>
import ProfileCard from "@/components/profile/profile-card/ProfileCard.vue";
import VisitedRestaurants from "@/components/profile/VisitedRestaurants.vue";
import { useStore } from "vuex";
import { computed, onMounted, ref } from "vue";

const store = useStore();
const isFollowing = ref(false);
const props = defineProps({ userId: { type: String, required: true } });

const user = computed(() => store.getters.getUserById(props.userId));

const visits = computed(() => store.getters.getVisitsByUserId(props.userId));
console.log("visits: ", visits);

const handleFollowingUser = async () => {
  if (!isFollowing.value) {
    await store.dispatch("followAUser", props.userId);
    isFollowing.value = true;
  } else {
    await store.dispatch("unfollowAUser", props.userId);
    isFollowing.value = false;
  }
};

const selectedUserFollowers = computed(() =>
  store.getters.getFriendFollowers(props.userId),
);
const selectedUserFollowings = computed(() =>
  store.getters.getFriendFollowings(props.userId),
);

onMounted(async () => {
  console.log("user prop: ", props.userId);
  await store.getters.getUserById(props.userId);
  console.log("user: ", store.getters.getUserById(props.userId));
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

.follow-button {
  display: flex;
  justify-content: center;
  width: 20%;
}

.unfollow-button {
  display: flex;
  justify-content: center;
  width: 20%;
}
</style>
