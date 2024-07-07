import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { resetStatus } from "../features/blogs/blogsSlice";
import { styled } from "@mui/system";
import { Edit, Delete } from "@mui/icons-material";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Blogs = ({ word, fetchMethod }) => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs.blogs);
  const status = useSelector((state) => state.blogs.status);
  const error = useSelector((state) => state.blogs.error);
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    // Reset the status to "idle" when the component mounts or fetchMethod changes
    dispatch(resetStatus());
  }, [fetchMethod, dispatch]);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchMethod());
    }
  }, [status, dispatch, fetchMethod]);

  useEffect(()=>{
    if(word === "My")
    {
      setTrigger(true);
    }
  },[])

  let content;

  if (status === "loading") {
    content = <CircularProgress />;
  } else if (status === "succeeded") {
    content = Array.isArray(blogs.blogs) ? (
      <Grid container spacing={4}>
        {blogs.blogs.map((blog) => (
          <BlogCard
            blog={blog}
            id={blog.id}
            title={blog.title}
            content={blog.content}
            trigger = {trigger}
          ></BlogCard>
        ))}
      </Grid>
    ) : (
      <Typography>No blogs found.</Typography>
    );
  } else if (status === "failed") {
    content = <Typography>{error}</Typography>;
  }

  return (
    <div className="w-screen flex flex-col">
      <Typography sx={{
        ml:3,
        mt:5
      }} variant="h4" component="h1" gutterBottom>
        {word} Blogs
      </Typography>
      <div dlassName={'flex gap-4 m-10'}>{content}</div>
    </div>
  );
};

function BlogCard({ blog, id, title, content, trigger }) {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const StyledCard = styled(Card)(({ theme }) => ({
    transition: "background-color 0.3s ease",
    "&:hover": {
      backgroundColor: "#e3f2fd",
    },
  }));
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/blogsDetail", {
      state: {
        id: id,
        title: title,
        content: content,
      },
    });
  };

  const handleEdit = async () => {
    navigate('/updateBlog', {
      state: {
        id : id,
      }
    })
  };

  const handleDelete = async () => {
    try {
      const res = await axios.delete(
        "https://backend.shazebansari2536.workers.dev/api/v1/user/delete",
        {
          data: { id },
        }
      );
      if (res.status === 200) {
        setSuccess("Blog Deleted Successfully!");
        setTimeout(() => {
          window.location.reload();
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

  return (
    <Grid item key={blog.id} xs={12} sm={6} md={4}>
      <StyledCard
        onClick={handleClick}
        style={{ cursor: "pointer", position: "relative", margin: "10px" }}
      >
        <CardContent>
          <div className="w-20 ">
          {
            trigger?<IconButton
            aria-label="edit"
            onClick={(e) => {
              e.stopPropagation();
              handleEdit();
            }}
            style={{ position: "absolute", top: 5, right: 5 }}
          >
            <Edit />
          </IconButton>:<div></div>
          }
          <IconButton
            aria-label="delete"
            onClick={(e) => {
              e.stopPropagation();
              handleDelete();
            }}
            style={{ position: "absolute", top: 5, right: 36 }}
          >
            <Delete />
          </IconButton>
          </div>
          <Typography variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {content}
          </Typography>
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
        </CardContent>
      </StyledCard>
    </Grid>
  );
}
