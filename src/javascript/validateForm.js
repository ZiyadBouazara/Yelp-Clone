import store from "@/store";

export const validateForm = {
  validateFirstName(firstName) {
    if (firstName.trim() === "") {
      return "Please enter your first name.";
    } else if (firstName.length < 2 || firstName.length > 30) {
      return "First name must be between 2 and 30 characters.";
    } else if (!/^[a-zA-Z]+$/.test(firstName)) {
      return "First name can only contain letters.";
    }
    return true;
  },

  validateLastName(lastName) {
    if (lastName.trim() === "") {
      return "Please enter your last name.";
    } else if (lastName.length < 2 || lastName.length > 50) {
      return "Last name must be between 2 and 50 characters.";
    } else if (!/^[a-zA-Z]+$/.test(lastName)) {
      return "Last name can only contain letters.";
    }
    return true;
  },

  validateEmail(email) {
    if (email.trim() === "") {
      return "Please enter your email address.";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      return "Please enter a valid email address.";
    }
    return true;
  },

  validatePassword(password) {
    if (password.trim() === "") {
      return "Please enter a password.";
    } else if (password.length < 8) {
      return "Password must be at least 8 characters long.";
    }
    return true;
  },

  validateLoginForm() {
    const isLoginValid = store.state.loggedInUser;
    if (!isLoginValid) {
      return "Invalid username or password.";
    }

    return true;
  },
};
