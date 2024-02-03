<template>
  <div class="d-flex mx-auto">
    <form class="d-flex">
      <input
        class="form-control me-2"
        type="search"
        placeholder="Search"
        aria-label="Search"
      />
      <button
        type="button"
        class="btn btn-outline-danger"
        style="margin-left: 5px"
      >
        Search
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: "SearchForm",
};
</script>
