<template>
  <div
    :class="{ 'border-danger': isHovered }"
    class="card custom-card"
    style="margin-top: 0"
  >
    <div class="imageDiv" style="position: relative">
      <img
        :src="currentPicture"
        alt="Restaurant image"
        class="card-img-top rounded-start"
        style="border-radius: 7px; border: black; height: 200px"
      />
      <button
        class="carousel-control-prev"
        data-bs-slide="prev"
        data-bs-target="#carouselExample"
        style="
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          left: 5px;
        "
        type="button"
        @click="decrementeIndex()"
      >
        <span aria-hidden="false" class="carousel-control-prev-icon"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        data-bs-slide="next"
        data-bs-target="#carouselExample"
        style="
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          right: 5px;
        "
        type="button"
        @click="incrementeIndex()"
      >
        <span aria-hidden="false" class="carousel-control-next-icon"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
    <div class="card-body" style="height: 250px; text-align: left">
      <h5 class="card-title restaurant-name">{{ restaurantName }}</h5>
      <div class="hours-container">
        <p
          :style="{ color: isRestaurantOpen() ? 'green' : 'red' }"
          class="card-text"
        >
          {{ isRestaurantOpen() ? "Open" : "Closed" }}
        </p>
        <p class="card-text" style="margin-left: 5px; margin-bottom: 16px">
          {{ getDisplayHours() }}
        </p>
      </div>
      <p class="card-text">
        <span
          v-for="(genre, index) in restaurantGenres"
          :key="index"
          class="badge badge-inline"
          style="background-color: lightgrey; color: black; margin-right: 3px"
        >
          {{ genre }}
          {{ index < restaurantGenres.length - 1 ? " " : "" }}
        </span>
      </p>
      <p
        class="card-text badge badge-inline"
        style="background-color: lightgrey; color: black"
      >
        {{ displayPriceRangeSymbol }}
      </p>
      <div class="rating-container">
        <p class="card-text">
          <span
            v-for="(number, index) in displayRatingSymbol"
            :key="index"
            :style="{
              backgroundColor: getColorBasedOnNumber(getRatingFloor),
              marginRight: '3px',
            }"
            class="badge"
          >
            <font-awesome-icon
              v-if="number === 'star'"
              :icon="['fas', 'star']"
              class="icon"
            />
          </span>
        </p>
        <p class="noteNumeric">{{ getRatingFloor }}</p>
      </div>
      <div class="button">
        <router-link v-bind:to="'/restaurant/' + id">
          <button
            class="btn btn-outline-danger btn-lg"
            style="position: absolute; bottom: 0; right: 0; margin: 10px"
            type="button"
          >
            <font-awesome-icon :icon="['fas', 'arrow-right']" class="icon" />
          </button>
        </router-link>
        <div v-if="readOnly">
          <button
            :data-bs-target="`#consultModal${id}`"
            class="btn btn-outline-danger btn-lg"
            data-bs-toggle="modal"
            style="position: absolute; bottom: 0; left: 0; margin: 10px"
            type="button"
          >
            <i class="fa-solid fa-eye"></i> View visit details
          </button>
          <ConsultVisit :restaurant-id="id" />
        </div>
        <div v-else>
          <button
            :data-bs-target="`#visitModal${id}`"
            :disabled="!loggedInUser"
            class="btn btn-outline-danger btn-lg"
            data-bs-toggle="modal"
            style="position: absolute; bottom: 0; left: 0; margin: 10px"
            type="button"
          >
            <i class="fa-regular fa-star"></i> Write a review
          </button>
          <AddVisit :restaurant-id="id" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faArrowRight, faStar } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import AddVisit from "@/components/visitComponent/AddVisit.vue";
import { baseRestaurantCardsMethods } from "@/javascript/components/baseRestaurantsCards/baseRestaurantCardsMethods";
import { baseRestaurantCardsComputed } from "@/javascript/components/baseRestaurantsCards/baseRestaurantCardsComputed";
import ConsultVisit from "@/components/visitComponent/ConsultVisit.vue";

library.add(faArrowRight);
library.add(faStar);
export default {
  name: "CardComponent",
  components: { ConsultVisit, AddVisit, FontAwesomeIcon },
  props: {
    id: String,
    picture: Array,
    restaurantName: String,
    restaurantHour: Object,
    restaurantNumber: String,
    restaurantGenres: Array,
    restaurantPriceRange: Number,
    restaurantRating: Number,
    readOnly: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isHovered: false,
      imageIndex: 0,
    };
  },
  computed: {
    ...baseRestaurantCardsComputed,
  },
  methods: {
    ...baseRestaurantCardsMethods,
  },
};
</script>

<style scoped>
.restaurant-name {
  max-height: 2em;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.noteNumeric {
  margin-left: 10px;
  font-family: "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0;
  line-height: 20px;
  color: rgba(45, 46, 47, 1);
  text-align: left;
}

.card {
  transition: border-color 0.3s ease;
  background-color: ghostwhite;
  border-color: transparent;
  box-shadow: rgba(235, 235, 235, 1);
}

.card:hover {
  border-color: rgba(0, 0, 0, 0.1);
}

.custom-card {
  padding: 20px;
}

.rating-container {
  display: flex;
  align-items: center;
}

.hours-container {
  display: flex;
  align-items: center;
}
</style>
