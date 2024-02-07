<template>
  <div
    class="card"
    style="margin-top: 40px; width: 18rem; margin-left: 50px"
    :class="{ 'border-danger': isHovered }"
  >
    <img
      :src="imageSrc"
      class="card-img-top rounded-start"
      alt="Card image"
      style="border-radius: 7px; border: black; height: 200px"
      @mouseover="isHovered = true"
      @mouseout="isHovered = false"
    />
    <div class="card-body" style="height: 250px">
      <h5 class="card-title">{{ restaurantName }}</h5>
      <p class="card-text">{{ restaurantDescription }}</p>
      <p class="card-text">
        <small class="text-body-secondary">{{ lastUpdated }}</small>
      </p>
      <p class="card-text" :style="{ color: restaurantHour ? 'green' : 'red' }">
        {{ restaurantHour ? "Open" : "Closed" }}
      </p>
      <button
        type="button"
        class="btn btn-outline-danger btn-lg floating"
        style="position: absolute; bottom: 0; right: 0; margin: 10px"
      >
        Order/Book A table
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardComponent",
  props: {
    imageSrc: {
      type: String,
      default: "https://placekitten.com/300/300",
    },
    restaurantName: {
      type: String,
      default: "Name of Restaurant",
    },
    restaurantDescription: {
      type: String,
      default:
        "This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",
    },
    lastUpdated: {
      type: String,
      default: "Last updated 3 mins ago",
    },
    restaurantHour: {
      type: Boolean,
      default: true,
    },
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
}

.card:hover {
  border-color: red;
}
</style>
