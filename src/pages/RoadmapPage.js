// src/pages/RoadmapPage.js

import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Accordion, Spinner, Alert, Badge, ListGroup, Button } from 'react-bootstrap';
import { getRoadmapByGoal } from '../api/roadmapService';

const RoadmapPage = () => {
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const location = useLocation();

  useEffect(() => {
    // Check if we have navigation state
    if (!location.state) {
      setError('No career goal or resume data specified. Please return to the "Generate Path" page to start.');
      setLoading(false);
      return;
    }

    const { type, payload } = location.state;

    if (type === 'goal') {
      // If we have a goal, we need to fetch the roadmap
      const fetchRoadmap = async () => {
        try {
          setLoading(true);
          const data = await getRoadmapByGoal(payload);
          setRoadmap(data);
        } catch (err) {
          setError(err.message || 'Failed to generate roadmap.');
        } finally {
          setLoading(false);
        }
      };
      fetchRoadmap();
    } else if (type === 'resume') {
      // If we have resume data, the payload is the roadmap itself
      setRoadmap(payload);
      setLoading(false);
    } else {
        setError('Invalid generation type. Please start over.');
        setLoading(false);
    }
  }, [location.state]);

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="primary" role="status" style={{ width: '3rem', height: '3rem' }} />
        <p className="mt-3 fs-5">Our AI is crafting your personalized plan...</p>
      </div>
    );
  }

  if (error || !roadmap) {
    return (
      <Alert variant="danger" className="text-center">
        <Alert.Heading>Oops! Something went wrong.</Alert.Heading>
        <p>{error || 'Could not load roadmap data.'}</p>
        <hr />
        <Button as={Link} to="/generate" variant="outline-danger">Try Again</Button>
      </Alert>
    );
  }

  // The rest of the return statement is perfect and can remain as is.
  return (
    <div>
      <h1 className="mb-2">Your Roadmap to Becoming a {roadmap.role_name}</h1>
      <p className="lead text-muted mb-4">
        Total Estimated Time: <Badge bg="secondary">{roadmap.estimated_time}</Badge>
      </p>

      <Accordion defaultActiveKey="0" alwaysOpen>
        {Object.entries(roadmap.levels).map(([levelKey, levelData], index) => (
          <Accordion.Item eventKey={String(index)} key={levelKey}>
            <Accordion.Header>
              <span className="fw-bold fs-5">{levelData.title}</span>
            </Accordion.Header>
            <Accordion.Body>
              <ListGroup variant="flush">
                {levelData.skills.map((skill, skillIndex) => (
                  <ListGroup.Item key={skillIndex} className="d-flex justify-content-between align-items-start">
                    <div className="ms-2 me-auto">
                      <div className="fw-bold">{skill.name}</div>
                      <a href={skill.resource.url} target="_blank" rel="noopener noreferrer">
                        {skill.resource.title}
                      </a>
                    </div>
                    <Badge bg="primary" pill>Learn</Badge>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
};

export default RoadmapPage;