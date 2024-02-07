<template>
  <div>
    <a
      v-for="(link, index) in links"
      :key="index"
      class="nav-item"
      :class="{
        'red-link': !isHovered[index],
        'hovered-link': isHovered[index],
      }"
      @mousexover="handleHover(index, true)"
      @mouseout="handleHover(index, false)"
      href="#"
    >
      {{ link }}
    </a>
  </div>
</template>

<script>
export default {
  props: ["links", "isHovered"],
  methods: {
    handleHover(index, value) {
      this.$emit("hover", index, value);
    },
  },
};
</script>

<style scoped>
.nav-item {
  display: inline-block;
}
</style>
