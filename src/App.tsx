import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Main';
import Search from './pages/Search';
import Player from './pages/Player';

export default function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/search" element={<Search />} />
        <Route path="/watch/:id" element={<Player />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
