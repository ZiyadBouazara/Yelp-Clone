export const getters = {
  getTotalRestaurant: (state) => state.totalRestaurant,
  getPrice: (state) => state.price,
  getGenres: (state) => state.genres,
  getSearchTermGenre: (state) => state.searchTermGenre,
  getSearchTerm: (state) => state.searchTerm,
  getRestaurants: (state) => state.restaurants,
  getUsers: (state) => state.users,
  getUserById: (state) => (userId) => {
    return state.users.find((r) => r.id === userId);
  },
  getUserFavorites: (state) => state.userFavorites,
  getImageIndex: (state) => state.imageIndex,
  getLoggedInUser: (state) => state.loggedInUser,
  getVisits: (state) => state.visits,
  getFavoritesByFavoriteListId: (state) => state.favoritesFromFavoritesListId,
  getRestaurantById: (state) => (restaurantId) => {
    return state.restaurants.find((r) => r.id === restaurantId);
  },
  getFavoriteListByName: (state) => (name) => {
    return state.userFavorites.find(
      (favoriteList) => favoriteList.name === name,
    );
  },
};
