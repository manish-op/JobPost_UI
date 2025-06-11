import React from "react";
import { Typography, Button, Box, Container, Grid, Paper } from "@mui/material";
import { Link } from "react-router-dom";
import { People, Work } from "@mui/icons-material";
import "../App.css";

const Home = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #f8f9fa, #e0f7fa)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 8,
      }}
    >
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ p: 6, borderRadius: 4, background: "#ffffffcc" }}>
          <Typography
            variant="h3"
            align="center"
            gutterBottom
            sx={{ fontWeight: "bold", color: "#1976d2" }}
          >
            Get Hired or Hire People for Free!
          </Typography>

          <Typography
            variant="h6"
            align="center"
            sx={{ color: "#555", mb: 4 }}
          >
            Connecting talent with opportunities in seconds. Whether you're looking for your dream job or the perfect candidate, you're in the right place.
          </Typography>

          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} sm={6}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                startIcon={<People />}
                component={Link}
                to="/employer/dashboard"
                sx={{ py: 1.5, fontSize: "1.1rem", borderRadius: "12px" }}
              >
                Hire Talent
              </Button>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Button
                variant="outlined"
                color="secondary"
                size="large"
                fullWidth
                startIcon={<Work />}
                component={Link}
                to="/employee/feed"
                sx={{ py: 1.5, fontSize: "1.1rem", borderRadius: "12px" }}
              >
                Get Job Now
              </Button>
            </Grid>
          </Grid>

          {/* Optional: Feature Section */}
          <Box mt={6}>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6" sx={{ fontWeight: "bold", color: "#333" }}>
                  🔍 Smart Matching
                </Typography>
                <Typography variant="body1" sx={{ color: "#666" }}>
                  Our AI matches employers with ideal candidates and vice versa in real-time.
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6" sx={{ fontWeight: "bold", color: "#333" }}>
                  💼 1000+ Jobs Posted
                </Typography>
                <Typography variant="body1" sx={{ color: "#666" }}>
                  Explore thousands of job listings updated daily across multiple industries.
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Home;
