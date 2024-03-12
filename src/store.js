import Vuex from "vuex";
const SERVER_URL = "https://ufoodapi.herokuapp.com/unsecure";

export default new Vuex.Store({
  state: {
    searchTerm: "",
    restaurants: [],
    users: [],
    imageIndex: 0,
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
    SET_RESTAURANT_PICTURES(state, { restaurantId, pictures }) {
      const restaurantIndex = state.restaurants.findIndex(
        (r) => r.id === restaurantId,
      );
      if (restaurantIndex !== -1) {
        Vue.set(state.restaurants, restaurantIndex, {
          ...state.restaurants[restaurantIndex],
          pictures: pictures,
        });
      }
    },
    SET_RESTAURANT_GENRE(state, { restaurantId, genre }) {
      const restaurantIndex = state.restaurants.findIndex(
        (r) => r.id === restaurantId,
      );
      if (restaurantIndex !== -1) {
        Vue.set(state.restaurants, restaurantIndex, {
          ...state.restaurants[restaurantIndex],
          genre: genre,
        });
      }
    },
    SET_HOUR_RESTAURANT(state, { restaurantId, opening_hours }) {
      const restaurantIndex = state.restaurants.findIndex(
        (r) => r.id === restaurantId,
      );
      if (restaurantIndex !== -1) {
        Vue.set(state.restaurants, restaurantIndex, {
          ...state.restaurants[restaurantIndex],
          hour: opening_hours,
        });
      }
    },
    SET_PRICE_RESTAURANT(state, { restaurantId, price_range }) {
      const restaurantIndex = state.restaurants.findIndex(
        (r) => r.id === restaurantId,
      );
      if (restaurantIndex !== -1) {
        Vue.set(state.restaurants, restaurantIndex, {
          ...state.restaurants[restaurantIndex],
          hour: price_range,
        });
      }
    },
    SET_RATING_RESTAURANT(state, { restaurantId, rating }) {
      const restaurantIndex = state.restaurants.findIndex(
        (r) => r.id === restaurantId,
      );
      if (restaurantIndex !== -1) {
        Vue.set(state.restaurants, restaurantIndex, {
          ...state.restaurants[restaurantIndex],
          hour: rating,
        });
      }
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
    async fetchRestaurantPictures({ commit }, restaurantId) {
      try {
        const response = await fetch(
          `${SERVER_URL}/restaurants/${restaurantId}`,
        );
        if (response.status !== 200) {
          throw new Error("Restaurant pictures not loaded");
        }
        const jsonResponse = await response.json();
        const pictures = jsonResponse.pictures || [];
        commit("SET_RESTAURANT_PICTURES", { restaurantId, pictures });
      } catch (error) {
        console.error("Error fetching restaurant pictures:", error);
      }
    },
    async fetchRestaurantHour({ commit }, restaurantId) {
      try {
        const response = await fetch(
          `${SERVER_URL}/restaurants/${restaurantId}`,
        );
        if (response.status !== 200) {
          throw new Error("Restaurant hours not loaded");
        }
        const jsonResponse = await response.json();
        const hour = jsonResponse.opening_hours || [];
        commit("SET_HOUR_RESTAURANT", { restaurantId, opening_hours });
      } catch (error) {
        console.error("Error fetching restaurant hours:", error);
      }
    },
    async fetchRestaurantGenre({ commit }, restaurantId) {
      try {
        const response = await fetch(
          `${SERVER_URL}/restaurants/${restaurantId}`,
        );
        if (response.status !== 200) {
          throw new Error("Restaurant genres not loaded");
        }
        const jsonResponse = await response.json();
        const hour = jsonResponse.genres || [];
        commit("SET_RESTAURANT_GENRE", { restaurantId, genres });
      } catch (error) {
        console.error("Error fetching restaurant genres:", error);
      }
    },
    async fetchRestaurantPriceRange({ commit }, restaurantId) {
      try {
        const response = await fetch(
          `${SERVER_URL}/restaurants/${restaurantId}`,
        );
        if (response.status !== 200) {
          throw new Error("Restaurant price_range not loaded");
        }
        const jsonResponse = await response.json();
        const hour = jsonResponse.price_range || [];
        commit("SET_PRICE_RESTAURANT", { restaurantId, price_range });
      } catch (error) {
        console.error("Error fetching restaurant price_range:", error);
      }
    },
    async fetchRestaurantRating({ commit }, restaurantId) {
      try {
        const response = await fetch(
          `${SERVER_URL}/restaurants/${restaurantId}`,
        );
        if (response.status !== 200) {
          throw new Error("Restaurant rating not loaded");
        }
        const jsonResponse = await response.json();
        const hour = jsonResponse.rating || [];
        commit("SET_RATING_RESTAURANT", { restaurantId, rating });
      } catch (error) {
        console.error("Error fetching restaurant rating:", error);
      }
    },
  },
  getters: {
    getSearchTerm: (state) => state.searchTerm,
    getRestaurants: (state) => state.restaurants,
    getUsers: (state) => state.users,
    getImageIndex: (state) => state.imageIndex,
    getRestaurantPictures: (state) => (restaurantId) => {
      const restaurant = state.restaurants.find((r) => r.id === restaurantId);
      return restaurant ? restaurant.pictures || [] : [];
    },
    getRestaurantHours: (state) => (restaurantId) => {
      const restaurant = state.restaurants.find((r) => r.id === restaurantId);
      return restaurant ? restaurant.opening_hours || [] : [];
    },
    getRestaurantGenre: (state) => (restaurantId) => {
      const restaurant = state.restaurants.find((r) => r.id === restaurantId);
      return restaurant ? state.restaurants.genres || [] : [];
    },
    getRestaurantPriceRange: (state) => (restaurantId) => {
      const restaurant = state.restaurants.find((r) => r.id === restaurantId);
      return restaurant ? state.restaurants.price_range || [] : [];
    },
    getRestaurantRating: (state) => (restaurantId) => {
      const restaurant = state.restaurants.find((r) => r.id === restaurantId);
      return restaurant ? state.restaurants.rating || [] : [];
    },
  },
});
