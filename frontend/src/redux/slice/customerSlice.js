import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedMedicine: null,
  cart: { total: null, items: [] },
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    setSelectedMedicine(state, action) {
      state.selectedMedicine = action.payload;
    },
    removeSelectedMedicine(state) {
      state.selectedMedicine = null;
    },
    addToCart(state, action) {
      const { medicine, amount } = action.payload;
      const itemTotal = amount * medicine.price;
      const existingItem = state.cart.items.findIndex((item) => {
        return item.medicine.id === medicine.id;
      });

      if (existingItem !== -1) {
        state.cart.items[existingItem].amount = Number(state.cart.items[existingItem].amount) + Number(amount);
      } else {
        // Otherwise, add the new item
        state.cart.items.push({ amount, medicine });
      }

      state.cart.total = Number(state.cart.total) + Number(itemTotal);
    },
    resetCart(state) {
      state.cart.total = 0;
      state.cart.items = [];
    },
  },
});

export const { setSelectedMedicine, removeSelectedMedicine, addToCart, resetCart } = customerSlice.actions;

export default customerSlice.reducer;
