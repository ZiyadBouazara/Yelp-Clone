<template>
  <div class="d-flex mx-auto flex-column align-items-center">
    <form class="d-flex flex-column align-items-center mb-3">
      <input
        class="form-control custom-search-input mb-2"
        v-model="searchTerm"
        placeholder="Restaurant's Name..."
        aria-label="Search"
        style="border-radius: 30px; height: 40px"
      />
      <input
        class="form-control custom-search-input mb-2"
        type="search"
        placeholder="Dining Preference..."
        aria-label="Search"
        style="border-radius: 30px; height: 40px"
      />
      <button
        type="button"
        class="btn btn-outline-danger"
        style="height: 40px"
        @click="search"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-bag-heart"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0M14 14V5H2v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1M8 7.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132"
          />
        </svg>
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: "SearchForm",
  data() {
    return {
      searchTerm: "",
      selectedRestaurant: "",
    };
  },
  props: {
    restaurantData: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    search() {
      console.log("lol");
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
