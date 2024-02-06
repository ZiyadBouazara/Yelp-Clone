<!-- Layout.vue -->

<template>
  <div id="app">
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

<style>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ghostwhite;
}
</style>
