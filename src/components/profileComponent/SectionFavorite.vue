<template>
  <div class="col-12 scroll-container" title="Favorites">
    <h4 class="col-12 justify-content-start" id="title">My Favorites</h4>
    <div v-if="!userFavoritesIsNotEmpty">
      <div
        :class="{ 'border-danger': isHovered }"
        class="card custom-card"
        style="margin-top: 0"
      >
        <div class="card-body" style="height: 250px; text-align: center">
          <h5 class="card-title justify-content-center">
            You have no favorites yet
          </h5>
        </div>
      </div>
    </div>

    <div v-else>
      <h6 class="justify-content-start">My Lists</h6>
      <div class="col-12 d-flex justify-content-center">
        <div
          v-for="favoriteList in getUserFavoritesList"
          :key="favoriteList.id"
          @click="chosenFavList(favoriteList)"
          class="favorite-pill"
        >
          <h5>{{ favoriteList.name }}</h5>
        </div>
      </div>
      <!--      <form class="buttons-control">
        <input class="list-name" placeholder="List Name" v-model="listName" />
        <button class="btn btn-outline-danger" @click="addFavoriteList">
          Create Favorite
        </button>
      </form>
      &ndash;&gt;-->
      <div class="favorites-section" v-if="displayFavoritesSection">
        <div
          style="margin-top: 10px"
          id="favorites-card"
          v-for="restaurant in userFavoriteRestaurants"
          :key="restaurant.id"
          class="favorite-item"
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
          <button
            class="btn btn-outline-danger"
            @click="deleteResto(favoriteList, restaurant)"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { useStore } from "vuex";
import CardComponent from "@/components/generalComponent/BaseRestaurantCards.vue";
import data from "bootstrap/js/src/dom/data";

const listName = ref("");
const isHovered = false;
const store = useStore();
const displayFavoritesSection = ref(false);
const userFavorites = ref([]);
const loggedInUser = computed(() => store.getters.getLoggedInUser);
const userId = computed(() => loggedInUser.value?.id);
const userEmail = computed(() => loggedInUser.value?.email);
const userFavoriteRestaurants = ref([]);
const currentFavoriteList = ref("");

let restaurantPicture = "";
let readOnly = false;
let restaurantGenres = [];
let restaurantHour = {};
let restaurantNumber = "";
let restaurantRating = 0;
let restaurantName = "";
let restaurantPriceRange = 0;

const userFavoritesIsNotEmpty = computed(
  () => store.getters.getUserFavorites.length > 0,
);
//const userFavorites = computed(() => store.getters.getUserFavorites);
const getUserFavoritesList = computed(() => store.getters.getUserFavorites);

const addFavoriteList = async () => {
  try {
    const listData = {
      name: "My super favorite list",
      owner: "didi@didi.com",
    };
    const response = await store.dispatch("createFavoriteList", listData);
    console.log("New favorite list created:", response);
  } catch (error) {
    console.error("Error creating favorite list:", error);
  }
};

const getRestaurantById = (restaurantId) => {
  return store.getters.getRestaurantById(restaurantId);
};

const chosenFavList = async (favoriteList) => {
  displayFavoritesSection.value = false;
  if (favoriteList.restaurants && favoriteList.restaurants.length > 0) {
    userFavoriteRestaurants.value = [];
    for (const resto of favoriteList.restaurants) {
      const restaurant = await getRestaurantById(resto.id);
      userFavoriteRestaurants.value.push(restaurant);
    }
    displayFavoritesSection.value = true;
  } else {
    userFavoriteRestaurants.value = [];
  }
  currentFavoriteList.value = favoriteList.name;
};

const deleteResto = async (favoriteList, restaurant) => {
  try {
    await store.dispatch("deleteRestaurantFromFavoriteList", {
      favoriteListId: favoriteList.id,
      restaurantId: restaurant.id,
    });
  } catch (error) {
    console.error("Error deleting restaurant from favorite list:", error);
  }
};

watch(userId, async (newUserId) => {
  if (newUserId !== null) {
    try {
      await store.dispatch("fetchUserFavorites", newUserId);
    } catch (error) {
      console.error("Error fetching user favorites:", error);
    }
  }
});

onMounted(async () => {
  if (userId.value !== null) {
    try {
      await store.dispatch("fetchUserFavorites", userId.value);
    } catch (error) {
      console.error("Error fetching user favorites:", error);
    }
  }
});
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

.favorites-section {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  width: auto;
}

.favorite-item {
  flex: 0 0 320px;
  scroll-snap-align: start;
  margin-right: 10px;
}

.favorite-pill {
  background-color: ivory;
  border-radius: 10px;
  padding: 5px 10px;
  margin: 5px;
}

.favorite-pill:hover {
  background-color: #cccccc;
}

@media screen and (max-width: 576px) {
  .scroll-container {
    max-width: 20rem;
  }
}
</style>
