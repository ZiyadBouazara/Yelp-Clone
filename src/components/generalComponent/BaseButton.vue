<template>
  <div :class="{ 'border-danger': isHovered }" class="button-container">
    <button type="button" class="btn button">
      <font-awesome-icon :icon="icon" class="icon" />
      {{ label }}
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
import { icon, library } from "@fortawesome/fontawesome-svg-core";

library.add(faPizzaSlice, faCoffee, faHamburger, faWineBottle, faGlobeAfrica);

export default {
  name: "BaseButton",
  data() {
    return {
      isHovered: false,
    };
  },
  components: {
    FontAwesomeIcon,
  },
  props: {
    label: String,
    icon: Array,
  },
};
</script>

<style scoped>
.button-container {
  display: flex;
  justify-content: space-between;
}

.button {
  padding: 10px;
  text-align: center;
  width: 100px;
  height: 140px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  transition: border-color 0.3s ease;
  background-color: ghostwhite;
  border-color: transparent;
  box-shadow: rgba(235, 235, 235, 1);
}

.icon {
  font-size: 20px;
  margin-bottom: 10px;
}

.button:hover {
  border-color: rgba(0, 0, 0, 0.1);
}
</style>
