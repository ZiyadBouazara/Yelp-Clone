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
import mitt from "mitt";

export const EventBus = mitt();
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
  created() {
    EventBus.emit("open-authentication-modal", this.openAuthenticationModal);
    this.$store.dispatch("fetchUserFavorites");
    this.$store.dispatch("getTotalValue");
    this.$store.dispatch("fetchRestaurant");
    this.$store.dispatch("fetchUsers").then(() => {
      this.$store.dispatch("login").then(() => {
        this.$store.dispatch("fetchVisitsForLoggedInUser");
      });
    });
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
