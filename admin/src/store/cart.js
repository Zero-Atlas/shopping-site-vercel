import { createSlice } from "@reduxjs/toolkit";

const initCart = {
  listCart: JSON.parse(localStorage.getItem("listCart")) || [],
};

const Cart = createSlice({
  name: "cart",
  initialState: initCart,
  reducers: {
    add(state, action) {
      const currentList = JSON.parse(localStorage.getItem("listCart")) || [];
      const productIndex = currentList.findIndex(
        (p) => p.product._id === action.payload.product._id
      );

      if (productIndex === -1) {
        currentList.push({
          product: action.payload.product,
          quantity: action.payload.quantity,
        });
      } else {
        currentList[productIndex].quantity += action.payload.quantity;
      }

      state.listCart = currentList;
      localStorage.setItem("listCart", JSON.stringify(currentList));
    },
    update(state, action) {
      const currentList = JSON.parse(localStorage.getItem("listCart")) || [];
      const index = action.payload.index;
      currentList[index].quantity += action.payload.update;

      state.listCart = currentList;
      localStorage.setItem("listCart", JSON.stringify(currentList));
    },
    delete(state, action) {
      const currentList = JSON.parse(localStorage.getItem("listCart")) || [];
      const index = action.payload;
      currentList.splice(index, 1);

      state.listCart = currentList;
      localStorage.setItem("listCart", JSON.stringify(currentList));
    },
    destroy(state, action) {
      state.listCart = [];
      localStorage.removeItem("listCart");
    },
  },
});
export const cartActions = Cart.actions;
export default Cart.reducer;
