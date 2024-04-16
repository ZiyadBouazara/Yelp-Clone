import { authActions } from "@/store/actions/authActions";
import { favoriteActions } from "@/store/actions/favoriteActions";
import { restaurantActions } from "@/store/actions/restaurantActions";
import { updateActions } from "@/store/actions/updateActions";
import { userActions } from "@/store/actions/userActions";
import { visitActions } from "@/store/actions/visitActions";

export const actions = {
  ...authActions,
  ...favoriteActions,
  ...restaurantActions,
  ...updateActions,
  ...userActions,
  ...visitActions,
};
