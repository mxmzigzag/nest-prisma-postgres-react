import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Category from "./pages/category";
import ErrorPage from "./pages/errorPage";
import Header from "./components/ui/header";
import Home from "./pages/home";
import Profile from "./pages/profile";
import Login from "./pages/login";
import Registration from "./pages/registration";
import Footer from "./components/ui/footer";

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
        <Footer />
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}
