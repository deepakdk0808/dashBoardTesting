// src/Tests/ProductSlice.test.js

import { configureStore } from "@reduxjs/toolkit";
import productsReducer, { fetchProducts } from "../Redux/ProductSlice";

describe("productsSlice thunk (using fetch)", () => {
  // Before any tests run, replace global.fetch with a Jest mock
  beforeAll(() => {
    global.fetch = jest.fn();
  });

  // After all tests, restore the original fetch (cleanup)
  afterAll(() => {
    delete global.fetch;
  });

  it("fetches products successfully", async () => {
    // 1) Arrange: define your fake products array
    const products = [{ id: 1, title: "Test", price: 10 }];

    // 2) Make fetch() resolve to an object whose .json() returns our products
    global.fetch.mockResolvedValue({
      json: () => Promise.resolve(products),
    });

    // 3) Create a store that uses just our products slice
    const store = configureStore({
      reducer: { products: productsReducer },
    });

    // 4) Dispatch the thunk
    await store.dispatch(fetchProducts());

    // 5) Assert: after the thunk, state.items === our fake array
    const state = store.getState().products;
    expect(state.items).toEqual(products);
    expect(state.status).toBe("succeeded");

    // 6) Optional: verify fetch was called with the correct URL
    expect(global.fetch).toHaveBeenCalledWith(
      "https://fakestoreapi.com/products"
    );
  });
});
