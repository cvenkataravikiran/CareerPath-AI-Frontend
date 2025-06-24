// src/components/layout/AppNavbar.js

import React, { useState, useRef } from 'react';
import { Navbar, Nav, Container, Button, NavDropdown, Image } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { FaUserCircle } from 'react-icons/fa';
import ThemeToggleButton from '../common/ThemeToggleButton'; 

const AppNavbar = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const [expanded, setExpanded] = useState(false);
  const navRef = useRef(null);

  const handleLinkClick = () => {
    setExpanded(false);
  };

  const userDisplay = (
    <>
      {user?.photo ? (
        <Image
          src={user.photo}
          roundedCircle
          style={{ width: '32px', height: '32px', objectFit: 'cover' }}
          alt={user.name}
        />
      ) : (
        <FaUserCircle size={24} title={user?.name || 'Profile'} />
      )}
    </>
  );

  return (
    <Navbar
      expand="lg"
      className="shadow-sm"
      fixed="top"
      expanded={expanded}
      onToggle={() => setExpanded(!expanded)}
    >
      <Container>
        {/* --- UPDATED BRAND LOGIC --- */}
        <Navbar.Brand as={Link} to={isAuthenticated ? "/dashboard" : "/"} className="navbar-brand-creative">
          <Image src="/logo.png" className="brand-logo" alt="CareerPath AI Logo" />
          <span>CareerPath AI</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" ref={navRef}>
          <Nav className="ms-auto align-items-center">
            {isAuthenticated && (
              <>
                <Nav.Link as={NavLink} to="/dashboard" onClick={handleLinkClick} className="main-nav-link">Dashboard</Nav.Link>
                <Nav.Link as={NavLink} to="/explore" onClick={handleLinkClick} className="main-nav-link">Explore</Nav.Link>
                <Nav.Link as={NavLink} to="/generate" onClick={handleLinkClick} className="main-nav-link">Generate Path</Nav.Link>
                <Nav.Link as={NavLink} to="/chatbot" onClick={handleLinkClick} className="main-nav-link">AI Chat</Nav.Link>
              </>
            )}

            {isAuthenticated ? (
              <div className="d-flex align-items-center ps-lg-3">
                <ThemeToggleButton />
                <NavDropdown title={userDisplay} id="basic-nav-dropdown" align="end" className="ms-2">
                  <NavDropdown.Header>
                    Signed in as <br />
                    <strong>{user?.name || user?.email}</strong>
                  </NavDropdown.Header>
                  <NavDropdown.Divider />
                  <NavDropdown.Item as={Link} to="/profile" onClick={handleLinkClick}>Profile & Settings</NavDropdown.Item>
                  <NavDropdown.Item onClick={() => { logout(); handleLinkClick(); }}>Logout</NavDropdown.Item>
                </NavDropdown>
              </div>
            ) : (
              <Button as={Link} to="/auth" variant="primary" size="sm" className="ms-2" onClick={handleLinkClick}>
                Get Started
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;