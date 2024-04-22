<template>
  <div>
    <div
      class="d-flex justify-content-between align-items-center mx-auto navbar"
    >
      <div class="flex-grow-1">
        <form class="d-flex" @submit.prevent="handleSubmit">
          <input
            class="form-control me-2"
            type="search"
            v-model="searchTermUsers"
            placeholder="Search"
            aria-label="Search"
            style="border-radius: 30px; height: 40px; flex-grow: 1"
          />
          <button
            type="submit"
            class="btn btn-outline-danger"
            style="margin-left: 5px; height: 40px"
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
      <div v-if="isLoading && filteredUsers.length === 0">
        Loading users....
      </div>
      <div
        v-else-if="filteredUsers.length > 0"
        class="filtered-users dropdown-container"
      >
        <select class="form-select dropdown-content" v-model="selectedUser">
          <option
            v-for="(user, index) in filteredUsers"
            :key="index"
            :value="user"
          >
            {{ user.name }}
          </option>
        </select>
      </div>
      <div v-else-if="showNoResults" class="filtered-users dropdown-container">
        <p>No users found.</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { useRouter } from "vue-router";
import store from "@/store";
import { router } from "@/router";

export default {
  name: "SearchForm",
  data() {
    return {
      isLoading: false,
      searchTermUsers: "",
      selectedUser: null,
      isSearchActive: false,
    };
  },
  methods: {
    async handleInput() {
      this.isLoading = true;
      this.isSearchActive = true;
      console.log("User typed:", this.searchTermUsers);

      const timeoutId = setTimeout(() => {
        this.isLoading = false;
        clearTimeout(timeoutId);
      }, 20000);

      try {
        await this.$store.dispatch(
          "updateSearchUserTerm",
          this.searchTermUsers,
        );
        clearTimeout(timeoutId);
        this.isLoading = false;
        this.isSearchActive = true;
      } catch (error) {
        console.error("Error fetching users: ", error);
      }
    },
    handleSubmit() {
      this.isSearchActive = true;
      this.isLoading = true;
      console.log("Form submitted");
    },
    handleSelectedUser() {
      console.log("Selected user:", this.selectedUser);
      console.log("Selected user ID:", this.selectedUser.id);
      router.push({
        name: "UserProfile",
        params: { userId: this.selectedUser.id },
      });
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
    showNoResults() {
      return this.searchTimedOut && this.filteredUsers.length === 0;
    },
  },
  watch: {
    selectedUser(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.handleSelectedUser();
      }
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
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  background-color: #f8f9fa; /* Change the background color to match your app's theme */
  border: 1px solid #ced4da; /* Change the border color to match your app's theme */
  border-radius: 0.25rem; /* Adjust the border radius to match your app's style */
}

.dropdown-content {
  width: 100%;
  color: #495057; /* Change the text color to match your app's theme */
  font-size: 1rem; /* Adjust the font size to match your app's style */
}

@media (max-width: 768px) {
  .form-control {
    width: 100%;
  }
}
</style>
