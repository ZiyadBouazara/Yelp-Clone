import Vuex from "vuex";

const SERVER_URL = "https://ufoodapi.herokuapp.com/unsecure";

export default new Vuex.Store({
  state: {
    searchTerm: "",
    restaurants: [],
    users: [],
    imageIndex: 0,
    loggedInUser: null,
    visits: [],
  },
  mutations: {
    SET_SEARCH_TERM(state, searchTerm) {
      state.searchTerm = searchTerm;
    },
    SET_RESTAURANTS(state, restaurants) {
      state.restaurants = restaurants;
    },
    SET_USERS(state, users) {
      state.users = users;
    },
    SET_IMAGE_INDEX(state, imageIndex) {
      state.imageIndex = imageIndex;
    },
    SET_LOGGED_IN_USER(state, user) {
      state.loggedInUser = user;
    },
    SET_VISITS(state, visits) {
      state.visits = visits;
    },
  },
  actions: {
    updateSearchTerm({ commit }, searchTerm) {
      commit("SET_SEARCH_TERM", searchTerm);
    },
    updateImageIndex({ commit }, imageIndex) {
      commit("SET_IMAGE_INDEX", imageIndex);
    },
    async fetchRestaurant({ commit }) {
      try {
        const response = await fetch(`${SERVER_URL}/restaurants`);
        if (response.status !== 200) {
          throw new Error("Restaurants not loaded");
        }
        const jsonResponse = await response.json();
        commit("SET_RESTAURANTS", jsonResponse.items);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      }
    },
    async fetchUsers({ commit }) {
      try {
        const response = await fetch(`${SERVER_URL}/users`);
        if (response.status !== 200) {
          throw new Error("Users do not load");
        }
        const jsonResponse = await response.json();
        commit("SET_USERS", jsonResponse.items);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    },
    async login({ commit, state }) {
      // TODO : implement real login logic
      const dummyUser = state.users[0];
      commit("SET_LOGGED_IN_USER", dummyUser);
    },
    async createVisit({ commit, dispatch }, { userId, visitData }) {
      try {
        const response = await fetch(
          `${SERVER_URL}/users/${userId}/restaurants/visits`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(visitData),
          },
        );
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }
        await dispatch("fetchVisitsForLoggedInUser");
      } catch (error) {
        console.error("Error creating visit:", error);
      }
    },
    async fetchVisitsForLoggedInUser({ commit, state }) {
      const userId = state.loggedInUser.id;
      try {
        const response = await fetch(
          `${SERVER_URL}/users/${userId}/restaurants/visits?page=4`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }
        const jsonResponse = await response.json();
        commit("SET_VISITS", jsonResponse.items);
      } catch (error) {
        console.error(`Error fetching visits for user:`, error);
      }
    },
  },
  getters: {
    getSearchTerm: (state) => state.searchTerm,
    getRestaurants: (state) => state.restaurants,
    getUsers: (state) => state.users,
    getImageIndex: (state) => state.imageIndex,
    getRestaurantById: (state) => (restaurantId) => {
      return state.restaurants.find((r) => r.id === restaurantId);
    },
    getLoggedInUser: (state) => state.loggedInUser,
    getVisits: (state) => state.visits,
  },
});
