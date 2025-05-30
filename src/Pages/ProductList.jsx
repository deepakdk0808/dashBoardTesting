import  { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProducts,
  fetchCategories,
  setSearch,
  setCategory,
  setSort,
} from "../Redux/ProductSlice";
import { Link } from "react-router-dom";
import {
  Container,
  Card,
  CardMedia,
  CardContent,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import Grid from "@mui/material/Grid";

export default function ProductList() {
  const dispatch = useDispatch();
  const { items, categories, search, category, sort } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  const filteredProducts = items
    .filter(
      (p) =>
        p.title.toLowerCase().includes(search.toLowerCase()) &&
        (category === "all" || p.category === category)
    )
    .sort((a, b) => (sort === "asc" ? a.price - b.price : b.price - a.price));

  return (
    <Container sx={{ mt: 4 }}>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            label="Search"
            value={search}
            onChange={(e) => dispatch(setSearch(e.target.value))}
          />
        </Grid>
        <Grid item xs={6} md={4}>
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              value={category}
              onChange={(e) => dispatch(setCategory(e.target.value))}
              label="Category"
            >
              <MenuItem value="all">All</MenuItem>
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6} md={4}>
          <FormControl fullWidth>
            <InputLabel>Sort by Price</InputLabel>
            <Select
              value={sort}
              onChange={(e) => dispatch(setSort(e.target.value))}
              label="Sort by Price"
            >
              <MenuItem value="asc">Low to High</MenuItem>
              <MenuItem value="desc">High to Low</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        {filteredProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <Card
              sx={{
                width: { xs: 350, sm: 300 },
                height: { xs: "100%", sm: 300 },
                mx: "auto",
              }}
            >
              <Link
                to={`/product/${product.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <CardMedia
                  component="img"
                  height="100"
                  image={product.image}
                  alt={product.title}
                  sx={{ objectFit: "contain", p: 2 }}
                />
                <CardContent>
                  <Typography variant="subtitle1">{product.title}</Typography>
                  <Typography>${product.price}</Typography>
                </CardContent>
              </Link>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
