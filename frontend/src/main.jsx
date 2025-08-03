import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { DoctorProvider } from './context/DoctorContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DoctorProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </DoctorProvider>
  </React.StrictMode>
);
