<template>
  <div class="container">
    <div class="row floating-text">
      <div class="col" v-for="button in buttons" :key="button.id">
        <BaseButton :label="button.label" :icon="button.icon" />
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
.floating-text {
  text-align: center;
  font-size: 40px;
  animation: floatAnimation 2s infinite alternate;
}

@keyframes floatAnimation {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-10px);
  }
}

.text {
  border: 2px solid #ff6666;
  padding: 10px;
  border-radius: 30px;
}
</style>
