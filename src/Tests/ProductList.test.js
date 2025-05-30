import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../Redux/ProductSlice";
import ProductList from "../Pages/ProductList";

// Create a fresh store instance for testing
const store = configureStore({ reducer: { products: productsReducer } });

// Mock the browser fetch API
beforeAll(() => {
  global.fetch = jest.fn();
});

afterAll(() => {
  delete global.fetch;
});

test("renders and filters products", async () => {
  // 1) Arrange: fake products and categories
  const products = [
    {
      id: 1,
      title: "Test Product",
      price: 20,
      category: "electronics",
      image: "img",
      description: "desc",
    },
  ];
  const categories = ["electronics"];

  // 2) Mock fetch calls in order: first products, then categories
  global.fetch
    .mockResolvedValueOnce({ json: () => Promise.resolve(products) })
    .mockResolvedValueOnce({ json: () => Promise.resolve(categories) });

  // 3) Render the component with redux and routing
  render(
    <Provider store={store}>
      <MemoryRouter>
        <ProductList />
      </MemoryRouter>
    </Provider>
  );

  // 4) Ensure product is shown after mock loads
  const product = await screen.findByText("Test Product");
  expect(product).toBeInTheDocument();

  // 5) Simulate filtering by search
  fireEvent.change(screen.getByLabelText(/search/i), {
    target: { value: "Test" },
  });

  expect(await screen.findByText("Test Product")).toBeInTheDocument();
});
