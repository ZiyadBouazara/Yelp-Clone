<template>
  <div class="container">
    <div class="row">
      <div class="col" v-for="button in buttons" :key="button.id">
        <BaseButton
          :label="button.label"
          :icon="button.icon"
          @mouseout="isHovered = false"
          :style="{
            borderBottom:
              index !== buttons.length - 1 ? '1px solid #ddd' : 'none',
            borderRadius: index === 0 ? '30px' : 'none',
          }"
        />
      </div>
    </div>
  </div>
</template>

<script>
import BaseButton from "./BaseButton.vue";

export default {
  name: "BaseSecNavBar",
  components: {
    BaseButton,
  },
  data() {
    return {
      isHovered: false,
      buttons: [
        { id: 1, label: "Italian", icon: ["fas", "pizza-slice"] },
        { id: 2, label: "Bar", icon: ["fas", "wine-bottle"] },
        { id: 3, label: "Coffee", icon: ["fas", "coffee"] },
        { id: 4, label: "African", icon: ["fas", "globe-africa"] },
        { id: 5, label: "Poutine", icon: ["fas", "hamburger"] },
      ],
    };
  },
};
</script>

<style>

</style>
