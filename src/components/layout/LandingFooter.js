// src/components/layout/LandingFooter.js

import React from 'react';
// UPDATED: Import Image from react-bootstrap
import { Container, Row, Col, Nav, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const LandingFooter = () => {
  return (
    <footer className="py-4 bg-light">
      <Container>
        <Row className="align-items-center">
          <Col md={4}>
            {/* UPDATED: Replaced emoji with Image component */}
            <div className="d-flex align-items-center">
                <Image src="/logo.png" className="brand-logo" alt="CareerPath AI Logo" />
                <h5 className="fw-bold text-dark ms-2 mb-0">CareerPath AI</h5>
            </div>
          </Col>
          <Col md={8} className="text-md-end">
            <Nav className="justify-content-end">
              <Nav.Link as={Link} to="/about" className="text-muted">About</Nav.Link>
              <Nav.Link as={Link} to="/privacy" className="text-muted">Privacy</Nav.Link>
              <Nav.Link as={Link} to="/contact" className="text-muted">Contact</Nav.Link>
            </Nav>
          </Col>
        </Row>
        <hr className="my-3"/>
        <p className="text-center text-muted mb-0">
          © {new Date().getFullYear()} CareerPath AI. Built for the future of work.
        </p>
      </Container>
    </footer>
  );
};

export default LandingFooter;