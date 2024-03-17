export const baseRestaurantCardsMethods = {
  getColorBasedOnNumber(number) {
    if (number >= 1 && number < 2) {
      return "rgb(255, 204, 75)";
    } else if (number >= 2 && number < 3) {
      return "rgb(255, 135, 66)";
    } else if (number >= 3) {
      return "rgb(251, 67, 60)";
    }
  },
  getDisplayHours() {
    const currentDay = this.getCurrentDay();
    if (
      !this.restaurantHour[currentDay] ||
      this.restaurantHour[currentDay] === "null"
    ) {
      return "Closed today";
    } else if (this.isRestaurantOpen()) {
      const [openingHour, closingHour] =
        this.restaurantHour[currentDay].split("-");
      return "until " + closingHour;
    } else {
      const [openingHour, closingHour] =
        this.restaurantHour[currentDay].split("-");
      return "until " + openingHour;
    }
  },
  isRestaurantOpen() {
    const currentDay = this.getCurrentDay();

    if (
      !this.restaurantHour[currentDay] ||
      this.restaurantHour[currentDay] === "null"
    ) {
      return false;
    }

    const [openingHour, closingHour] =
      this.restaurantHour[currentDay].split("-");

    if (openingHour && closingHour) {
      const [openHours, openMinutes] = openingHour.split(":").map(Number);
      const [closeHours, closeMinutes] = closingHour.split(":").map(Number);

      const currentMinutes =
        new Date().getHours() * 60 + new Date().getMinutes();
      const openingMinutes = openHours * 60 + openMinutes;
      let closingMinutes = closeHours * 60 + closeMinutes;

      if (closingMinutes < openingMinutes) {
        closingMinutes += 24 * 60;
      }

      return (
        currentMinutes >= openingMinutes && currentMinutes <= closingMinutes
      );
    }

    return false;
  },
  getCurrentDay() {
    const days = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ];
    const currentDayIndex = new Date().getDay();
    return days[currentDayIndex];
  },
  incrementeIndex() {
    this.imageIndex = (this.imageIndex + 1) % this.picture.length;
    this.$store.dispatch("updateImageIndex", this.imageIndex);
  },
  decrementeIndex() {
    this.imageIndex =
      (this.imageIndex - 1 + this.picture.length) % this.picture.length;
    this.$store.dispatch("updateImageIndex", this.imageIndex);
  },
};
