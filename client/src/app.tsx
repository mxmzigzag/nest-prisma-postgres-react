import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Category from "./components/Category/category";
import ErrorPage from "./components/Error/errorPage";
import Header from "./components/Header/header";
import Home from "./components/Home/home";
import Profile from "./components/Profile/profile";
import Login from "./components/Auth/login";
import Registration from "./components/Auth/registration";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <div className="siteBg">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registation" element={<Registration />} />
            <Route path="/category/:categoryId" element={<Category />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </div>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}
