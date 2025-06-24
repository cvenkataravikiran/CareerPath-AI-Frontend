// src/pages/AuthPage.js

import React, { useState } from 'react';
import { Form, Button, Card, Row, Col, Container, Tabs, Tab, Alert, Spinner, Image } from 'react-bootstrap';
import { useAuth } from '../hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const AuthPage = () => {
  const [key, setKey] = useState('login');
  const { login, register } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  
  // States for form inputs
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  
  // States for UI feedback
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const from = location.state?.from?.pathname || "/dashboard";

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(loginEmail, loginPassword);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(signupName, signupEmail, signupPassword);
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setError(err.response?.data?.error || 'Signup failed. This email may already be in use.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page-container">
      <div className="d-flex flex-column align-items-center">
        
        <div className="auth-header d-flex align-items-center">
          {/* Logo still links to the landing page */}
          <Link to="/">
            <Image src="/logo.png" alt="CareerPath AI Logo" className="auth-logo" />
          </Link>
          
          {/* --- UPDATED: Title is now also a link --- */}
          <Link to="/" className="text-decoration-none">
            <h1 className="auth-title ms-4 mb-0">CareerPath AI</h1>
          </Link>
        </div>

        <Card className="auth-card" style={{ maxWidth: '450px', width: '100%' }}>
          <Card.Body className="p-4">
            {error && <Alert variant="danger" onClose={() => setError('')} dismissible>{error}</Alert>}
            
            <Tabs 
              activeKey={key} 
              onSelect={(k) => setKey(k)} 
              className="nav-tabs-modern mb-4" 
              justify
            >
              <Tab eventKey="login" title="Login">
                <Form onSubmit={handleLogin}>
                  <Form.Group className="mb-3" controlId="loginEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="you@example.com" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} required />
                  </Form.Group>
                  <Form.Group className="mb-4" controlId="loginPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} required />
                  </Form.Group>
                  <div className="d-grid">
                    <Button variant="primary" type="submit" disabled={loading} size="lg">
                      {loading ? <Spinner as="span" animation="border" size="sm" /> : 'Login'}
                    </Button>
                  </div>
                </Form>
              </Tab>
              <Tab eventKey="signup" title="Sign Up">
                <Form onSubmit={handleSignup}>
                  <Form.Group className="mb-3" controlId="signupName">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control type="text" placeholder="Alex Doe" value={signupName} onChange={(e) => setSignupName(e.target.value)} required />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="signupEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="you@example.com" value={signupEmail} onChange={(e) => setSignupEmail(e.target.value)} required />
                  </Form.Group>
                  <Form.Group className="mb-4" controlId="signupPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Create a password" value={signupPassword} onChange={(e) => setSignupPassword(e.target.value)} required />
                  </Form.Group>
                  <div className="d-grid">
                    <Button variant="primary" type="submit" disabled={loading} size="lg">
                      {loading ? <Spinner as="span" animation="border" size="sm" /> : 'Create Account'}
                    </Button>
                  </div>
                </Form>
              </Tab>
            </Tabs>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
export default AuthPage;