import React from 'react';
import { Routes, Route } from 'react-router-dom';

// CONTEXT PROVIDERS
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';

// LAYOUTS and COMMON COMPONENTS
import MasterLayout from './components/layout/MasterLayout';
import PrivateRoute from './components/common/PrivateRoute';

// PAGE COMPONENTS
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import ExplorePage from './pages/ExplorePage';
import GeneratorPage from './pages/GeneratorPage';
import RoadmapPage from './pages/RoadmapPage';
import ChatbotPage from './pages/ChatbotPage';
import ProfilePage from './pages/ProfilePage';
import AboutPage from './pages/AboutPage';
import PrivacyPage from './pages/PrivacyPage';
import ContactPage from './pages/ContactPage';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Routes>
          {/* Public routes that DON'T use the MasterLayout */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<AuthPage />} />
          
          {/* Routes that DO use the MasterLayout */}
          <Route path="/" element={<MasterLayout />}>
            {/* Private Routes */}
            <Route path="dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
            <Route path="explore" element={<PrivateRoute><ExplorePage /></PrivateRoute>} />
            <Route path="generate" element={<PrivateRoute><GeneratorPage /></PrivateRoute>} />
            <Route path="roadmap" element={<PrivateRoute><RoadmapPage /></PrivateRoute>} />
            <Route path="chatbot" element={<PrivateRoute><ChatbotPage /></PrivateRoute>} />
            <Route path="profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
            
            {/* Public Routes with MasterLayout */}
            <Route path="about" element={<AboutPage />} />
            <Route path="privacy" element={<PrivacyPage />} />
            <Route path="contact" element={<ContactPage />} />
          </Route>
          
          <Route path="*" element={
              <div className="d-flex align-items-center justify-content-center vh-100">
                  <div className="text-center">
                      <h1 className="display-1 fw-bold">404</h1>
                      <p className="fs-3"> <span className="text-danger">Oops!</span> Page not found.</p>
                      <p className="lead">
                          The page you’re looking for doesn’t exist.
                      </p>
                      <a href="/" className="btn btn-primary">Go Home</a>
                  </div>
              </div>
          } />
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;