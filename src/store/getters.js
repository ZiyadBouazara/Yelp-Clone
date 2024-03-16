const getters = {
  getPrice: (state) => state.price,
  getGenres: (state) => state.genres,
  getSearchTermGenre: (state) => state.searchTermGenre,
  getSearchTerm: (state) => state.searchTerm,
  getRestaurants: (state) => state.restaurants,
  getUsers: (state) => state.users,
  getUserFavorites: (state) => state.userFavorites,
  getImageIndex: (state) => state.imageIndex,
  getRestaurantById: (state) => (restaurantId) => {
    return state.restaurants.find((r) => r.id === restaurantId);
  },
  getLoggedInUser: (state) => state.loggedInUser,
  getVisits: (state) => state.visits,
  getFavoritesByFavoriteListId: (state) => state.favoritesFromFavoritesListId,
};

export default getters;
