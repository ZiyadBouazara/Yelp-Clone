import { createStore } from "vuex";
import { mutations } from "./mutations";
import { actions } from "./actions";
import { getters } from "./getters";

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
    totalRestaurant: 0,
  },
  mutations,
  actions,
  getters,
});
