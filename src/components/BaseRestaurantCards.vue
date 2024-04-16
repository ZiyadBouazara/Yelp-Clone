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
        @click="decrementIndex()"
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
        @click="incrementIndex()"
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
            <i class="fa-solid fa-eye"></i> View visits
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
        <div>
          <button
            :data-bs-target="`#modalAddFavorite${id}`"
            :disabled="!loggedInUser"
            class="btn btn-outline-danger btn-lg"
            data-bs-toggle="modal"
            style="position: absolute; bottom: 0; right: 60px; margin: 10px"
            type="button"
          >
            <i class="fa-regular fa-bookmark"></i>
          </button>
          <AddFavorite :restaurantId="id" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faArrowRight, faStar } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import AddVisit from "@/components/visit/AddVisit.vue";
import { utils } from "@/javascript/utils";
import ConsultVisit from "@/components/visit/ConsultVisit.vue";
import AddFavorite from "@/components/AddFavorite.vue";

library.add(faArrowRight);
library.add(faStar);
export default {
  name: "CardComponent",
  components: { AddFavorite, ConsultVisit, AddVisit, FontAwesomeIcon },
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
    getRatingFloor() {
      if (
        typeof this.restaurantRating === "number" &&
        !isNaN(this.restaurantRating)
      ) {
        return Number(this.restaurantRating.toFixed(1));
      } else {
        return 0;
      }
    },
    displayPriceRangeSymbol() {
      const priceRange = this.restaurantPriceRange;
      return "$".repeat(priceRange);
    },
    displayRatingSymbol() {
      const array = Math.round(this.restaurantRating);
      return Array.from({ length: array }, () => "star");
    },
    currentPicture() {
      if (this.picture && this.picture.length > 0) {
        return this.picture[this.imageIndex % this.picture.length];
      } else {
        return null;
      }
    },
    loggedInUser() {
      return this.$store.state.loggedInUser;
    },
  },
  methods: {
    ...utils,
    getColorBasedOnNumber(number) {
      if (number >= 1 && number < 2) {
        return "rgb(255, 204, 75)";
      } else if (number >= 2 && number < 3) {
        return "rgb(255, 135, 66)";
      } else if (number >= 3) {
        return "rgb(251, 67, 60)";
      }
    },
    getDisplayHours() {
      const currentDay = this.getCurrentDay();
      if (
        !this.restaurantHour ||
        !this.restaurantHour[currentDay] ||
        this.restaurantHour[currentDay] === "null"
      ) {
        return "today";
      }
      const [openingHour, closingHour] =
        this.restaurantHour[currentDay].split("-");
      return this.isRestaurantOpen()
        ? "until " + closingHour
        : "until " + openingHour;
    },
    incrementIndex() {
      this.imageIndex = (this.imageIndex + 1) % this.picture.length;
      this.$store.dispatch("updateImageIndex", this.imageIndex);
    },
    decrementIndex() {
      this.imageIndex =
        (this.imageIndex - 1 + this.picture.length) % this.picture.length;
      this.$store.dispatch("updateImageIndex", this.imageIndex);
    },
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
