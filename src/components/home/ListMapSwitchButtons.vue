<script setup>
const props = defineProps({
  getList: Function,
  getMap: Function,
});
</script>

<template>
  <div class="btn-group">
    <button class="btn btn-outline-danger" @click="getList">List</button>
    <button class="btn btn-outline-danger" @click="getMap">Map</button>
  </div>
</template>

<style scoped></style>
