import Cookies from "js.cookie";

const SERVER_URL = "https://ufoodapi.herokuapp.com";

export const favoriteActions = {
  async fetchUserFavorites({ commit }, userId) {
    const token = Cookies.get("connectionToken");

    try {
      const response = await fetch(`${SERVER_URL}/users/${userId}/favorites`, {
        headers: {
          Authorization: token,
        },
      });

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
