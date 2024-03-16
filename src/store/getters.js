export const getters = {
  getTotalRestaurant: (state) => state.totalRestaurant,
  getPrice: (state) => state.price,
  getGenres: (state) => state.genres,
  getSearchTermGenre: (state) => state.searchTermGenre,
  getSearchTerm: (state) => state.searchTerm,
  getRestaurants: (state) => state.restaurants,
  getUsers: (state) => state.users,
  getUserFavorites: (state) => state.favorites,
  getImageIndex: (state) => state.imageIndex,
  getLoggedInUser: (state) => state.loggedInUser,
  getVisits: (state) => state.visits,
  getFavoritesByFavoriteListId: (state) => state.favoritesFromFavoritesListId,
  getRestaurantById: (state) => (restaurantId) => {
    return state.restaurants.find((r) => r.id === restaurantId);
  },
};
