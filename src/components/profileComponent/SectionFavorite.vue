<template>
  <div class="scroll-container" title="Favorites">
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

    <div>
      <div class="col-12 d-flex justify-content-center">
        <div class="favorite-lists">
          <div
            v-for="favoriteList in getUserFavoritesList"
            :key="favoriteList.id"
            @click="handleClickedList(favoriteList)"
            class="favorite-pill"
          >
            <h5>{{ favoriteList.name }}</h5>
          </div>
        </div>
      </div>
      <!--    <form class="buttons-control">
      <input class="list-name" placeholder="List Name" v-model="listName" />
      <button class="btn btn-outline-danger" @click="addFavoriteList">
        Create Favorite
      </button>
    </form>-->
      <div class="favorites-section">
        <div
          id="favorites-card"
          v-for="favorite in userFavorites"
          :key="favorite.id"
          class="favorite-item"
        >
          <CardComponent
            :imageSrc="favorite.restaurants.imageSrc"
            :restaurantDescription="favorite.restaurants.description"
            :restaurantName="favorite.restaurants.name"
          ></CardComponent>
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
const userFavorites = ref([]);
const loggedInUser = computed(() => store.getters.getLoggedInUser);
const userId = computed(() => loggedInUser.value?.id);
const userEmail = computed(() => loggedInUser.value?.email);

const userFavoritesIsNotEmpty = computed(
  () => store.getters.getUserFavorites.length > 0,
);
//const userFavorites = computed(() => store.getters.getUserFavorites);
const getUserFavoritesList = computed(() => store.getters.getUserFavorites);

const addFavoriteList = () => {
  if (listName.value && userEmail) {
    store.dispatch("createNewFavoritesList", {
      listName: listName.value,
      ownerEmail: userEmail,
    });
  } else {
    console.error("List Name or user Email missing!");
  }
};

const handleClickedList = (favoriteList) => {
  console.log("entree");
  if (favoriteList.restaurants.length > 0) {
    const userFavoriteRestaurants = favoriteList.restaurants.value;
    console.log("Voici les restos de cette liste: " + userFavoriteRestaurants);
    favoriteList.restaurants.forEach((restaurant) => {
      console.log(restaurant.id);
    });
  } else {
    console.log("Aucun resto dans cette liste de fav!");
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

.favorite-lists {
  display: inline-flex;
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
  background-color: #ced4da;
  border-radius: 10px;
  padding: 5px 10px;
  margin: 5px;
}

.favorite-pill:hover {
  background-color: #ff6666;
}

@media screen and (max-width: 576px) {
  .scroll-container {
    max-width: 20rem;
  }
}
</style>
