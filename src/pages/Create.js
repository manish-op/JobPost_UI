import React, { useState } from "react";
import { Typography, TextField, Button, Paper, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

// Define constants outside the component for clarity and to prevent re-creation on re-renders
const INITIAL_FORM_STATE = { profile: "", exp: 0, techs: [], desc: "" };
const SKILL_SET_OPTIONS = [
  { name: "Javascript" },
  { name: "Java" },
  { name: "Python" },
  { name: "Django" },
  { name: "Rust" },
  { name: "Springboot" },
];

const Create = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState(INITIAL_FORM_STATE);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation example
    if (!form.profile || form.exp < 0 || !form.desc || !form.url) {
      alert("Please fill in all required fields correctly.");
      return;
    }

    fetch("http://localhost:8080/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then(async (response) => {
        // Added async for await response.text() in error case
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(
            errorText || `HTTP error! status: ${response.status}`
          );
        }

        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          return response.json(); // Parse JSON if server sends JSON
        }
        return null;
      })
      .then((data) => {
        console.log("Success:", data);
        // Navigate only *after* the post is successfully created and response processed
        navigate("/employee/feed");
      })
      .catch((error) => {
        console.error("Error creating post:", error);
        // Optionally, display an error message to the user on the UI
        alert(`Failed to create post: ${error.message}`);
      });
  };

  const { profile, exp, desc, url, company, location } = form;

  const handleTechChange = (e) => {
    const { value, checked } = e.target;
    setForm((prevForm) => {
      if (checked) {
        // Add the skill if checked
        return { ...prevForm, techs: [...prevForm.techs, value] };
      } else {
        // Remove the skill if unchecked
        return {
          ...prevForm,
          techs: prevForm.techs.filter((tech) => tech !== value),
        };
      }
    });
  };

  return (
    <Paper sx={{ padding: "2%" }} elevation={3}>
      <Typography sx={{ margin: "3% auto" }} align="center" variant="h5">
        Create New Post
      </Typography>
      <form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <TextField
            type="string"
            sx={{ width: "50%", margin: "2% auto" }}
            required
            onChange={(e) => setForm({ ...form, profile: e.target.value })}
            label="Job-profile"
            variant="outlined"
            value={profile}
          />
          <TextField
            min="0"
            type="number"
            sx={{ width: "50%", margin: "2% auto" }}
            required
            onChange={(e) => setForm({ ...form, exp: e.target.value })}
            label="Years of Experience"
            variant="outlined"
            value={exp}
          />
          <TextField
            type="string"
            sx={{ width: "50%", margin: "2% auto" }}
            required
            multiline
            rows={4}
            onChange={(e) => setForm({ ...form, desc: e.target.value })}
            label="Job-desc"
            variant="outlined"
            value={desc}
          />

          <TextField
            type="string"
            sx={{ width: "50%", margin: "2% auto" }}
            required
            onChange={(e) => setForm({ ...form, company: e.target.value })}
            label="Company Name"
            variant="outlined"
            value={company}
          />

          <TextField
            type="string"
            sx={{ width: "50%", margin: "2% auto" }}
            required
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            label="Location"
            variant="outlined"
            value={location}
          />
          <TextField
            type="string"
            sx={{ width: "50%", margin: "2% auto" }}
            required
            onChange={(e) => setForm({ ...form, url: e.target.value })}
            label="Apply Link"
            variant="outlined"
            value={url}
          />

          <Box sx={{ margin: "1% auto" }}>
            <h3>Please mention required skills</h3>
            <ul>
              {SKILL_SET_OPTIONS.map(({ name }, index) => {
                return (
                  <li key={index}>
                    <div>
                      <div>
                        <input
                          type="checkbox"
                          id={`custom-checkbox-${index}`}
                          name={name}
                          value={name}
                          onChange={handleTechChange}
                        />
                        <label htmlFor={`custom-checkbox-${index}`}>
                          {name}
                        </label>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </Box>
          <Button
            sx={{ width: "50%", margin: "2% auto" }}
            variant="contained"
            type="submit"
          >
            Submit
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default Create;
