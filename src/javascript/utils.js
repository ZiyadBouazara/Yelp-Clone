export const utils = {
  isRestaurantOpen() {
    const currentDay = this.getCurrentDay();
    if (
      !this.restaurantHour ||
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
};
