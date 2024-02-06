<template>
  <div>
    <button type="button" class="btn btn-danger button">
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
.button {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
  width: 100px;
  height: 140px;
  margin: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.2);
}

.icon {
  font-size: 20px;
  margin-bottom: 10px;
}
</style>
