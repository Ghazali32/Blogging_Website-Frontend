import React, { useState } from "react";
import { useLocation,useNavigate } from "react-router-dom";
import { Edit, Delete } from "@mui/icons-material";
import {
  Container,
  Typography,
  CardContent,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { PostLoginNav } from "../components/PostLoginNav";
import { BlogButton } from "../components/BlogButton";
import axios from "axios";
export const BlogsDetails = () => {
  const location = useLocation();
  const state = location.state;
  console.log(state);

  return (
    <div>
      <PostLoginNav></PostLoginNav>
      <div className="m-5">
        <BlogCard state={state}></BlogCard>
      </div>
    </div>
  );
};

function BlogCard({ state }) {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const id = state.id

  const handleDelete = async () => {
    try {
      const res = await axios.delete(
        "https://backend.shazebansari2536.workers.dev/api/v1/user/delete",
        {
          data: { id : state.id },
        }
      );
      if (res.status === 200) {
        setSuccess("Blog Deleted Successfully!");
        setTimeout(() => {
          navigate('/myBlogs')
        }, 1000);
      } else {
        setError(res.data.errorMsg);
      }
    } catch (e) {
      setError("An error occurred: " + e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    navigate('/updateBlog',{
      state : {
        id : id
      }
    })
  }

  

  return (
    <Container>
      <div className={"flex justify-between relative"}>
        <Typography variant="h3" component="h1" gutterBottom>
          Blog Details
        </Typography>
        <div>
          <IconButton
            aria-label="edit"
            onClick={(e) => {
              handleEdit()
              e.stopPropagation();
            }}
            style={{ position: "absolute", top: 5, right: 5 }}
          >
            <Edit />
          </IconButton>
          <IconButton
            aria-label="delete"
            onClick={(e) => {
              handleDelete();
              e.stopPropagation();
            }}
            style={{ position: "absolute", top: 5, right: 36 }}
          >
            <Delete />
          </IconButton>
        </div>
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
        {loading && <CircularProgress size={24} sx={{ ml: 2 }} />}
      </div>

      <CardContent>
        <Typography variant="h4" component="div">
          {state.title}
        </Typography>
        <div className="mt-3">
          <Typography variant="body1" color="text.secondary">
            {state.content}
          </Typography>
        </div>
      </CardContent>
      <BlogButton />
    </Container>
  );
}
