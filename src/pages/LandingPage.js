// src/pages/LandingPage.js

import React from 'react';
import { Container, Row, Col, Button, Card, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LandingFooter from '../components/layout/LandingFooter'; 

// --- UPDATED ICONS ---
// Added FaRobot, SiTensorflow, SiNodedotjs, SiDocker, SiJavascript, SiKubernetes
import { FaUserGraduate, FaBrain, FaChartLine, FaQuoteLeft, FaRobot } from 'react-icons/fa';
import { SiReact, SiPython, SiMongodb, SiTensorflow, SiNodedotjs, SiDocker, SiJavascript, SiKubernetes } from 'react-icons/si';


const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* =======================
          HERO SECTION
      ======================== */}
      <Container fluid as="section" className="hero-section text-white">
        <Container>
          <Row className="align-items-center">
            <Col lg={7} className="hero-text-col text-center text-lg-start">
              <h1 className="display-3 fw-bold">Your Career, Clarified by AI.</h1>
              <p className="lead my-4">
                Stop guessing your next move. Get personalized, data-driven career roadmaps that guide you from learning to earning.
              </p>
              <Button as={Link} to="/auth" variant="light" size="lg" className="fw-bold hero-button">
                Start Your Journey for Free
              </Button>
            </Col>
            <Col lg={5} className="d-none d-lg-block hero-visual-col">
              <Image 
                src="/images/hero-visual.gif" 
                fluid 
                alt="AI data visualization" 
                className="hero-visual-img" 
              />
            </Col>
          </Row>
        </Container>
      </Container>

      {/* =======================
          FEATURES SECTION
      ======================== */}
      <Container as="section" className="py-5 text-center features-section">
        <h2 className="fw-bold">How CareerPath AI Works for You</h2>
        <p className="lead text-muted mb-5">In three simple steps, gain clarity and direction.</p>
        <Row className="mt-4">
          <Col md={4} className="mb-4">
            <Card className="features-card h-100">
              <Card.Body>
                <div className="features-icon-wrapper"><FaUserGraduate size={30} /></div>
                <Card.Title as="h4">1. Define Your Ambition</Card.Title>
                <Card.Text>Tell us your dream job title or simply upload your current resume. Our AI analyzes your starting point.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className="features-card h-100">
              <Card.Body>
                <div className="features-icon-wrapper"><FaBrain size={30} /></div>
                <Card.Title as="h4">2. Receive Your AI Blueprint</Card.Title>
                <Card.Text>Get a custom, step-by-step learning plan, curated from millions of career data points.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className="features-card h-100">
              <Card.Body>
                <div className="features-icon-wrapper"><FaChartLine size={30} /></div>
                <Card.Title as="h4">3. Learn, Track & Achieve</Card.Title>
                <Card.Text>Follow your interactive planner, use top-tier resources, and watch your progress towards job-readiness.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      
      {/* =======================
          SHOWCASE SECTION
      ======================== */}
      <Container as="section" className="py-5 showcase-section">
        <Row className="align-items-center">
          <Col lg={6} className="showcase-text pe-lg-5">
            <h2 className="fw-bold mb-3">Visualize Your Success</h2>
            <p className="lead">
              Your personalized roadmap isn't just a list—it's an interactive guide. See clear levels from beginner to advanced, with curated resources for every skill. No more guesswork, just focused learning.
            </p>
            <ul>
              <li>Step-by-step skill progression</li>
              <li>Links to high-quality learning materials</li>
              <li>Dynamic weekly planner to keep you on track</li>
            </ul>
          </Col>
          <Col lg={6} className="showcase-image-wrapper">
             <Image src="/images/app-screenshot.jpg" fluid rounded className="shadow-lg" alt="App screenshot showing a career roadmap" />
          </Col>
        </Row>
      </Container>

      {/* =======================
          TESTIMONIALS SECTION
      ======================== */}
      <Container as="section" className="py-5 text-center testimonials-section">
        <h2 className="fw-bold">Don't Just Take Our Word For It</h2>
        <Row className="mt-5 justify-content-center">
          <Col md={5} className="mb-4">
            <Card className="testimonial-card">
              <Card.Body>
                <FaQuoteLeft className="testimonial-quote-icon" />
                <Card.Text className="mb-4">
                  "As a career-changer from marketing, I had no idea where to start. CareerPath AI cut through the noise and gave me a logical path to becoming a Data Analyst. It saved me months of aimless searching."
                </Card.Text>
                <footer className="blockquote-footer">Sarah Jenkins, <cite title="Source Title">Aspiring Data Analyst</cite></footer>
              </Card.Body>
            </Card>
          </Col>
          <Col md={5} className="mb-4">
            <Card className="testimonial-card">
              <Card.Body>
                <FaQuoteLeft className="testimonial-quote-icon" />
                <Card.Text className="mb-4">
                  "My university curriculum was broad. This tool helped me specialize for a Machine Learning role, focusing on the skills employers are actually looking for. The weekly planner kept me accountable."
                </Card.Text>
                <footer className="blockquote-footer">Michael Chen, <cite title="Source Title">Recent CompSci Graduate</cite></footer>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      
      {/* =======================
          REPLACEMENT: SKILL CONSTELLATION SECTION
      ======================== */}
      <Container as="section" className="py-5 skill-constellation-section">
        <div className="text-center mb-5">
            <h2 className="fw-bold">See How Skills Connect</h2>
            <p className="lead text-muted">Our AI understands the complex relationships between technologies to build the most effective path for you.</p>
        </div>
        <div className="constellation-wrapper">
            <div className="constellation-hub">
                <FaRobot size={40}/>
                <span>AI & Data Science</span>
            </div>
            
            {/* --- UPDATED TO 8 NODES --- */}
            <div className="skill-node node-1"><SiPython size={28} /><span>Python</span></div>
            <div className="skill-node node-2"><SiTensorflow size={28} /><span>TensorFlow</span></div>
            <div className="skill-node node-3"><SiReact size={28} /><span>React</span></div>
            <div className="skill-node node-4"><SiNodedotjs size={28} /><span>Node.js</span></div>
            <div className="skill-node node-5"><SiMongodb size={28} /><span>MongoDB</span></div>
            <div className="skill-node node-6"><SiDocker size={28} /><span>Docker</span></div>
            <div className="skill-node node-7"><SiJavascript size={28} /><span>JavaScript</span></div>
            <div className="skill-node node-8"><SiKubernetes size={28} /><span>Kubernetes</span></div>
        </div>
      </Container>

      <LandingFooter />
    </div>
  );
};

export default LandingPage;
