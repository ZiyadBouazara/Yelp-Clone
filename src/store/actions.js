import { authActions } from "@/javascript/storeActions/authActions";
import { favoriteActions } from "@/javascript/storeActions/favoriteActions";
import { restaurantActions } from "@/javascript/storeActions/restaurantActions";
import { updateActions } from "@/javascript/storeActions/updateActions";
import { userActions } from "@/javascript/storeActions/userActions";
import { visitActions } from "@/javascript/storeActions/visitActions";

export const actions = {
  ...authActions,
  ...favoriteActions,
  ...restaurantActions,
  ...updateActions,
  ...userActions,
  ...visitActions,
};
