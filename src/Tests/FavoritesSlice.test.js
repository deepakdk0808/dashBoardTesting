import favoritesReducer, {
  addFavorite,
  removeFavorite,
} from "../Redux/FavoriteSlice";

describe("favoritesSlice", () => {
  const product = { id: 1, title: "Test Product" };

  let initialState;

  beforeEach(() => {
    initialState = { items: [] };
  });

  it("adds a favorite", () => {
    const nextState = favoritesReducer(initialState, addFavorite(product));
    expect(nextState.items).toEqual([product]);
  });

  it("does not add a duplicate favorite", () => {
    const preloaded = { items: [product] };
    const nextState = favoritesReducer(preloaded, addFavorite(product));
    expect(nextState.items).toEqual([product]);
  });

  it("removes a favorite", () => {
    const preloaded = { items: [{ id: 1 }, { id: 2 }] };
    const nextState = favoritesReducer(preloaded, removeFavorite(1));
    expect(nextState.items).toEqual([{ id: 2 }]);
  });
});
