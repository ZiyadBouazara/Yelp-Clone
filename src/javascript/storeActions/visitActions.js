import Cookies from "js.cookie";

const SERVER_URL = "https://ufoodapi.herokuapp.com";
const LIMIT = 1000;

export const visitActions = {
  async createVisit({ commit, dispatch }, { userId, visitData }) {
    const token = Cookies.get("connectionToken");

    try {
      await fetch(`${SERVER_URL}/users/${userId}/restaurants/visits`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(visitData),
      });

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

      return await response.json();
    } catch (error) {
      console.error(`Error fetching visits for restaurant:`, error);
    }
  },
};
