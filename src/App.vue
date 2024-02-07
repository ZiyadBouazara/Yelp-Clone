<template>
  <div id="app">
    <navigation></navigation>
    <div v-if="isHomePage">
      <div class="category-container floating-text">
        <p class="category-text_one text" style="margin-left: 100px;">Welcome to uFood,</p>
        <p class="category-text_princ text">Choose and</p>
        <p class="category-text_Enjoy text">Enjoy...</p>

        <div class="container">
          <base-sec-nav-bar></base-sec-nav-bar>
        </div>
      </div>
    </div>
    <router-view />
    <PageFooter />
  </div>
</template>

<script>
import { ref, watchEffect } from "vue";
import Navigation from "@/components/navBarComponent/Navigation.vue";
import PageFooter from "@/components/PageFooter.vue";
import BaseSecNavBar from "@/components/GeneralComponent/baseSecNavBar.vue";
import { useRoute } from "vue-router";

export default {
  components: {
    BaseSecNavBar,
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

.container {
  margin-top: -180px;
  margin-bottom: -180px;
}

.text {
  border: 2px solid #ff6666;
  padding: 10px;
  border-radius: 30px;
}

.category-container {
  margin-top: 30px;
}

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
</style>
