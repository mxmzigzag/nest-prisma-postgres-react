import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useAuth } from "./hooks/useAuth";

import { ProtectedRoute } from "./features/ProtectedRoute/ProtectedRoute";
import Header from "./components/ui/header";
import Home from "./pages/home";
import Login from "./pages/login";
import Registration from "./pages/registration";
import ErrorPage from "./pages/errorPage";
import Profile from "./pages/profile";
import MyPosts from "./pages/myPosts";
import Category from "./pages/category";
import Footer from "./components/ui/footer";
import AllPosts from "./pages/allPosts";
import AllUsers from "./pages/allUsers";
import Requests from "./pages/Requests";
import AddPostBtn from "./components/ui/addPostBtn";
import Categories from "./pages/categories";
import Post from "./pages/post";

export default function App() {
  const { user } = useAuth();

  return (
    <div className="app-wrapper">
      <BrowserRouter>
        <Header />
        <div className="app-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute isAllowed={Boolean(user)}>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile/posts"
              element={
                <ProtectedRoute isAllowed={Boolean(user)}>
                  <MyPosts />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/posts"
              element={
                <ProtectedRoute
                  isAllowed={Boolean(user) && user?.role === "ADMIN"}
                >
                  <AllPosts />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <ProtectedRoute
                  isAllowed={Boolean(user) && user?.role === "ADMIN"}
                >
                  <AllUsers />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/requests"
              element={
                <ProtectedRoute
                  isAllowed={Boolean(user) && user?.role === "ADMIN"}
                >
                  <Requests />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/categories"
              element={
                <ProtectedRoute
                  isAllowed={Boolean(user) && user?.role === "ADMIN"}
                >
                  <Categories />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/registation" element={<Registration />} />
            <Route path="/category/:categoryId" element={<Category />} />
            <Route path="/post/:postId" element={<Post />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </div>
        <Footer />
        {user?.role === "CREATOR" ? <AddPostBtn /> : null}
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}
