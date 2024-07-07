import { configureStore } from '@reduxjs/toolkit';
import blogsReducer from '../features/blogs/blogsSlice';
import authReducer from '../features/auth/authSlice';
export const store = configureStore({
  reducer: {
    blogs: blogsReducer,
    auth: authReducer,
  }
});
