<template>
  <div>
    <button
      class="btn btn-outline-danger"
      type="button"
      data-bs-toggle="offcanvas"
      data-bs-target="#offcanvasExample"
      aria-controls="offcanvasExample"
      style="margin-top: 12px; border-radius: 30px; height: 40px"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-funnel"
        viewBox="0 0 16 16"
      >
        <path
          d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2z"
        />
      </svg>
    </button>

    <div
      class="offcanvas offcanvas-start"
      tabIndex="-1"
      id="offcanvasExample"
      aria-labelledby="offcanvasExampleLabel"
      style="box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1)"
    >
      <h5 class="offcanvas-title" id="offcanvasExampleLabel">Filters</h5>
      <div
        class="row"
        style="margin: 10px; box-shadow: 0 -4px 6px rgba(0, 0, 0, 0.1)"
      >
        <div class="btn-group">
          <button
            type="button"
            class="btn btn-danger dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            style="margin-top: 100px"
          >
            Choose Filters
          </button>
          <ul class="dropdown-menu">
            <li
              v-for="option in Filters"
              :key="option.id"
              @click="updateSelectedFilter(option.name)"
            >
              <a class="dropdown-item" href="#">{{ option.name }}</a>
            </li>
          </ul>
        </div>
        <div class="col-12 d-flex flex-wrap" style="margin-top: 10px">
          <span
            v-for="selectedOption in selectedFilter"
            :key="selectedOption.id"
            class="badge text-bg-light badge-inline"
          >
            {{ selectedOption }}
          </span>
        </div>
      </div>
      <div
        class="row"
        style="margin: 10px; box-shadow: 0 -4px 6px rgba(0, 0, 0, 0.1)"
      >
        <div class="d-flex">
          <div class="dropdown me-1">
            <button
              type="button"
              class="btn btn-danger dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              data-bs-offset="10,20"
              style="margin-top: 100px"
            >
              Sort: {{ (ex = recommanded) }}
            </button>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#">Action</a></li>
              <li><a class="dropdown-item" href="#">Another action</a></li>
              <li><a class="dropdown-item" href="#">Something else here</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div
        class="row"
        style="margin: 10px; box-shadow: 0 -4px 6px rgba(0, 0, 0, 0.1)"
      >
        <label for="customRange1" class="form-label" style="margin-top: 100px"
          >Example range</label
        >
        <input type="range" class="form-range" id="customRange1" />
      </div>
      <div
        class="row"
        style="margin: 10px; box-shadow: 0 -4px 6px rgba(0, 0, 0, 0.1)"
      >
        <div class="form-check form-check-inline" style="margin-top: 100px">
          <input
            class="form-check-input"
            type="checkbox"
            id="inlineCheckbox1"
            value="option1"
          />
          <label class="form-check-label" for="inlineCheckbox1">1</label>
        </div>
        <div class="form-check form-check-inline">
          <input
            class="form-check-input"
            type="checkbox"
            id="inlineCheckbox2"
            value="option2"
          />
          <label class="form-check-label" for="inlineCheckbox2">2</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedFilter: [],
      Filters: [
        { id: 1, name: "Italian" },
        { id: 2, name: "Moroccan" },
        { id: 3, name: "Poutine" },
        { id: 4, name: "Pizza" },
        { id: 5, name: "Fast-Food" },
        { id: 6, name: "Lebanese" },
        { id: 7, name: "Kebab" },
        { id: 8, name: "Alchool" },
        { id: 9, name: "Bar" },
        { id: 10, name: "European" },
        { id: 11, name: "French" },
      ],
    };
  },
  methods: {
    updateSelectedFilter(filter) {
      if (this.selectedFilter.includes(filter)) {
        this.selectedFilter = this.selectedFilter.filter(
          (selectedOption) => selectedOption !== filter,
        );
      } else {
        this.selectedFilter.push(filter);
      }
    },
  },
};
</script>

<style scoped>
body {
  display: inline-block;
  margin: 50px;
}
</style>
