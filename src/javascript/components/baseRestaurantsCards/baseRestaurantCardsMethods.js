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
    if (this.isRestaurantOpen()) {
      const [openingHour, closingHour] =
        this.restaurantHour[currentDay].split("-");
      return closingHour;
    } else {
      const [openingHour, closingHour] =
        this.restaurantHour[currentDay].split("-");
      return openingHour;
    }
  },
  isRestaurantOpen() {
    const currentDay = this.getCurrentDay();
    const currentTime = `${new Date().getHours()}:${new Date().getMinutes()}`;

    if (this.restaurantHour[currentDay]) {
      const [openingHour, closingHour] =
        this.restaurantHour[currentDay].split("-");

      const isOpen =
        this.compareTimes(currentTime, openingHour) >= 0 &&
        this.compareTimes(currentTime, closingHour) <= 0;
      return isOpen;
    }

    return false;
  },
  compareTimes(time1, time2) {
    const [hours1, minutes1] = time1.split(":").map(Number);
    const [hours2, minutes2] = time2.split(":").map(Number);

    if (hours1 !== hours2) {
      return hours1 - hours2;
    } else {
      return minutes1 - minutes2;
    }
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
