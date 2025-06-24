// src/pages/PrivacyPage.js

import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const PrivacyPage = () => {
  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={10} lg={8}>
          <Card className="shadow-sm">
            <Card.Body className="p-4 p-md-5">
              <h1 className="fw-bold text-center mb-3">My Commitment to Your Privacy.</h1>
              <p className="lead text-center text-muted mb-4">
                No corporate-speak or confusing legal jargon. Just a straightforward promise from me, the person who built this.
              </p>
              
              <hr className="my-5" />

              <h4 className="mt-4 fw-bold">My Core Principle: I Respect Your Data.</h4>
              <p className="fs-5">
                <strong>I will never sell your personal information.</strong> This project is built on trust, and selling your data would be a complete violation of that. It will not happen.
              </p>

              <h4 className="mt-5 fw-bold">So, what information do I actually need?</h4>
              <p>
                As little as possible. I only collect what's essential to make the app work:
              </p>
              <ul>
                <li><strong>To Create Your Account:</strong> Your name and email, just so you can log in and I know who you are.</li>
                <li><strong>To Build Your Roadmap:</strong> Your career goal or the text from your resume. This is the key ingredient you give the AI to create your path. It's not used for anything else.</li>
                <li><strong>To Personalize Your Profile (Optional):</strong> Your photo and social links, but only if you choose to add them.</li>
              </ul>

              <h4 className="mt-4 fw-bold">Does anyone else see your info?</h4>
              <p>
                Only in the way that's technically necessary to run the app. I don't share it with marketers or data brokers.
              </p>
              <ul>
                To generate your roadmap, the *text* of your goal (e.g., "Full Stack Developer") is sent to the Groq API, which runs fast AI models like Llama 3. Your name or email is never included in this request.
                <li><strong>Cloudinary:</strong> If you upload a profile photo, it's stored securely with this industry-standard service.</li>
              </ul>

              <h4 className="mt-4 fw-bold">You are always in control.</h4>
              <p>
                It's your account and your data.
              </p>
              <ul>
                <li><strong>Edit Anytime:</strong> You can update your profile from the Profile page whenever you like.</li>
                <li><strong>Delete Permanently:</strong> If you want to erase your account, just send an email to <a href="mailto:careerpathai01@gmail.com">careerpathai01@gmail.com</a>, and I will personally and permanently delete all of your data from the system.</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PrivacyPage;