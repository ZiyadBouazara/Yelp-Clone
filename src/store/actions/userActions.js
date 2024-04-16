import Cookies from "js.cookie";

const SERVER_URL = "https://ufoodapi.herokuapp.com";

export const userActions = {
  async fetchUsers({ commit }) {
    const token = Cookies.get("connectionToken");

    try {
      const response = await fetch(`${SERVER_URL}/users`, {
        headers: {
          Authorization: token,
        },
      });

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
};
