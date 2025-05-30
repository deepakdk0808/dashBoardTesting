import { configureStore } from "@reduxjs/toolkit";
import productsReducer, { fetchProducts } from "../Redux/ProductSlice";

describe("productsSlice thunk (using fetch)", () => {
  beforeAll(() => {
    global.fetch = jest.fn();
  });

  afterAll(() => {
    delete global.fetch;
  });

  it("fetches products successfully", async () => {
    const products = [{ id: 1, title: "Test", price: 10 }];
    global.fetch.mockResolvedValue({
      json: () => Promise.resolve(products),
    });
    const store = configureStore({
      reducer: { products: productsReducer },
    });
    await store.dispatch(fetchProducts());
    const state = store.getState().products;
    expect(state.items).toEqual(products);
    expect(state.status).toBe("succeeded");
    expect(global.fetch).toHaveBeenCalledWith(
      "https://fakestoreapi.com/products"
    );
  });
});
