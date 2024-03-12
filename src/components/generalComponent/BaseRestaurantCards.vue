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
        type="button"
        data-bs-target="#carouselExample"
        data-bs-slide="prev"
        style="
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          left: 5px;
        "
        @click="decrementeIndex()"
      >
        <span class="carousel-control-prev-icon" aria-hidden="false"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#carouselExample"
        data-bs-slide="next"
        style="
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          right: 5px;
        "
        @click="incrementeIndex()"
      >
        <span class="carousel-control-next-icon" aria-hidden="false"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
    <div class="card-body" style="height: 250px; text-align: center">
      <h5 class="card-title">{{ restaurantName }}</h5>
      <p class="card-text"></p>
      <p
        :style="{ color: isRestaurantOpen() ? 'green' : 'red' }"
        class="card-text"
      >
        {{ isRestaurantOpen() ? "Open" : "Closed" }}
      </p>
      <p class="card-text">
        <span
          v-for="(genre, index) in restaurantGenres"
          class="badge text-bg-light badge-inline"
          :key="index"
        >
          {{ genre }}
          {{ index < restaurantGenres.length - 1 ? " " : "" }}
        </span>
      </p>
      <p class="card-text badge text-bg-light badge-inline">
        {{ displayPriceRangeSymbol }}
      </p>
      <p class="card-text">
        {{ restaurantNumber }}
      </p>
      <router-link to="/restaurant/id"
        ><button
          class="btn btn-outline-danger btn-lg"
          style="position: absolute; bottom: 0; right: 0; margin: 10px"
          type="button"
        >
          <font-awesome-icon
            :icon="['fas', 'arrow-right']"
            class="icon"
          /></button
      ></router-link>
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

library.add(faArrowRight);
export default {
  name: "CardComponent",
  components: { FontAwesomeIcon },
  props: {
    picture: Array,
    restaurantName: String,
    restaurantHour: Object,
    restaurantNumber: String,
    restaurantGenres: Array,
    restaurantPriceRange: Number,
  },
  data() {
    return {
      isHovered: false,
      imageIndex: 0,
    };
  },
  computed: {
    displayPriceRangeSymbol() {
      const priceRange = this.restaurantPriceRange;
      return "$".repeat(priceRange);
    },
    currentPicture() {
      if (this.picture && this.picture.length > 0) {
        return this.picture[this.imageIndex % this.picture.length];
      } else {
        return null;
      }
    },
  },
  methods: {
    isRestaurantOpen() {
      const currentDay = this.getCurrentDay();
      const currentTime = `${new Date().getHours()}:${new Date().getMinutes()}`;

      console.log("currentDay:", currentDay);
      console.log("this.restaurantHour:", this.restaurantHour);

      if (this.restaurantHour[currentDay]) {
        const [openingHour, closingHour] =
          this.restaurantHour[currentDay].split("-");
        console.log("openingHour:", openingHour);
        console.log("closingHour:", closingHour);

        const isOpen =
          this.compareTimes(currentTime, openingHour) >= 0 &&
          this.compareTimes(currentTime, closingHour) <= 0;
        console.log("bool:", isOpen);
        return isOpen;
      }

      return false;
    },
    compareTimes(time1, time2) {
      const [hours1, minutes1] = time1.split(":").map(Number);
      const [hours2, minutes2] = time2.split(":").map(Number);

      if (hours1 !== hours2) {
        return hours1 - hours2;
      } else {
        return minutes1 - minutes2;
      }
    },
    getCurrentDay() {
      const days = [
        "sunday",
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
      ];
      const currentDayIndex = new Date().getDay();
      return days[currentDayIndex];
    },
    incrementeIndex() {
      this.imageIndex = (this.imageIndex + 1) % this.picture.length;
      this.$store.dispatch("updateImageIndex", this.imageIndex);
    },
    decrementeIndex() {
      this.imageIndex =
        (this.imageIndex - 1 + this.picture.length) % this.picture.length;
      this.$store.dispatch("updateImageIndex", this.imageIndex);
    },
  },
};
</script>

<style scoped>
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
</style>
