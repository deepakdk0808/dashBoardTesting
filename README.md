# Intro
Build a React-based e-commerce frontend using functional components and hooks, with state management via Redux Toolkit. The UI leverages MUI for consistent, responsive design. All data comes from the Fake Store API.

## Available Scripts
### `npm start`
### `npm test`

## Learn More

### Product Listing Page
Fetches and displays product cards in a responsive grid.
Built with MUI’s Grid components and cards for image, title, price.

### Search, Filter & Sort
Debounced search by product title (avoids excessive API calls).
Category filter dropdown populated dynamically from API.
Price sort (low→high, high→low) via a select control.

### Product Detail Page
Shows complete details: image, title, description, price, rating.
“Add to Favorites” button dispatches an action to Redux.

### Favorites Page
Lists all favorited products (pulled from Redux store).
Allows removal from favorites with a “Remove” action.


### Unit Tests (Jest)
Slice reducers and thunks: mock fetch to verify pending/fulfilled flows.
UI components: snapshot tests and behavior tests (e.g. dispatch on input).

### Integration Tests (React Testing Library)
Full page flows:
Load products → ensure cards render
Apply search/filter/sort → verify displayed subset
Navigate to detail page → add to favorites → check store & Favorites page



