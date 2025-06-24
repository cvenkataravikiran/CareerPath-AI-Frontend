// src/components/layout/MasterLayout.js

import React from 'react';
import { Outlet } from 'react-router-dom';
import AppNavbar from './AppNavbar';
import Footer from './Footer';

const MasterLayout = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <AppNavbar />
      {/* Add the 'page-container' class here for the fade-in effect */}
      <main className="flex-grow-1 py-4 container page-container">
        <Outlet /> {/* Child routes like /dashboard, /profile will render here */}
      </main>
      <Footer />
    </div>
  );
};

export default MasterLayout;