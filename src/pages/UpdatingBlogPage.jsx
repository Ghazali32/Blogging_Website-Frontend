import React, { useState } from "react";
import { PostLoginNav } from "../components/PostLoginNav";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";

export const UpdateBlogs = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();
  const location = useLocation()
  const id = location.state.id;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await axios.put(
        `https://backend.shazebansari2536.workers.dev/api/v1/user/blog/id=${id}`,
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setSuccess("Blog Updated Successfully!");
        setTimeout(() => {
          navigate("/myBlogs");
        }, 2000);
      } else {
        setError(response.data.errorMsg || "Failed to Update blog");
      }
    } catch (e) {
      setError("An error occurred: " + e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <PostLoginNav></PostLoginNav>
      <Container maxWidth="sm">
        <Box sx={{ mt: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Update your Blog
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Title"
              variant="outlined"
              fullWidth
              margin="normal"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <TextField
              label="Content"
              variant="outlined"
              fullWidth
              margin="normal"
              multiline
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
            {error && (
              <Typography variant="body2" color="error" sx={{ mt: 2 }}>
                {error}
              </Typography>
            )}
            {success && (
              <Typography variant="body2" color="success.main" sx={{ mt: 2 }}>
                {success}
              </Typography>
            )}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mt: 2,
              }}
            >
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
              >
                Update
              </Button>
              {loading && <CircularProgress size={24} sx={{ ml: 2 }} />}
            </Box>
          </form>
        </Box>
      </Container>
    </div>
  );
};
