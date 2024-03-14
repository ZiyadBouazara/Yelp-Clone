import { createStore } from "vuex";

const SERVER_URL = "https://ufoodapi.herokuapp.com/unsecure";

export default createStore({
  state: {
    price: "",
    searchTerm: "",
    searchTermGenre: "",
    genres: [],
    restaurants: [],
    users: [],
    imageIndex: 0,
    loggedInUser: null,
    visits: [],
    favorites: [],
  },
  mutations: {
    ADD_TO_GENRE_ARRAY(state, newItem) {
      state.genres.push(newItem);
    },
    REMOVE_FROM_GENRE_ARRAY(state, removedItem) {
      state.genres = state.genres.filter((item) => item !== removedItem);
    },
    SET_PRICE(state, price) {
      state.price = price;
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
    SET_USER_FAVORITES(state, favorites) {
      state.favorites = favorites;
    },
    SET_LOGGED_IN_USER(state, user) {
      state.loggedInUser = user;
    },
    SET_VISITS(state, visits) {
      state.visits = visits;
    },
  },
  actions: {
    updatePrice({ commit }, newPrice) {
      commit("SET_PRICE", newPrice);
    },
    addSelectedFilter({ commit, state }, newItem) {
      commit("ADD_TO_GENRE_ARRAY", newItem);
    },
    removeGenre({ commit, state }, removedItem) {
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
    async login({ commit, state }) {
      // TODO : implement real login logic, changed to user[1] because he has many visits and favorites
      const dummyUser = state.users[1];

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
    async fetchUserFavorites({ commit }, userId) {
      try {
        const response = await fetch(`${SERVER_URL}/users/${userId}/favorites`);
        if (response.status !== 200) {
          throw new Error("Favorites do not load");
        }
        const jsonResponse = await response.json();

        const selectedFavorites = jsonResponse.items.map((item) => ({
          name: item.name,
          restaurants: item.restaurants,
        }));

        commit("SET_USER_FAVORITES", selectedFavorites);
      } catch (error) {
        console.error("Error fetching user favorites", error);
      }
    },
  },
  getters: {
    getPrice: (state) => state.price,
    getGenres: (state) => state.genres,
    getSearchTermGenre: (state) => state.searchTermGenre,
    getSearchTerm: (state) => state.searchTerm,
    getRestaurants: (state) => state.restaurants,
    getUsers: (state) => state.users,
    getUserFavorites: (state) => state.favorites,
    getImageIndex: (state) => state.imageIndex,
    getRestaurantById: (state) => (restaurantId) => {
      return state.restaurants.find((r) => r.id === restaurantId);
    },
    getLoggedInUser: (state) => state.loggedInUser,
    getVisits: (state) => state.visits,
  },
});
