import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  CardMedia,
  Snackbar,
  Alert,
  Stack,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite } from "../Redux/FavoriteSlice";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const favorites = useSelector((state) => state.favorites.items);
  const [product, setProduct] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  const addToFavorites = () => {
    const alreadyExists = favorites.some((p) => p.id === product.id);
    if (alreadyExists) {
      setSnackbarMessage("Already in favorites");
    } else {
      dispatch(addFavorite(product));
      setSnackbarMessage("Added to favorites!");
    }
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") return;
    setOpenSnackbar(false);
  };

  const goToFavorites = () => {
    navigate("/favorites");
  };

  if (!product) return <Typography>Loading...</Typography>;

  return (
    <Container sx={{ mt: 4 }}>
      <Card>
        <CardMedia
          component="img"
          height="200"
          image={product.image}
          alt={product.title}
          sx={{ objectFit: "contain", p: 4 }}
        />
        <CardContent>
          <Typography variant="h4">{product.title}</Typography>
          <Typography variant="h6">${product.price}</Typography>
          <Typography sx={{ my: 2 }}>{product.description}</Typography>

          <Stack direction="row" spacing={2}>
            <Button variant="contained" onClick={addToFavorites}>
              Add to Favorites
            </Button>
            <Button variant="outlined" onClick={goToFavorites}>
              Go to Favorites
            </Button>
          </Stack>
        </CardContent>
      </Card>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="info"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}
