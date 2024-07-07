import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  blogs: {},
  status: "idle",
  error: null,
};

export const fetchBlogs = createAsyncThunk("blogs/fetchBlogs", async () => {
  const res = await axios.get(
    "https://backend.shazebansari2536.workers.dev/api/v1/blog/bulk/all"
  );
  return res.data;
});

export const fetchMyBlogs = createAsyncThunk("blogs/myBlogs", async () => {
  const token = sessionStorage.getItem("token")
  const res = await axios.get(
    "https://backend.shazebansari2536.workers.dev/api/v1/user/blog",{
     headers : {
      'Authorization' : `Bearer ${token}`
     } 
    }
  )
  return res.data;
})



const blogsSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    resetStatus(state) {
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.blogs = action.payload;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchMyBlogs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMyBlogs.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.blogs = action.payload;
      })
      .addCase(fetchMyBlogs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
  },
});
export const { resetStatus } = blogsSlice.actions;
export default blogsSlice.reducer;
