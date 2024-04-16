import Cookies from "js.cookie";

const LIMIT = 1000;
const SERVER_URL = "https://ufoodapi.herokuapp.com";

export const actions = {
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
  async signUp({ commit }, { name, email, password }) {
    try {
      const formData = new URLSearchParams();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);

      const response = await fetch(`${SERVER_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData.toString(),
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error during signup:", error);
      throw error;
    }
  },
  async login({ commit }, { email, password }) {
    try {
      const formData = new URLSearchParams();
      formData.append("email", email);
      formData.append("password", password);

      const response = await fetch(`${SERVER_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData.toString(),
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      Cookies.set("connectionToken", data.token);
      const { email: userEmail, name: name, id: id } = data;
      commit("SET_LOGGED_IN_USER", { email: userEmail, name: name, id: id });
      return data;
    } catch (error) {
      console.error("Error during login:", error);
      throw error;
    }
  },
  async logout({ commit }) {
    try {
      await fetch(`${SERVER_URL}/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      commit("SET_LOGGED_IN_USER", null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  },

  async getTotalValue({ commit }) {
    const token = Cookies.get("connectionToken");

    try {
      const response = await fetch(`${SERVER_URL}/restaurants`, {
        headers: {
          Authorization: token,
        },
      });
      const jsonResponse = await response.json();
      commit("SET_TOTAL_RESTAURANT", jsonResponse.total);
    } catch (error) {
      console.error("Error getting total value:", error);
      throw error;
    }
  },
  async fetchRestaurant({ commit, state }) {
    const token = Cookies.get("connectionToken");

    try {
      const response = await fetch(
        `${SERVER_URL}/restaurants?limit=${state.totalRestaurant}`,
        {
          headers: {
            Authorization: token,
          },
        },
      );
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
    const token = Cookies.get("connectionToken");

    try {
      const response = await fetch(`${SERVER_URL}/users`, {
        headers: {
          Authorization: token,
        },
      });
      if (response.status !== 200) {
        throw new Error("Users do not load");
      }
      const rawJsonResponse = await response.json();

      const users = rawJsonResponse.items.map((user) => {
        const parsedUser = { ...user };
        parsedUser.name = parsedUser.name.replace(/["'\\]/g, "");
        parsedUser.email = parsedUser.email.replace(/["'\\]/g, "");
        return parsedUser;
      });
      console.log("users fetched: " + JSON.stringify(users));
      commit("SET_USERS", users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  },
  async createVisit({ commit, dispatch }, { userId, visitData }) {
    const token = Cookies.get("connectionToken");

    try {
      const response = await fetch(
        `${SERVER_URL}/users/${userId}/restaurants/visits`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
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
    const token = Cookies.get("connectionToken");
    console.log("userId logged " + userId);

    try {
      const response = await fetch(
        `${SERVER_URL}/users/${userId}/restaurants/visits?limit=${LIMIT}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
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
  async fetchVisitsForRestaurant({ state }, { restaurantId }) {
    const userId = state.loggedInUser.id;
    const token = Cookies.get("connectionToken");

    try {
      const response = await fetch(
        `${SERVER_URL}/users/${userId}/restaurants/${restaurantId}/visits?limit=${LIMIT}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        },
      );
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching visits for restaurant:`, error);
    }
  },
  async fetchUserFavorites({ commit }, userId) {
    const token = Cookies.get("connectionToken");

    try {
      const response = await fetch(`${SERVER_URL}/users/${userId}/favorites`, {
        headers: {
          Authorization: token,
        },
      });
      if (response.status !== 200) {
        throw new Error("Favorites do not load");
      }
      const jsonResponse = await response.json();

      const selectedFavorites = jsonResponse.items.map((item) => ({
        name: item.name,
        restaurants: item.restaurants,
        id: item.id,
      }));

      commit("SET_USER_FAVORITES", selectedFavorites);
      return selectedFavorites;
    } catch (error) {
      console.error("Error fetching user favorites", error);
    }
  },
  async createFavoriteList({ commit }, listData) {
    const token = Cookies.get("connectionToken");

    try {
      const apiUrl = `${SERVER_URL}/favorites`;

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(listData),
      });

      if (!response.ok) {
        throw new Error("Failed to create favorite list");
      }

      const responseData = await response.json();
      commit("ADD_NEW_FAVORITES_LIST", responseData);
      return responseData;
    } catch (error) {
      console.error("Error creating favorite list:", error);
      throw error;
    }
  },
  async deleteFavoriteList({ commit }, id) {
    const token = Cookies.get("connectionToken");

    try {
      const apiUrl = `${SERVER_URL}/favorites/${id}`;

      const response = await fetch(apiUrl, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete favorite list");
      }

      const responseData = await response.json();
      commit("SET_MESSAGE", responseData.message);
    } catch (error) {
      console.error("Error deleting favorite list:", error);
      throw error;
    }
  },
  async deleteRestaurantFromFavoriteList(
    { commit },
    { favoriteListId, restaurantId },
  ) {
    const token = Cookies.get("connectionToken");

    try {
      const response = await fetch(
        `${SERVER_URL}/favorites/${favoriteListId}/restaurants/${restaurantId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        },
      );

      if (!response.ok) {
        throw new Error("Failed to delete restaurant from favorite list");
      }

      const responseData = await response.json();
      commit("DELETE_RESTAURANT_FROM_FAVORITE_LIST", responseData);
      return responseData;
    } catch (error) {
      console.error("Error deleting restaurant from favorite list:", error);
      throw error;
    }
  },
  async editFavoriteListName({ commit }, favoriteList) {
    const token = Cookies.get("connectionToken");

    try {
      const response = await fetch(
        `${SERVER_URL}/favorites/${favoriteList.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({
            name: favoriteList.name,
            owner: favoriteList.email,
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to edit favorite list name");
      }
    } catch (error) {
      console.error("Error editing favorite list name:", error);
    }
  },
  async addRestaurantToFavoriteList(
    { state, dispatch },
    { restaurantIdJson, favoriteListId },
  ) {
    const token = Cookies.get("connectionToken");
    const loggedUserId = state.loggedInUser.id;

    try {
      const response = await fetch(
        `${SERVER_URL}/favorites/${favoriteListId}/restaurants`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify(restaurantIdJson),
        },
      );

      if (response.status !== 200) {
        throw Error("Could not add restaurant to favorite list");
      }

      await dispatch("fetchUserFavorites", {
        userId: loggedUserId,
      });
    } catch (error) {
      console.log(
        "Error fetching favorite restaurants from favorite list id",
        error,
      );
    }
  },
};
