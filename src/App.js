import { Routes, Route } from "react-router-dom";
import ProductList from "./Pages/ProductList";
import ProductDetail from "./Pages/ProductDetail";
import Favorites from "./Pages/Favorites";
import Navbar from "./Pages/Navbar";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </>
  );
}
