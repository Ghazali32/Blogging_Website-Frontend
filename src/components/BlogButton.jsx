import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const BlogButton = () => {
    const navigate = useNavigate()
  return (
    <div className="w-screen flex justify-center">
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/createBlog")}
        sx={{ margin: "20px" }}
      >
        Add a new Blog
      </Button>
    </div>
  );
};
