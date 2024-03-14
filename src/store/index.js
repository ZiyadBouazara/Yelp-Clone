import { createStore } from "vuex";

const SERVER_URL = "https://ufoodapi.herokuapp.com/unsecure";

export default createStore({
  state: {
    searchTerm: "",
    searchTermGenre: "",
    genres: [],
    restaurants: [],
    users: [],
    imageIndex: 0,
  },
  mutations: {
    ADD_TO_GENRE_ARRAY(state, newItem) {
      state.genres.push(newItem);
    },
    REMOVE_FROM_GENRE_ARRAY(state, removedItem) {
      state.genres = state.genres.filter((item) => item !== removedItem);
    },
    SET_SEARCH_TERM_GENRE(state, searchTermGenre) {
      state.searchTermGenre = searchTermGenre;
    },
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
  },
  actions: {
    addSelectedFilter({ commit, state }, newItem) {
      commit("ADD_TO_GENRE_ARRAY", newItem);
    },
    removeGenre({ commit, state }, removedItem) {;
      if (state.genres.includes(removedItem)) {
        commit("REMOVE_FROM_GENRE_ARRAY", removedItem);
      }
    },
    updateSearchTermGenre({ commit }, searchTermGenre) {
      commit("SET_SEARCH_TERM_GENRE", searchTermGenre);
    },
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
  },
  getters: {
    getGenres: (state) => state.genres,
    getSearchTermGenre: (state) => state.searchTermGenre,
    getSearchTerm: (state) => state.searchTerm,
    getRestaurants: (state) => state.restaurants,
    getUsers: (state) => state.users,
    getImageIndex: (state) => state.imageIndex,
    getRestaurantById: (state) => (restaurantId) => {
      return state.restaurants.find((r) => r.id === restaurantId);
    },
  },
});
