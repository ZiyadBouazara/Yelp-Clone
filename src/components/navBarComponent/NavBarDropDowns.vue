<template>
  <div>
    <div
      v-for="(dropdown, index) in dropdowns"
      :key="index"
      class="dropdown m-2"
    >
      <button
        class="btn btn-outline-danger dropdown-toggle"
        type="button"
        :id="'dropdown-' + (index + 1)"
        data-bs-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        {{ dropdown.text }}
      </button>
      <ul class="dropdown-menu" :aria-labelledby="'dropdown-' + (index + 1)">
        <li v-for="(item, itemIndex) in dropdown.items" :key="itemIndex">
          <a class="dropdown-item" href="#">
            {{ item.label }}
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: ["dropdowns"],
};
</script>

<style scoped>
.dropdown {
  display: inline-block;
}

@media (max-width: 768px) {
  .dropdown {
    display: block;
  }
}
</style>
