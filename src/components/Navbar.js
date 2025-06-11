import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import "../App.css";

const Navbar = () => {
  return (
    <AppBar position="static" color="default" elevation={2}>
      <Toolbar className="navbar-toolbar">
        <Typography variant="h5" className="logo" component={Link} to="/">
          JobPost
        </Typography>

        <Box className="nav-links">
          <Button
            color="primary"
            variant="text"
            component={Link}
            to="/employer/dashboard"
            className="nav-button"
          >
            Hire Talent
          </Button>
          <Button
            color="secondary"
            variant="outlined"
            component={Link}
            to="/employee/feed"
            className="nav-button"
          >
            Get Job Now
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
