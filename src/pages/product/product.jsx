import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProductHome from "./home";
import ProductAddUpdate from "./add-update";
import ProductDedail from "./detail";
import "./product.less";

export default function Product() {
  return (
    <Routes>
      <Route index element={<ProductHome />} />
      <Route path="detail" element={<ProductDedail />}></Route>
      <Route path="edit" element={<ProductAddUpdate />}></Route>
      <Route path="*" element={<Navigate to="/product" />}></Route>
    </Routes>
  );
}
