export const updateActions = {
  updatePrice({ commit }, newPrice) {
    commit("SET_PRICE", newPrice);
  },
  addSelectedFilter({ commit }, newItem) {
    commit("ADD_TO_GENRE_ARRAY", newItem);
  },
  removeGenre({ commit, state }, removedItem) {
    if (state.genres.includes(removedItem)) {
      commit("REMOVE_FROM_GENRE_ARRAY", removedItem);
    }
  },
  updateSearchTermGenre({ commit }, searchTermGenre) {
    commit("SET_SEARCH_TERM_GENRE", searchTermGenre);
  },
  updateSearchTerm({ commit }, searchTerm) {
    commit("SET_SEARCH_TERM", searchTerm);
  },
  updateSearchUserTerm({ commit }, searchTerm) {
    commit("SET_SEARCH_USERS", searchTerm);
  },
  updateImageIndex({ commit }, imageIndex) {
    commit("SET_IMAGE_INDEX", imageIndex);
  },
};
