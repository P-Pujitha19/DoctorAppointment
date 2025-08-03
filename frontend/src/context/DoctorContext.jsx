
import React, { createContext, useEffect, useState } from 'react';

export const DoctorContext = createContext();

export const DoctorProvider = ({ children }) => {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('/doctors.json')
      .then(res => res.json())
      .then(setDoctors);
  }, []);

  return (
    <DoctorContext.Provider value={{ doctors, search, setSearch }}>
      {children}
    </DoctorContext.Provider>
  );
};
