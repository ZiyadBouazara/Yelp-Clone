<!-- Layout.vue -->

<template>
  <div>
    <Navigation />
    <router-view />
    <PageFooter />
  </div>
</template>

<script>
import Navigation from "@/components/navBarComponent/Navigation.vue";
import PageFooter from "@/components/PageFooter.vue";

export default {
  components: {
    Navigation,
    PageFooter,
  },
};
</script>

<style></style>
