<template>
  <div class="d-flex mx-auto flex-column align-items-center">
    <form class="d-flex flex-column align-items-center mb-3">
      <input
        class="form-control custom-search-input mb-2"
        v-model="searchTerm"
        @input="handleInput"
        placeholder="Restaurant's Name..."
        aria-label="Search"
        style="border-radius: 30px; height: 40px"
      />
      <input
        class="form-control custom-search-input mb-2"
        v-model="searchGenre"
        @input="handleInput"
        placeholder="Genres Preference..."
        aria-label="Search"
        style="border-radius: 30px; height: 40px"
      />
    </form>
  </div>
</template>

<script>
export default {
  name: "SearchForm",
  data() {
    return {
      searchTerm: "",
      searchGenre: "",
      selectedRestaurant: "",
    };
  },
  methods: {
    handleInput() {
      console.log("User typed:", this.searchTerm);
      console.log("User typed:", this.searchGenre);
      this.$store.dispatch("updateSearchTerm", this.searchTerm);
      this.$store.dispatch("updateSearchTermGenre", this.searchGenre);
    },
  },
};
</script>

<style scoped>
.custom-search-input {
  width: 100%;
  max-width: 300px;
  height: 40px;
}

@media (min-width: 768px) {
  .d-flex.flex-column.align-items-center {
    flex-direction: row;
  }
  .custom-search-input {
    margin-right: 5px;
    margin-bottom: 0;
  }
  .btn {
    margin-left: 5px;
  }
}
</style>
