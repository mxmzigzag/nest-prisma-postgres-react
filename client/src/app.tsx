import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Role } from "./types/user.types";

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
import Requests from "./pages/requests";
import Categories from "./pages/categories";
import Post from "./pages/post";

import AddPostBtn from "./components/ui/addPostBtn";
import BannedNotification from "./features/BannedNotification/bannedNotification";

export default function App() {
  const { user } = useAuth();
  const isCreator = user?.role === Role.CREATOR;
  const isAdmin = user?.role === Role.ADMIN;

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
                <ProtectedRoute isAllowed={Boolean(user) && isAdmin}>
                  <AllPosts />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <ProtectedRoute isAllowed={Boolean(user) && isAdmin}>
                  <AllUsers />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/requests"
              element={
                <ProtectedRoute isAllowed={Boolean(user) && isAdmin}>
                  <Requests />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/categories"
              element={
                <ProtectedRoute isAllowed={Boolean(user) && isAdmin}>
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

        {isCreator ? <AddPostBtn /> : null}
        <BannedNotification />
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}
