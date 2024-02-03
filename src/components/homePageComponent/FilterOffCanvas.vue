<template>
  <div>
    <button
      class="btn btn-outline-danger"
      type="button"
      data-bs-toggle="offcanvas"
      data-bs-target="#offcanvasExample"
      aria-controls="offcanvasExample"
      style="margin-top: 12px"
    >
      Filters
    </button>

    <div
      class="offcanvas offcanvas-start"
      tabIndex="-1"
      id="offcanvasExample"
      aria-labelledby="offcanvasExampleLabel"
    >
      <h5 class="offcanvas-title" id="offcanvasExampleLabel">Filters</h5>
      <!-- Add your filter content here -->
    </div>
  </div>
</template>

<script>
export default {
  // Add component-specific options or logic here
};
</script>

<style scoped>
/* Add scoped styles if needed */
</style>
