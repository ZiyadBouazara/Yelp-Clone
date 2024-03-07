import Vuex from "vuex";
const SERVER_URL = 'https://ufoodapi.herokuapp.com/unsecure'



export default new Vuex.Store({
  state: {
    searchTerm: "",
    restaurants: [],
    users: [],
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
  },
  actions: {
    updateSearchTerm({ commit }, searchTerm) {
      commit("SET_SEARCH_TERM", searchTerm);
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
    getSearchTerm: (state) => state.searchTerm,
    getRestaurants: (state) => state.restaurants,
    getUsers: (state) => state.users,
  },
});
