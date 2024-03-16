<script setup>
const props = defineProps({
  restaurant: Object,
});
</script>

<template>
  <div class="about-commerce">
    <strong class="header">Other restaurant pictures</strong>
    <div v-if="restaurant?.pictures" class="row">
      <div
        v-for="(imageUrl, index) in restaurant.pictures.slice(4, 10)"
        :key="index"
        class="col-md-4"
        style="padding-left: 0; padding-right: 0"
      >
        <div style="position: relative">
          <img :src="imageUrl" alt="Restaurant Image" class="img-fluid mb-3" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
