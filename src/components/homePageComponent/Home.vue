<template>
  <div class="container text-center">
    <div class="row">
      <div class="col-md-3">
        <filter-off-canvas></filter-off-canvas>
      </div>
      <div class="col-md-9">
        <Form-Home></Form-Home>
      </div>
    </div>
  </div>
</template>

<script>
import "@/styles/global.css";
import FilterOffCanvas from "@/components/homePageComponent/FilterOffCanvas.vue";
import FormHome from "./FormHome.vue";
import ProfileInformation from "@/components/generalComponent/ProfileInformation.vue";

export default {
  components: {
    FilterOffCanvas,
    FormHome,
  },
  data() {
    return {
      valueFilter: ["apple", "orange"],
      value: null,
      isRestaurantOpen: true,
      closingHour: "22:00",
      openingHour: "08:00",
      isProfileInformationVisible: false,
    };
  },
};
</script>
