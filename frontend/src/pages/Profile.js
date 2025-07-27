import React from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user } = useAuth();

  return (
    <Container className="py-4">
      <Row>
        <Col lg={8} className="mx-auto">
          <Card>
            <Card.Header>
              <h3 className="mb-0">Profile Settings</h3>
            </Card.Header>
            <Card.Body>
              <div className="text-center mb-4">
                <div className="profile-avatar bg-primary d-inline-flex align-items-center justify-content-center">
                  <i className="bi bi-person-fill text-white" style={{fontSize: '3rem'}}></i>
                </div>
                <h4 className="mt-3">{user?.firstName} {user?.lastName}</h4>
                <p className="text-muted">{user?.role}</p>
              </div>

              <Form>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        type="text"
                        defaultValue={user?.firstName}
                        placeholder="First Name"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        type="text"
                        defaultValue={user?.lastName}
                        placeholder="Last Name"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    defaultValue={user?.email}
                    placeholder="Email"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Bio</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Tell us about yourself"
                  />
                </Form.Group>

                <div className="d-grid gap-2">
                  <Button variant="primary" type="submit">
                    Update Profile
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

export default Profile;
