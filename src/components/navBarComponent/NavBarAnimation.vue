<template>
  <div class="category-container">
    <div class="container">
      <base-sec-nav-bar></base-sec-nav-bar>
    </div>
    <div class="text-container">
      <p class="category-text_one text_1 float-text">Welcome to uFood,</p>
      <p class="category-text_one text_2 float-text">Choose and</p>
      <p class="category-text_Enjoy text_3 float-text">Enjoy...</p>
    </div>
  </div>
</template>

<script>
import BaseSecNavBar from "@/components/generalComponent/baseSecNavBar.vue";

export default {
  name: "NavBarAnimation",
  components: { BaseSecNavBar },
};
</script>

<style>
.container {
  margin-bottom: 0;
  max-height: 200px;
}

.text-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.text_1,
.text_2,
.text_3 {
  border: 3px solid #ff6666;
  padding: 20px;
  border-radius: 50px;
  font-size: 30px;
  font-weight: bold;
  animation: floatAnimation 2s infinite alternate;
}

.text_3 {
  font-size: 50px;
}

@keyframes floatAnimation {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-10px);
  }
}

.category-container {
  border-bottom: 3px solid rgba(143, 126, 126, 0.1);
}
</style>
