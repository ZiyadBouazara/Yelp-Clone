import { mapGetters } from "vuex";

export const homePageComputed = {
  filteredCardData() {
    const priceSelected = this.$store.getters.getPrice;
    const filterSelected = this.$store.getters.getGenres;
    const searchTerm = this.$store.getters.getSearchTerm;
    const searchGenre = this.$store.getters.getSearchTermGenre;

    let filteredRestaurants = this.restaurants.filter((cardItem) => {
      const hasMatchingName = cardItem.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const hasMatchingGenre = cardItem.genres.some((genre) =>
        genre.toLowerCase().includes(searchGenre.toLowerCase()),
      );
      const filterSelectedd =
        filterSelected.length === 0 ||
        cardItem.genres.some((genre) =>
          filterSelected.some((selected) =>
            genre.toLowerCase().includes(selected.toLowerCase()),
          ),
        );
      if (!priceSelected) {
        return hasMatchingName && hasMatchingGenre && filterSelectedd;
      }

      const priceRangeSymbol = this.getPriceRangeSymbol(cardItem.price_range);
      const filteredPrice = priceRangeSymbol === priceSelected;

      return (
        hasMatchingName && hasMatchingGenre && filterSelectedd && filteredPrice
      );
    });
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return filteredRestaurants.slice(startIndex, endIndex);
  },
  ...mapGetters(["getTotalRestaurant"]),
  totalRestaurants() {
    return this.getTotalRestaurant;
  },
  ...mapGetters(["getRestaurants"]),
  restaurants() {
    return this.getRestaurants;
  },
  ...mapGetters(["getUsers"]),
  users() {
    return this.getUsers;
  },
  totalPages() {
    return Math.ceil(this.totalRestaurants / this.itemsPerPage);
  },
};
