<template>
  <div class="container">
    <div class="row">
      <div
        class="col-6 col-md-4 col-lg"
        v-for="(button, index) in buttons"
        :key="button.id"
      >
        <BaseButton
          v-if="isVisible"
          :label="button.label"
          :icon="button.icon"
          @mouseout="isHovered = false"
          :style="{
            borderBottom: index !== buttons.length ? '1px solid #ddd' : 'none',
            borderRadius:
              index === 0
                ? '30px 0 0 30px'
                : index === buttons.length - 1
                  ? '0 30px 30px 0'
                  : 'none',
            marginBottom: '10px',
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
      isVisible: true,
      buttons: [
        { id: 1, label: "Italian", icon: ["fas", "pizza-slice"] },
        { id: 2, label: "Bar", icon: ["fas", "wine-bottle"] },
        { id: 3, label: "Coffee", icon: ["fas", "coffee"] },
        { id: 4, label: "African", icon: ["fas", "globe-africa"] },
        { id: 5, label: "Poutine", icon: ["fas", "hamburger"] },
      ],
    };
  },
  mounted() {
    this.checkVisibility();
    window.addEventListener("resize", this.checkVisibility);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.checkVisibility);
  },
  methods: {
    checkVisibility() {
      this.isVisible = window.innerWidth >= 999;
    },
  },
};
</script>

<style></style>
