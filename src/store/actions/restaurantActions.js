import Cookies from "js.cookie";

const SERVER_URL = "https://ufoodapi.herokuapp.com";

export const restaurantActions = {
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

      const jsonResponse = await response.json();
      commit("SET_RESTAURANTS", jsonResponse.items);
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    }
  },
};
