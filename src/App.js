import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/login/login';
import Admin from './pages/admin/admin';

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Admin />} />
    </Routes>
  );
}
