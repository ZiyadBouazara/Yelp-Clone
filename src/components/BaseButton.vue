<template>
  <div :class="{ 'border-danger': isHovered }" class="button-container">
    <button type="button" class="btn button">
      <div class="icon-wrapper">
        <font-awesome-icon :icon="icon" class="icon" />
      </div>
      <div class="label">{{ label }}</div>
    </button>
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faPizzaSlice,
  faCoffee,
  faHamburger,
  faWineBottle,
  faGlobeAfrica,
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

library.add(faPizzaSlice, faCoffee, faHamburger, faWineBottle, faGlobeAfrica);

export default {
  name: "BaseButton",
  data() {
    return {
      isHovered: false,
      isVisible: true, // Initially visible
    };
  },
  components: {
    FontAwesomeIcon,
  },
  props: {
    label: String,
    icon: Array,
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

<style scoped>
.button-container {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}

.button {
  padding: 10px;
  text-align: center;
  width: 100px;
  max-width: 140px;
  height: 140px;
  border-radius: 30px;
  transition: border-color 0.3s ease;
  background-color: ghostwhite;
  border-color: transparent;
  box-shadow: rgba(235, 235, 235, 1);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.icon-wrapper {
  margin-bottom: 10px;
}

.icon {
  font-size: 20px;
}

.label {
  font-size: 16px;
}

.button:hover {
  background-color: rgba(235, 235, 235, 1);
}
</style>
