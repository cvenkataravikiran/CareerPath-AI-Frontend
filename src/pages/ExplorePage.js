// src/pages/ExplorePage.js
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Spinner, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import apiClient from '../api/apiClient';

const ExplorePage = () => {
  const [trendingCareers, setTrendingCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const response = await apiClient.get('/explore/trending');
        setTrendingCareers(response.data); // Backend returns the array directly
      } catch (err) {
        setError('Failed to load trending careers. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTrending();
  }, []);

  const handleExplore = (title) => {
    navigate('/roadmap', { state: { type: 'goal', payload: title } });
  };
  
  if (loading) {
      return <div className="text-center"><Spinner animation="border" /></div>;
  }
  
  if (error) {
      return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <Container>
      <div className="text-center my-5">
        <h1 className="fw-bold">Discover Your Next Career Move</h1>
        <p className="lead text-muted">Explore some of the most in-demand roles in the tech industry today.</p>
      </div>
      <Row>
        {trendingCareers.map((career, index) => (
          <Col md={6} lg={4} key={index} className="mb-4">
            <Card className="h-100 shadow-sm">
              <Card.Body className="d-flex flex-column">
                <Card.Title as="h4">{career.title}</Card.Title>
                <Card.Text>{career.description}</Card.Text>
                <Button 
                  variant="outline-primary" 
                  className="mt-auto"
                  onClick={() => handleExplore(career.title)}
                >
                  Generate Path
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ExplorePage;