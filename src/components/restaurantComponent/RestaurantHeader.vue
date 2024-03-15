<script setup>
const props = defineProps({
  images: Array,
  restaurant: Object,
});
</script>

<template>
  <div class="row">
    <div
      v-for="(imageUrl, index) in images"
      :key="index"
      class="col-md-4"
      style="padding-left: 0; padding-right: 0"
    >
      <div style="position: relative">
        <img :src="imageUrl" alt="Restaurant Image" class="img-fluid mb-3" />
        <div class="lg-screen-title">
          <span class="restaurant-title" v-if="index === 0">{{
            restaurant.name
          }}</span>
          <div class="restaurant-rating" v-if="index === 0">
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-regular fa-star"></i>
            <span style="color: white; margin-left: 5px">4.0</span>
          </div>
          <div v-if="index === 0" class="restaurant-genre-price">
            <p>
              <span
                >$$ <span style="vertical-align: 0.3em">.</span> Italian,
                Poutine</span
              >
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--  <div class="mobile-title">-->
  <!--    <header class="header">Resto des pd</header>-->
  <!--    <div class="header">-->
  <!--      <i class="fa-solid fa-star"></i>-->
  <!--      <i class="fa-solid fa-star"></i>-->
  <!--      <i class="fa-solid fa-star"></i>-->
  <!--      <i class="fa-solid fa-star"></i>-->
  <!--      <i class="fa-regular fa-star"></i>-->
  <!--      <span style="margin-left: 5px">4.0</span>-->
  <!--      <p>-->
  <!--            <span-->
  <!--            >$$ <span style="vertical-align: 0.3em">.</span> Italian,-->
  <!--              Poutine</span-->
  <!--            >-->
  <!--      </p>-->
  <!--    </div>-->
  <!--  </div>-->
</template>

<style scoped>
.restaurant-genre-price {
  position: absolute;
  color: white;
  bottom: 8%;
  left: 10%;
  padding: 0.2em;
  font-weight: bold;
  font-size: 2vw;
}

.restaurant-rating {
  position: absolute;
  color: orange;
  bottom: 20%;
  left: 7%;
  padding: 0.5em;
  font-weight: bold;
  font-size: 2.5vw;
}

.restaurant-title {
  position: absolute;
  color: white;
  bottom: 30%;
  left: 5%;
  padding: 0.5em;
  font-weight: bold;
  font-size: 4vw;
}

@media (max-width: 576px) {
  .lg-screen-title {
    display: none;
  }
}

@media (max-width: 768px) {
  .img-fluid {
    width: 100%;
    height: auto;
  }
}
</style>
