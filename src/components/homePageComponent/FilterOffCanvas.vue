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
      <h5
        class="offcanvas-title"
        id="offcanvasExampleLabel"
        style="font-weight: bold"
      >
        Filters
      </h5>
      <div class="row">
        <div class="btn-group">
          <button
            type="button"
            class="btn dropdown-toggle black hover"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            style="border-radius: 30px; margin-top: 50px; margin-bottom: 50px"
          >
            Choose Category
          </button>
          <ul class="dropdown-menu">
            <li
              v-for="option in Filters"
              :key="option.id"
              @click="handleFilterClick(option.name)"
            >
              <a class="dropdown-item" href="#">{{ option.name }}</a>
            </li>
          </ul>
        </div>
        <div class="col-12 d-flex flex-wrap">
          <span
            v-for="selectedOption in getGenres"
            :key="selectedOption.id"
            class="badge text-bg-light badge-inline"
            style="margin-bottom: 10px"
          >
            {{ selectedOption }}
          </span>
        </div>
      </div>
      <div class="row">
        <div class="btn-group">
          <button
            type="button"
            class="btn dropdown-toggle black hover"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            style="border-radius: 30px; margin-top: 50px; margin-bottom: 50px"
          >
            {{ selectedDistance || "Choose Distance" }}
          </button>
          <ul class="dropdown-menu">
            <li v-for="optionDistance in Distance" :key="optionDistance.id">
              <a
                class="dropdown-item"
                @click="updateSelectedDistance(optionDistance.name)"
              >
                {{ optionDistance.name }}</a
              >
            </li>
          </ul>
        </div>
      </div>
      <div class="row">
        <p style="font-weight: bold">Select a price...</p>
        <div class="price-label">
          <span>$</span>
          <input
            type="range"
            class="form-range"
            id="customRange1"
            style="margin-top: 50px; margin-bottom: 50px"
          />
          <span>$$$</span>
        </div>
      </div>
      <div class="row comp">
        <p style="font-weight: bold">Features</p>
        <div
          class="form-check form-check-inline hover"
          style="margin-top: 20px"
        >
          <input
            class="form-check-input"
            type="checkbox"
            id="inlineCheckbox1"
            value="option1"
          />
          <label
            class="form-check-label"
            for="inlineCheckbox1"
            style="margin-left: 20px"
            >Take Reservations</label
          >
        </div>
        <div class="form-check form-check-inline">
          <input
            class="form-check-input"
            type="checkbox"
            id="inlineCheckbox2"
            value="option2"
          />
          <label
            class="form-check-label"
            for="inlineCheckbox2"
            style="margin-left: 20px"
            >Offers Takeout</label
          >
        </div>
        <button
          class="btn black hover"
          style="margin-top: 10px; margin-right: 10px"
        >
          See all
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  props: {
    Genres: Array,
  },
  data() {
    return {
      selectedDistance: null,
      Distance: [
        { id: 1, name: "Bird's-eye View" },
        { id: 2, name: "Driving (8 km.)" },
        { id: 3, name: "Biking (4 km.)" },
        { id: 4, name: "Walking (2 km.)" },
        { id: 5, name: "Within 4 blocks" },
      ],
      Filters: [
        { id: 1, name: "Bistro" },
        { id: 2, name: "Fast-Food" },
        { id: 3, name: "Ambiance" },
        { id: 4, name: "Libanais" },
        { id: 5, name: "Hamburgers" },
        { id: 6, name: "Café" },
        { id: 7, name: "Italien" },
      ],
    };
  },
  computed: {
    ...mapGetters(["getGenres"]),
    selectedFilters() {
      return this.getGenres;
    },
  },
  methods: {
    removeFilterFromStore(filter) {
      this.$store.dispatch("removeGenre", filter);
    },
    ...mapActions(["addSelectedFilter"]),
    addFilter(filter) {
      this.addSelectedFilter(filter);
    },
    handleFilterClick(filter) {
      var foundable = filter.toLowerCase();
      if (this.getGenres.includes(foundable)) {
        this.removeFilterFromStore(foundable);
      } else {
        this.addFilter(foundable);
      }
    },
    updateSelectedDistance(distance) {
      this.selectedDistance = distance;
    },
  },
};
</script>

<style scoped>
body {
  display: inline-block;
  margin: 50px;
}

.form-check-inline {
  display: flex;
  align-content: center;
}

.row,
.comp {
  margin: 10px;
  border-bottom: 1px solid rgb(221, 221, 221);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.form-range {
  max-width: 200px;
}

.black {
  background-color: ghostwhite;
  border-color: black;
  color: black;
}

.row {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.price-label {
  display: flex;
  align-items: center;
}

.price-label span {
  flex: 1;
  text-align: center;
  font-weight: bold;
}

.hover {
  cursor: pointer;
  transition: background-color 0.3s;
}

.hover:hover {
  background-color: rgba(235, 235, 235, 1);
}
</style>
