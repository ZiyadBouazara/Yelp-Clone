import { createStore } from "vuex";
import { mutations } from "./mutations";
import { actions } from "./actions";
import { getters } from "./getters";
import state from "./state";

export default createStore({
  state,
  mutations,
  actions,
  getters,
});
