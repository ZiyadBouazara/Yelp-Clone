<template>
  <div id="app">
    <navigation></navigation>
    <div v-if="isHomePage">
      <NavBarAnimation></NavBarAnimation>
    </div>
    <router-view />
    <PageFooter />
  </div>
</template>

<script>
import { ref, watchEffect } from "vue";
import Navigation from "@/pages/Navigation.vue";
import PageFooter from "@/pages/PageFooter.vue";
import { useRoute } from "vue-router";
import NavBarAnimation from "@/components/navBarComponent/NavBarAnimation.vue";

export default {
  components: {
    NavBarAnimation,
    Navigation,
    PageFooter,
  },
  setup() {
    const isHomePage = ref(false);
    const route = useRoute();

    watchEffect(() => {
      isHomePage.value = route.path.toLowerCase() === "/";
    });

    return {
      isHomePage,
    };
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
