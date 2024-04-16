export const getters = {
  getTotalRestaurant: (state) => state.totalRestaurant,
  getPrice: (state) => state.price,
  getGenres: (state) => state.genres,
  getSearchTermGenre: (state) => state.searchTermGenre,
  getSearchTerm: (state) => state.searchTerm,
  getRestaurants: (state) => state.restaurants,
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
