import { createStore } from "vuex";

const SERVER_URL = "https://ufoodapi.herokuapp.com/unsecure";
const LIMIT = 50;

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
    userFavorites: [],
    favoritesFromFavoritesListId: [],
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
      state.userFavorites = favorites;
    },
    SET_LOGGED_IN_USER(state, user) {
      state.loggedInUser = user;
    },
    SET_VISITS(state, visits) {
      state.visits = visits;
    },
    SET_FAVORITES_FROM_FAVORITE_LIST_ID(state, favoritesFromListId) {
      state.favoritesFromFavoritesListId = favoritesFromListId;
    },
    ADD_NEW_FAVORITES_LIST(state, newFavoriteList) {
      state.newFavoriteList = newFavoriteList;
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
        const rawJsonResponse = await response.json();

        const users = rawJsonResponse.items.map((user) => {
          const parsedUser = { ...user };
          parsedUser.name = parsedUser.name.replace(/["'\\]/g, ""); // Remove leading and trailing quotes, excluding escaped quotes
          parsedUser.email = parsedUser.email.replace(/["'\\]/g, "");
          return parsedUser;
        });
        commit("SET_USERS", users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    },
    async login({ commit, state }) {
      // TODO : implement real login logic, changed to user[1] because he has many visits and favorites
      const dummyUser = state.users[7];
      console.log("loggedin user: " + dummyUser.id);
      commit("SET_LOGGED_IN_USER", dummyUser);
    },
    async logout({ commit, state }) {
      // TODO : implement real logout logic
      commit("SET_LOGGED_IN_USER", null);
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
          `${SERVER_URL}/users/${userId}/restaurants/visits?limit=${LIMIT}`,
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
    async getAllUserFavoritesLists({ commit }, { userId }) {
      try {
        const response = await fetch(`${SERVER_URL}/users/${userId}/favorites`);
        if (response.status !== 200) {
          throw new Error("Favorites do not load");
        }
        const jsonResponse = await response.json();
        console.log("jsonResponse directly: " + JSON.stringify(jsonResponse));
        const selectedFavorites = jsonResponse.items.map((item) => ({
          name: item.name,
          restaurants: item.restaurants,
        }));
        console.log("Selected Favorites: " + JSON.stringify(selectedFavorites));

        commit("SET_USER_FAVORITES", selectedFavorites);
      } catch (error) {
        console.error("Error fetching user favorites", error);
      }
    },
    async createNewFavoritesList({ commit }, { listName, ownerEMail }) {
      try {
        const response = await fetch(`${SERVER_URL}/favorites`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            listName: listName,
            ownerMail: ownerEMail,
          }),
        });

        if (response.status !== 200) {
          throw Error("Favorites List could not be created");
        }
        const jsonResponse = await response.json();
        commit("ADD_NEW_FAVORITES_LIST", jsonResponse);

        console.log("Created favorite list: " + JSON.stringify(jsonResponse));
      } catch (error) {
        console.log("Error creating new favorites list: ", error);
      }
    },
    async getFavoriteRestaurantsByFavoriteListId(
      { commit },
      { favoriteListId },
    ) {
      try {
        const response = await fetch(
          `${SERVER_URL}/favorites/${favoriteListId}`,
        );

        if (response.status !== 200) {
          throw Error("Could not retrieve favorite list items");
        }

        const jsonResponse = await response.json();
        console.log(
          "Favorite List 91929394 value: " + JSON.stringify(jsonResponse),
        );
      } catch (error) {
        console.log(
          "Error fetching favorite restaurants from favorite list id",
          error,
        );
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
    getUserFavorites: (state) => state.userFavorites,
    getImageIndex: (state) => state.imageIndex,
    getRestaurantById: (state) => (restaurantId) => {
      return state.restaurants.find((r) => r.id === restaurantId);
    },
    getLoggedInUser: (state) => state.loggedInUser,
    getVisits: (state) => state.visits,
    getFavoritesByFavoriteListId: (state) => state.favoritesFromFavoritesListId,
  },
});
