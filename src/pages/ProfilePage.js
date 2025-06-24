import React, { useState } from 'react';
import { Container, Card, Form, Button, Row, Col, Alert, Image, Spinner } from 'react-bootstrap';
import { useAuth } from '../hooks/useAuth';
import { FaCamera } from 'react-icons/fa';

const ProfilePage = () => {
  const { user, updateUser } = useAuth();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    headline: user?.headline || '',
    email: user?.email || '',
    phone: user?.phone || '',
    linkedin: user?.linkedin || '',
    github: user?.github || '',
  });

  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(user?.photo || null);

  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoFile(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess('');
    setError('');

    const profileData = new FormData();
    Object.keys(formData).forEach(key => {
      if (key !== 'email') {
        profileData.append(key, formData[key]);
      }
    });
    if (photoFile) {
      profileData.append('photo', photoFile);
    }

    try {
      await updateUser(profileData);
      setSuccess('Profile updated successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err?.response?.data?.error || 'Failed to update profile.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={10} lg={8}>
          <Card className="shadow-sm">
            <Card.Header as="h4" className="text-center">My Profile</Card.Header>
            <Card.Body className="p-4">
              <Form onSubmit={handleSubmit}>
                <Row className="align-items-center">
                  <Col md={4} className="text-center mb-4 mb-md-0">
                    {/* --- REPLACEMENT START --- */}
                    <div className="profile-photo-container">
                      <Image
                        src={photoPreview || `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name)}&background=random`}
                        roundedCircle
                        className="profile-photo-img"
                        style={{ width: 120, height: 120, objectFit: 'cover' }}
                      />
                      <label htmlFor="photo-upload" className="profile-photo-overlay" style={{ cursor: 'pointer' }}>
                        <FaCamera size={24} />
                        <span className="ms-2">Change</span>
                      </label>
                      <Form.Control
                        type="file"
                        id="photo-upload"
                        accept="image/*"
                        onChange={handlePhotoChange}
                        style={{ display: 'none' }}
                      />
                    </div>
                    {/* --- REPLACEMENT END --- */}
                  </Col>
                  <Col md={8}>
                    <Form.Group className="mb-3" controlId="formName">
                      <Form.Label>Full Name</Form.Label>
                      <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your full name" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formHeadline">
                      <Form.Label>Headline</Form.Label>
                      <Form.Control type="text" name="headline" value={formData.headline} onChange={handleChange} placeholder="e.g., Aspiring Data Scientist" />
                    </Form.Group>
                  </Col>
                </Row>

                <hr className="my-4" />

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formEmail">
                      <Form.Label>Email Address</Form.Label>
                      <Form.Control type="email" name="email" value={formData.email} disabled />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formPhone">
                      <Form.Label>Phone Number</Form.Label>
                      <Form.Control type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Optional" />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formLinkedin">
                      <Form.Label>LinkedIn Profile URL</Form.Label>
                      <Form.Control type="url" name="linkedin" value={formData.linkedin} onChange={handleChange} placeholder="https://linkedin.com/in/..." />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formGithub">
                      <Form.Label>GitHub Profile URL</Form.Label>
                      <Form.Control type="url" name="github" value={formData.github} onChange={handleChange} placeholder="https://github.com/..." />
                    </Form.Group>
                  </Col>
                </Row>

                {success && <Alert variant="success" className="mt-3">{success}</Alert>}
                {error && <Alert variant="danger" className="mt-3">{error}</Alert>}

                <div className="text-center mt-4">
                  <Button variant="primary" type="submit" disabled={loading}>
                    {loading ? <Spinner as="span" animation="border" size="sm" /> : 'Save Changes'}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
export default ProfilePage;