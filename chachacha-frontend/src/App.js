import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Reservations from './pages/Reservations';
import Customers from './pages/Customers';
import Rooms from './pages/Rooms';

const App = () => (
  <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/reservations" element={<Reservations />} />
      <Route path="/customers" element={<Customers />} />
      <Route path="/rooms" element={<Rooms />} />
    </Routes>
  </Router>
);

export default App;
