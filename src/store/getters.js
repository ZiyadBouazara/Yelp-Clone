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
  getRestaurantsByGenre: (state) => (genre) => {
    return state.restaurants.filter((restaurant) =>
      restaurant.genres.includes(genre),
    );
  },
  getFavoriteListByName: (state) => (name) => {
    return state.userFavorites.find(
      (favoriteList) => favoriteList.name === name,
    );
  },
  getVisitsByUserId: (state) => (userId) => {
    return state.visits.filter((visit) => visit.userId === userId);
  },
  getUserById: (state) => (userId) => {
    return state.users.find((user) => user.id === userId);
  },
  getFriendFollowers: (state) => (userId) => {
    return state.userFollowers.filter((follower) => follower.userId === userId);
  },
  getFriendFollowings: (state) => (userId) => {
    return state.userFollowings.filter(
      (following) => following.userId === userId,
    );
  },
  getUserFollowers: (state) => state.userFollowers,
  getUserFollowings: (state) => state.userFollowings,
};
