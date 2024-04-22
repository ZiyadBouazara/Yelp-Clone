import Cookies from "js.cookie";
import state from "@/store/state";

const SERVER_URL = "https://ufoodapi.herokuapp.com";

export const userActions = {
  async getTotalValueUsers({ commit }) {
    const token = Cookies.get("connectionToken");

    try {
      const response = await fetch(`${SERVER_URL}/users`, {
        headers: {
          Authorization: token,
        },
      });

      const jsonResponse = await response.json();
      commit("SET_TOTAL_USERS", jsonResponse.total);
    } catch (error) {
      console.error("Error getting total value:", error);
      throw error;
    }
  },
  async fetchUsers({ commit }) {
    const token = Cookies.get("connectionToken");

    try {
      const response = await fetch(
        `${SERVER_URL}/users?limit=${state.totalUsers}`,
        {
          headers: {
            Authorization: token,
          },
        },
      );

      const rawJsonResponse = await response.json();

      const users = rawJsonResponse.items.map((user) => {
        const parsedUser = { ...user };
        parsedUser.name = parsedUser.name.replace(/["'\\]/g, "");
        parsedUser.email = parsedUser.email.replace(/["'\\]/g, "");
        return parsedUser;
      });
      //console.log("users fetched: " + JSON.stringify(users));
      commit("SET_USERS", users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  },

  async fetchFollowersForUser({ state }, userId) {
    const token = Cookies.get("connectionToken");

    try {
      const response = await fetch(`${SERVER_URL}/users/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      const rawJsonResponse = await response.json();
      console.log(rawJsonResponse.followers);
      return await rawJsonResponse.followers;
    } catch (error) {
      console.error("Error fetching followers:", error);
    }
  },

  async fetchFollowingForUser({ state }) {
    const token = Cookies.get("connectionToken");
    const userId = state.loggedInUser.id;
    try {
      const response = await fetch(`${SERVER_URL}/users/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      const rawJsonResponse = await response.json();
      console.log(rawJsonResponse.following);
      return await rawJsonResponse.following;
    } catch (error) {
      console.error("Error fetching following:", error);
    }
  },

  async followAUser({ commit, dispatch }, followerId) {
    const token = Cookies.get("connectionToken");
    try {
      const response = await fetch(`${SERVER_URL}/follow`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ id: followerId }),
      });
      if (response.ok) {
        const responseData = await response.json();
        commit("ADD_TO_FOLLOWINGS", followerId);
        return responseData;
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error following user:", error);
    }
  },
  async unfollowAUser({ commit, dispatch }, followerId) {
    const token = Cookies.get("connectionToken");
    const userId = state.loggedInUser.id;

    try {
      const response = await fetch(`${SERVER_URL}/follow/${followerId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ id: followerId }),
      });
      if (response.ok) {
        commit("REMOVE_FROM_FOLLOWINGS", followerId);
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error unfollowing user:", error);
    }
  },
};
