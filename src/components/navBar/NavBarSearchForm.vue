<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mx-auto navbar">
      <div class="flex-grow-1">
        <form class="d-flex" @submit.prevent="handleSubmit">
          <input
            class="form-control me-2"
            type="search"
            v-model="searchTermUsers"
            placeholder="Search"
            aria-label="Search"
            style="border-radius: 30px; height: 40px; flex-grow: 1;"
          />
          <button
            type="submit"
            class="btn btn-outline-danger"
            style="margin-left: 5px; height: 40px;"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-search-heart-fill"
              viewBox="0 0 16 16"
            >
              <path
                d="M6.5 13a6.47 6.47 0 0 0 3.845-1.258h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1A6.47 6.47 0 0 0 13 6.5 6.5 6.5 0 0 0 6.5 0a6.5 6.5 0 1 0 0 13m0-8.518c1.664-1.673 5.825 1.254 0 5.018-5.825-3.764-1.664-6.69 0-5.018"
              />
            </svg>
          </button>
        </form>
      </div>
      <div
        v-if="filteredUsers.length > 0"
        class="filtered-users dropdown-container"
      >
        <select class="form-select dropdown-content" v-model="selectedUser">
          <option
            v-for="(user, index) in filteredUsers"
            :key="index"
            :value="user.name"
          >
            {{ user.name }}
          </option>
        </select>
      </div>
      <div
        v-if="isSearchActive && filteredUsers.length === 0"
        class="filtered-users dropdown-container"
      >
        <p>No users found.</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import store from "@/store";

export default {
  name: "SearchForm",
  data() {
    return {
      searchTermUsers: "",
      selectedUser: null,
      isSearchActive: false,
    };
  },
  methods: {
    handleInput() {
      this.isSearchActive = true;
      console.log("User typed:", this.searchTermUsers);
      this.$store.dispatch("updateSearchUserTerm", this.searchTermUsers);
    },
    handleSubmit() {
      this.isSearchActive = true;
      console.log("Form submitted");
    },
  },
  computed: {
    ...mapState(["getUsers", "getSearchTermUsers"]),
    users() {
      return store.state.users;
    },
    filteredUsers() {
      const searchTermUser = this.searchTermUsers.toLowerCase();
      if (!searchTermUser || !this.users) {
        return [];
      }
      return this.users.filter((user) =>
        user.name.toLowerCase().includes(searchTermUser),
      );
    },
  },
};
</script>

<style scoped>
.navbar {
  margin-top: 20px;
  margin-bottom: 20px;
}

.dropdown-container {
  width: 100px;
  max-height: 200px;
  overflow-y: auto;
}

.dropdown-content {
  width: 100%;
}

@media (max-width: 768px) {
  .form-control {
    width: 100%;
  }
}
</style>
