import { Typography, Button } from "@mui/material";
import React from "react";
import { BlogButton } from "../components/BlogButton";
import { Blogs } from "../components/Blogs";
import { PostLoginNav } from "../components/PostLoginNav";
import { fetchBlogs } from "../features/blogs/blogsSlice";
import { useNavigate } from "react-router-dom";

function Landing() {
  const name = sessionStorage.getItem("name");
  const navigate = useNavigate()
  return (
    <div className="flex flex-col overflow-x-hidden">
      <PostLoginNav></PostLoginNav>
      <div className="w-screen flex justify-between">
        <div className="ml-6 mt-6">
          <Typography variant="h4">Hello, {name}</Typography>
        </div>

        <div className="mr-6">
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/createBlog")}
            sx={{ margin: "20px" }}
          >
            Add a new Blog
          </Button>
        </div>
      </div>
      <Blogs word={"All"} fetchMethod={fetchBlogs}></Blogs>
    </div>
  );
}

export default Landing;
