import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "./components/ui/header";
import Home from "./pages/home";
import Login from "./pages/login";
import Registration from "./pages/registration";
import ErrorPage from "./pages/errorPage";
import Profile from "./pages/profile";
import Category from "./pages/category";
import Footer from "./components/ui/footer";

export default function App() {
  return (
    <div className="app-wrapper">
      <BrowserRouter>
        <Header />
        <div className="app-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registation" element={<Registration />} />
            <Route path="/category/:categoryId" element={<Category />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}
