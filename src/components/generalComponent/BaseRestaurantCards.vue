<template>
  <div
    :class="{ 'border-danger': isHovered }"
    class="card custom-card"
    style="margin-top: 0"
  >
    <img
      :src="imageSrc"
      alt="Card image"
      class="card-img-top rounded-start"
      style="border-radius: 7px; border: black; height: 200px"
    />
    <div class="card-body" style="height: 250px; text-align: center">
      <h5 class="card-title">{{ restaurantName }}</h5>
      <p class="card-text">{{ restaurantDescription }}</p>
      <p class="card-text">
      </p>
      <p :style="{ color: restaurantHour ? 'green' : 'red' }" class="card-text">
        {{ restaurantHour ? "Open" : "Closed" }}
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
    imageSrc: String,
    restaurantName: String,
    restaurantDescription: String,
    restaurantHour: Boolean,
    // filter: {
    //   type: Array,
    //   // eslint-disable-next-line vue/require-valid-default-prop
    //   default: [],
    // },
  },
  data() {
    return {
      isHovered: false,
    };
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
