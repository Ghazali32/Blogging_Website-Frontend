import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Landing from "./pages/Landing";
import SignIn from "./pages/SignIn";
import { MyBlogs } from "./pages/MyBlogsPage";
import { BlogsDetails } from "./pages/BlogsDetails";
import { AddBlogs } from "./pages/CreateBlogPage";
import { UpdateBlogs } from "./pages/UpdatingBlogPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/signin" element={<SignIn></SignIn>} />
        <Route path = "/landing" element={<Landing></Landing>}/>
        <Route path = "/myBlogs" element={<MyBlogs />}/>
        <Route path = "/blogsDetail" element={<BlogsDetails />}/>
        <Route path = "/createBlog" element={<AddBlogs />}/>
        <Route path = "/updateBlog" element={<UpdateBlogs />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
