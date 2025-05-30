import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./ProductSlice";
import favoritesReducer from "./FavoriteSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    favorites: favoritesReducer,
  },
});
