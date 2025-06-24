import React from 'react';
import { Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer mt-auto py-3 bg-light">
      <Container className="d-flex justify-content-between align-items-center">
        <span className="text-muted">
          © {new Date().getFullYear()} CareerPath AI
        </span>
        <Nav>
          <Nav.Link as={Link} to="/about" className="text-muted small">About</Nav.Link>
          <Nav.Link as={Link} to="/privacy" className="text-muted small">Privacy</Nav.Link>
          <Nav.Link as={Link} to="/contact" className="text-muted small">Contact</Nav.Link>
        </Nav>
      </Container>
    </footer>
  );
};

export default Footer;