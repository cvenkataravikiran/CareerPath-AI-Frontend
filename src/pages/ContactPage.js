// src/pages/ContactPage.js

import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';

const ContactPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null); // 'success' or 'error'
  const [message, setMessage] = useState('');

  // Get the access key from the environment variable
  const accessKey = process.env.REACT_APP_WEB3FORMS_ACCESS_KEY;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmissionStatus(null);
    setMessage('');

    if (!accessKey) {
      console.error("Web3Forms Access Key is not defined.");
      setMessage("Contact form is not configured. Please contact the site administrator.");
      setSubmissionStatus('error');
      setIsSubmitting(false);
      return;
    }
    
    const form = event.target;
    const formData = new FormData(form);

    // --- THIS IS THE KEY CHANGE ---
    // Get the original subject and create a new, more descriptive one.
    const originalSubject = formData.get('subject');
    const newSubject = `[CareerPath AI Contact] - ${originalSubject}`;
    formData.set("subject", newSubject);

    // Also add the access key and from_name
    formData.append("access_key", accessKey);
    formData.append("from_name", "CareerPath AI Contact");

    // Convert form data to a plain object
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: json
      });
      
      const result = await response.json();
      if (result.success) {
        setSubmissionStatus('success');
        setMessage("Thank you for your message! It has been sent successfully.");
        form.reset();
      } else {
        console.error("Submission failed:", result);
        setSubmissionStatus('error');
        setMessage(result.message || "Oops! There was a problem submitting your form.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setSubmissionStatus('error');
      setMessage("A network error occurred. Please try again later.");
    }

    setIsSubmitting(false);
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow-sm">
            <Card.Header as="h4" className="text-center p-3">Contact Us</Card.Header>
            <Card.Body className="p-4">
              <p className="text-center text-muted mb-4">
                Have a question, feedback, or a partnership inquiry? We'd love to hear from you.
              </p>
              
              <Form onSubmit={handleSubmit}>
                {/* The 'name' attributes are still important */}
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Your Name</Form.Label>
                      <Form.Control type="text" placeholder="Enter your name" name="name" required />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Your Email</Form.Label>
                      <Form.Control type="email" placeholder="you@example.com" name="email" required />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group className="mb-3">
                  <Form.Label>Subject</Form.Label>
                  {/* Web3Forms automatically uses this as the email subject */}
                  <Form.Control type="text" placeholder="e.g., Feedback" name="subject" required />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Message</Form.Label>
                  <Form.Control as="textarea" rows={5} placeholder="Your message here..." name="message" required />
                </Form.Group>

                {message && (
                  <Alert variant={submissionStatus === 'success' ? 'success' : 'danger'} className="mt-3">
                    {message}
                  </Alert>
                )}

                <div className="text-center">
                  <Button variant="primary" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
export default ContactPage;