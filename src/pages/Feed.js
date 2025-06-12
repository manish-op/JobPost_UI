import {
  Box,
  Card,
  Grid,
  TextField,
  Typography,
  InputAdornment,
  Button,
  CardContent,
  Chip,
  Stack,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Feed = () => {
  const [query, setQuery] = useState("");
  const [post, setPost] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get(`https://jobpost-d98f.onrender.com/posts/${query}`);
      setPost(response.data);
    };

    const fetchInitialPosts = async () => {
      const response = await axios.get(`https://jobpost-d98f.onrender.com/allPosts`);
      setPost(response.data);
    };

    if (query.length === 0) fetchInitialPosts();
    if (query.length > 2) fetchPosts();
  }, [query]);

  return (
    <Box sx={{ padding: "2%", backgroundColor: "#f5f6fa", minHeight: "100vh" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "2%",
        }}
      >
        <Button variant="outlined" component={Link} to="/" sx={{ textTransform: "none" }}>
          Home
        </Button>
        <TextField
          placeholder="Search..."
          onChange={(e) => setQuery(e.target.value)}
          sx={{ width: "60%", backgroundColor: "#fff", borderRadius: 1 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Grid container spacing={3}>
        {post && post.length > 0 ? (
          post.map((p) => (
            <Grid key={p.id} item xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: "100%",
                  backgroundColor: "#ffffff",
                  borderRadius: 3,
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.05)",
                  transition: "transform 0.2s",
                  '&:hover': {
                    transform: 'translateY(-4px)',
                  }
                }}
              >
                <CardContent>
                  <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
                    {p.profile}
                  </Typography>

                  <Typography variant="body2" color="textSecondary" sx={{ marginBottom: "1rem" }}>
                    {p.desc}
                  </Typography>

                  <Typography variant="subtitle2" color="textSecondary">
                    Experience: {p.exp} year{p.exp !== 1 ? "s" : ""}
                  </Typography>

                   <Typography variant="subtitle2" color="textSecondary">
                    Company: {p.company}
                  </Typography>

                   <Typography variant="subtitle2" color="textSecondary">
                    Location: {p.location} 
                  </Typography>

                  <Box sx={{ marginY: "1rem" }}>
                    <Typography variant="subtitle2" sx={{ marginBottom: 0.5 }}>
                      Required Skills:
                    </Typography>
                    <Stack direction="row" spacing={1} flexWrap="wrap">
                      {p.techs.map((tech, index) => (
                        <Chip key={index} label={tech} variant="outlined" />
                      ))}
                    </Stack>
                  </Box>

                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() => window.open(p.url, "_blank")}
                    sx={{ textTransform: "none" }}
                  >
                    Apply Now
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography align="center" color="textSecondary">
              No job posts found.
            </Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default Feed;
