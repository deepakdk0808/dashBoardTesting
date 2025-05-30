import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <AppBar position="static"
    sx={{
        borderRadius:5,
    }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Product Dashboard
        </Typography>
        <Box>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/favorites">
            Favorites
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
