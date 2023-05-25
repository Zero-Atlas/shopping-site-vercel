import { configureStore } from "@reduxjs/toolkit";

import popupReducer from "./popup";
import cartReducer from "./cart";

const store = configureStore({
  reducer: { popup: popupReducer, cart: cartReducer },
});

export default store;
