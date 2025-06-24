// src/pages/GeneratorPage.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Button, Row, Col, Card, Form, Tabs, Tab, Alert, Spinner } from 'react-bootstrap';
// Import the REAL service functions
import { getRoadmapByGoal, generateFromResume } from '../api/roadmapService';

const GeneratorPage = () => {
  const [goal, setGoal] = useState('');
  const [resumeFile, setResumeFile] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // This function now triggers the API call directly on the next page
  const handleGoalSubmit = (e) => {
    e.preventDefault();
    if (!goal.trim()) {
      setError('Please enter a career goal.');
      return;
    }
    // Navigate to the roadmap page, passing the goal as state.
    // The RoadmapPage component will be responsible for fetching the data.
    navigate('/roadmap', { state: { type: 'goal', payload: goal } });
  };

  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setResumeFile(file);
      setError('');
    } else {
      setResumeFile(null);
      setError('Please upload a valid PDF file.');
    }
  };

  const handleResumeSubmit = async (e) => {
    e.preventDefault();
    if (!resumeFile) {
      setError('Please select a resume to upload.');
      return;
    }
    setLoading(true);
    setError('');
    const formData = new FormData();
    formData.append('resume', resumeFile);

    try {
      const roadmapData = await generateFromResume(formData);
      // Navigate to the roadmap page with the fully generated data.
      navigate('/roadmap', { state: { type: 'resume', payload: roadmapData } });
    } catch (err) {
      setError(err.message || 'Failed to process resume.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-5">
      {/* ... (rest of the JSX is fine, just update the disabled and loading states) ... */}
      <Row className="justify-content-md-center text-center">
        <Col md={8}>
          <h1 className="fw-bold">Generate a New Career Path</h1>
          <p className="lead my-4">
            Ready for a new challenge? Enter a different role or upload an updated resume to forge a new learning roadmap.
          </p>
        </Col>
      </Row>
      <Row className="justify-content-md-center mt-3">
        <Col md={8}>
          <Card className="shadow-lg border-0">
            <Card.Body className="p-4">
              <Tabs defaultActiveKey="goal" id="input-tabs" className="mb-3" justify>
                <Tab eventKey="goal" title="🎯 Enter a Goal">
                  <Form onSubmit={handleGoalSubmit}>
                    <Form.Group controlId="goalInput" className="mb-3">
                      <Form.Label className="fs-5">What is your target role?</Form.Label>
                      <Form.Control size="lg" type="text" placeholder="e.g., 'Cybersecurity Analyst'" value={goal} onChange={(e) => setGoal(e.target.value)} />
                    </Form.Group>
                    <div className="d-grid">
                      <Button variant="primary" type="submit" size="lg">
                        Generate My Path
                      </Button>
                    </div>
                  </Form>
                </Tab>
                <Tab eventKey="resume" title="📄 Upload Resume">
                  <Form onSubmit={handleResumeSubmit}>
                    <Form.Group controlId="resumeUpload" className="mb-3">
                      <Form.Label className="fs-5">Let AI analyze your resume (PDF)</Form.Label>
                      <Form.Control type="file" accept=".pdf" onChange={handleResumeChange} />
                      {resumeFile && <Form.Text className="text-success">{resumeFile.name} selected</Form.Text>}
                    </Form.Group>
                    <div className="d-grid">
                      <Button variant="success" type="submit" size="lg" disabled={loading}>
                        {loading ? <><Spinner as="span" animation="border" size="sm" /> Analyzing...</> : '✨ Analyze and Build Path'}
                      </Button>
                    </div>
                  </Form>
                </Tab>
              </Tabs>
              {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default GeneratorPage;