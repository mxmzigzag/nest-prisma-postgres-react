import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Category from "./components/Category/category";
import ErrorPage from "./components/Error/errorPage";
import Header from "./components/Header/header";
import Home from "./components/Home/home";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <div className="siteBg">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category/:categoryId" element={<Category />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}
