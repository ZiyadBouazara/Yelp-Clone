<template>
  <div class="container">
    <div class="row">
      <div class="col" v-for="button in buttons" :key="button.id">
        <BaseButton :label="button.label" :icon="button.icon" />
      </div>
    </div>
  </div>
</template>

<script>
import BaseButton from "./baseButton.vue";

export default {
  name: "BaseSecNavBar",
  components: {
    BaseButton,
  },
  data() {
    return {
      buttons: [
        { id: 1, label: "Italian", icon: ["fas", "pizza-slice"] },
        { id: 2, label: "Bar", icon: ["fas", "wine-bottle"] },
        { id: 3, label: "Coffee", icon: ["fas", "coffee"] },
        { id: 4, label: "Moroccan", icon: ["fas", "globe-africa"] },
        { id: 5, label: "Poutine", icon: ["fas", "hamburger"] },
      ],
    };
  },
};
</script>

<style scoped>
/* Styles for the BaseButton component can be applied here */
</style>
