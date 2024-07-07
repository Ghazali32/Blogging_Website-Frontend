import React from "react";
import { Blogs } from "../components/Blogs";
import { fetchMyBlogs } from "../features/blogs/blogsSlice";
import { PostLoginNav } from "../components/PostLoginNav";

import { BlogButton } from "../components/BlogButton";
export const MyBlogs = () => {
  return (
    <div className="overflow-x-hidden">
      <PostLoginNav />
      <Blogs word="My" fetchMethod={fetchMyBlogs} />
      <BlogButton></BlogButton>
    </div>
  );
};
