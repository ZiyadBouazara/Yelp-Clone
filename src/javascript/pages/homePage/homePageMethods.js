export const homePageMethods = {
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  },
  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  },
  goToPage() {
    const pageNumber = parseInt(this.inputPage);
    if (pageNumber >= 1 && pageNumber <= this.totalPages) {
      this.currentPage = pageNumber;
    } else {
      alert("Please enter a valid page number.");
    }
  },
  getPriceRangeSymbol(priceRange) {
    switch (priceRange) {
      case 1:
        return "$";
      case 2:
        return "$$";
      case 3:
        return "$$$";
      default:
        return " ";
    }
  },
  openAuthenticationModal() {
    this.isModalVisible = true;
  },
  getRestaurant(restaurant) {
    const restaurantId = restaurant.id;
    return this.$store.getters.getRestaurantById(restaurantId);
  },
};
