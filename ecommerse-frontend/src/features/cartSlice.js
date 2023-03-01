import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: localStorage.getItem("persist:root")
    ? JSON.parse(localStorage.getItem("persist:root"))
    : [],
  totalQuantity: 0,
  totalPrice: 0,
};
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToProduct: (state, action) => {
      const itemIndex = state.cart.find(
        (item) => item._id === action.payload._id
      );
      if (itemIndex) {
        itemIndex.cartQuantity += action.payload.cartQuantity;
      } else {
        state.cart.push(action.payload);
      }
    },
    addProduct: (state, action) => {
      const itemIndex = state.cart.findIndex(
        (item) => item._id === action.payload._id
      );
      if (itemIndex >= 0) {
        state.cart[itemIndex].cartQuantity += 1;
      } else {
        const tempProduct = { ...action.payload, cartQuantity: 1 };
        state.cart.push(tempProduct);
      }
    },
    removeFromCart(state, action) {
      const nextCartItems = state.cart.filter(
        (item) => item._id !== action.payload._id
      );
      state.cart = nextCartItems;
    },
    decreaseTCart(state, action) {
      const itemIndex = state.cart.findIndex(
        (item) => item._id === action.payload._id
      );
      if (state.cart[itemIndex].cartQuantity > 1) {
        state.cart[itemIndex].cartQuantity -= 1;
      } else if (state.cart[itemIndex].cartQuantity === 1) {
        const nextCartItems = state.cart.filter(
          (item) => item._id !== action.payload._id
        );
        state.cart = nextCartItems;
      }
    },

    getTotals(state, action) {
      let { total, quantity } = state.cart.reduce(
        (cartTotal, cartItem) => {
          const { price, cartQuantity } = cartItem;
          const itemTotal = price * cartQuantity;
          cartTotal.total += itemTotal;
          cartTotal.quantity += cartQuantity;
          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );
      state.totalQuantity = quantity;
      state.totalPrice = total;
    },
  },
});
export const {
  addToProduct,
  addProduct,
  removeFromCart,
  decreaseTCart,
  getTotals,
} = cartSlice.actions;
export default cartSlice.reducer;
