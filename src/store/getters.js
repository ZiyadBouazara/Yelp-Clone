export const getters = {
  getTotalRestaurant: (state) => state.totalRestaurant,
  getTotalUsers: (state) => state.totalUsers,
  getPrice: (state) => state.price,
  getGenres: (state) => state.genres,
  getSearchTermGenre: (state) => state.searchTermGenre,
  getSearchTerm: (state) => state.searchTerm,
  getSearchTermUsers: (state) => state.searchTermUsers,
  getRestaurants: (state) => state.restaurants,
  getUsers: (state) => state.users,
  getUserFavorites: (state) => state.userFavorites,
  getLoggedInUser: (state) => state.loggedInUser,
  getVisits: (state) => state.visits,
  getRestaurantById: (state) => (restaurantId) => {
    return state.restaurants.find((r) => r.id === restaurantId);
  },
  getFavoriteListByName: (state) => (name) => {
    return state.userFavorites.find(
      (favoriteList) => favoriteList.name === name,
    );
  },
};
