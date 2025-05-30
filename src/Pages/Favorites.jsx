import { useSelector, useDispatch } from "react-redux";
import {
  Container,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { removeFavorite } from "../Redux/FavoriteSlice";

export default function Favorites() {
  const favorites = useSelector((state) => state.favorites.items);
  const dispatch = useDispatch();

  const handleRemove = (id) => {
    dispatch(removeFavorite(id));
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Grid
        container
        spacing={2}
        sx={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {favorites.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                width: {
                  xs: 350,
                  sm: 300,
                },
                height: {
                  xs: "100%",
                  sm: 300,
                },
                mx: "auto",
              }}
            >
              <CardMedia
                component="img"
                height="100"
                image={product.image}
                alt={product.title}
                sx={{ objectFit: "contain", p: 2 }}
              />
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  flexGrow: 1,
                }}
              >
                <Typography variant="subtitle1">{product.title}</Typography>
                <Typography>${product.price}</Typography>
                <Button
                  color="error"
                  variant="outlined"
                  onClick={() => handleRemove(product.id)}
                  sx={{ mt: "auto" }}
                >
                  Remove
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
