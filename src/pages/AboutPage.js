// src/pages/AboutPage.js

import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const AboutPage = () => {
  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={10} lg={8}>
          <Card className="shadow-sm">
            <Card.Body className="p-4 p-md-5">
              <h1 className="fw-bold text-center mb-3">I built the tool I wish I had.</h1>
              <p className="lead text-center text-muted mb-4">
                And I hope it can help you, too.
              </p>

              <p className="mt-4">
                A few years ago, I was stuck. I knew I wanted to advance my career in tech, but I was drowning in advice. My browser was a graveyard of tabs: "Top 10 Skills for 2024," "Why You Must Learn Rust," "Is DevOps Dead?" — it was noisy, confusing, and honestly, a little discouraging.
              </p>
              <p>
                All I wanted was a straight answer. A simple, logical path from Point A to Point B.
              </p>

              <h4 className="mt-5 fw-bold">From Frustration to a Personal Project</h4>
              <p>
                I figured, if a map didn't exist, maybe I could build one. That's how CareerPath AI started. It wasn't for a business plan or a startup; it was for me. I wanted to see if I could use AI to read through thousands of real job descriptions and figure out what skills truly matter, and in what order.
              </p>
              <p>
                The goal was to filter out the hype and create a clear, actionable guide based on what companies are actually hiring for. After seeing how much clarity it brought me, I knew I had to share it.
              </p>
              
              <p className="mt-4 fw-bold">
                This app is my answer to the chaos. It’s still growing and learning, just like us. I sincerely hope it helps you find your path.
              </p>

            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutPage;