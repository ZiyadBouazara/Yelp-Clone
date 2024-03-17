export const baseRestaurantCardsComputed = {
  getRatingFloor() {
    if (
      typeof this.restaurantRating === "number" &&
      !isNaN(this.restaurantRating)
    ) {
      return Number(this.restaurantRating.toFixed(1));
    } else {
      return 0;
    }
  },
  displayPriceRangeSymbol() {
    const priceRange = this.restaurantPriceRange;
    return "$".repeat(priceRange);
  },
  displayRatingSymbol() {
    const array = Math.round(this.restaurantRating);
    return Array.from({ length: array }, () => "star");
  },
  currentPicture() {
    if (this.picture && this.picture.length > 0) {
      return this.picture[this.imageIndex % this.picture.length];
    } else {
      return null;
    }
  },
  loggedInUser() {
    return this.$store.state.loggedInUser;
  },
};
