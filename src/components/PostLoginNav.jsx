import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signOut } from "../features/auth/authSlice";

export const PostLoginNav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            onClick={() => navigate("/landing")}
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, cursor: "pointer" }}
          >
            Blogging Website
          </Typography>

          <Button
            onClick={() => {
              navigate("/myBlogs");
            }}
            color="inherit"
          >
            My Blogs
          </Button>
          <Button
            onClick={() => {
              dispatch(signOut());
              navigate("/signin");
            }}
            color="inherit"
          >
            LogOut
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
