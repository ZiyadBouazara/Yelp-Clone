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
import NavBarAnimation from "@/components/navBarComponent/NavBarAnimation.vue";
import { useRoute } from "vue-router";
import mitt from "mitt";
import store from "@/store";

export const EventBus = mitt();

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

    watchEffect(() => {
      const isLoggedIn = store.state.loggedInUser;
      if (isLoggedIn) {
        store.dispatch("fetchUsers");
        store.dispatch("fetchUserFavorites");
        store.dispatch("getTotalValue");
        store.dispatch("fetchRestaurant");
        store.dispatch("fetchUsers");
        store.dispatch("fetchVisitsForLoggedInUser");
      }
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
