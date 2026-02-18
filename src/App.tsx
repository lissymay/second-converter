import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import ConverterPage from './pages/ConverterPage';
import RatesPage from './pages/RatesPage';
import './App.css';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <header className="header">
          <Link to="/">Конвертер</Link>
          <Link to="/rates">Курсы</Link>
        </header>

        <main className="main">
          <Routes>
            <Route path="/" element={<ConverterPage />} />
            <Route path="/rates" element={<RatesPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};
