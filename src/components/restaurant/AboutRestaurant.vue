<script setup>
const props = defineProps({
  restaurant: Object,
});
</script>

<template>
  <div class="header">
    <strong class="header">Other restaurant photos</strong>
    <div v-if="restaurant?.pictures" class="row">
      <div
        v-for="(imageUrl, index) in restaurant.pictures.slice(4, 10)"
        :key="index"
        class="col-md-4"
        style="margin-top: 40px"
      >
        <div style="position: relative">
          <img :src="imageUrl" alt="Restaurant Image" class="img-fluid mb-3" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@media (max-width: 576px) {
  .header {
    display: none;
  }
}
</style>
