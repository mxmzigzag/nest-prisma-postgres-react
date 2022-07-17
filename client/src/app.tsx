import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Category from "./components/pages/Category/category";
import ErrorPage from "./components/pages/Error/errorPage";
import Header from "./components/Header/header";
import Home from "./components/pages/Home/home";
import Profile from "./components/pages/Profile/profile";
import Login from "./components/pages/Auth/login";
import Registration from "./components/pages/Auth/registration";

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
