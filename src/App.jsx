import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import MapPage from './pages/MapPage';
import LocationPage from './pages/LocationPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/location/:id" element={<LocationPage />} />
      </Routes>
    </Router>
  );
}

export default App;
