import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLP from './pages/MainLP';
import VeterinarioLP from './pages/VeterinarioLP';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLP />} />
        <Route path="/veterinarios" element={<VeterinarioLP />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
