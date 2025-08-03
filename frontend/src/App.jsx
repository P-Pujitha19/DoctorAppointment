import React from 'react';
import {Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import DoctorProfile from './pages/DoctorProfile';
import BookAppointment from './pages/BookAppointment';

const App = () => {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctor/:id" element={<DoctorProfile />} />
        <Route path="/book/:id" element={<BookAppointment />} />
      </Routes>
 
  );
};

export default App;
