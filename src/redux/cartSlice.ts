// redux/cartSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "./productsSlice";
import { RootState } from "./store";

interface CartProduct extends Product {
  quantity: number;
}

interface CartState {
  products: CartProduct[];
}

const initialState: CartState = {
  products: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProductToCart(state, action: PayloadAction<Product>) {
      const product = action.payload;
      const existingProduct = state.products.find((p) => p.id === product.id);

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.products.push({ ...product, quantity: 1 });
      }
    },
    updateProductQuantity(
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) {
      const { id, quantity } = action.payload;
      const product = state.products.find((p) => p.id === id);

      if (product) {
        product.quantity = quantity;
        if (product.quantity <= 0) {
          state.products = state.products.filter((p) => p.id !== id);
        }
      }
    },
    removeProductFromCart(state, action: PayloadAction<number>) {
      state.products = state.products.filter((p) => p.id !== action.payload);
    },
  },
});

export const selectCartProducts = (state: RootState) => state.cart.products;

export const {
  addProductToCart,
  updateProductQuantity,
  removeProductFromCart,
} = cartSlice.actions;
export default cartSlice.reducer;
