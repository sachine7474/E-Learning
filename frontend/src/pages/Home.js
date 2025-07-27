import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-primary text-white py-5">
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <h1 className="display-4 fw-bold mb-4">
                Learn Skills Online with ELearn Hub
              </h1>
              <p className="lead mb-4">
                Discover thousands of courses from expert instructors and advance your skills 
                from anywhere in the world. Start your learning journey today!
              </p>
              <div className="d-grid gap-2 d-md-flex">
                <LinkContainer to="/courses">
                  <Button variant="light" size="lg">
                    <i className="bi bi-search me-2"></i>
                    Browse Courses
                  </Button>
                </LinkContainer>
                {!isAuthenticated && (
                  <LinkContainer to="/register">
                    <Button variant="outline-light" size="lg">
                      <i className="bi bi-person-plus me-2"></i>
                      Get Started
                    </Button>
                  </LinkContainer>
                )}
              </div>
            </Col>
            <Col lg={6} className="text-center">
              <i className="bi bi-mortarboard display-1"></i>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-5">
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h2 className="fw-bold">Why Choose ELearn Hub?</h2>
              <p className="text-muted">
                We provide the best online learning experience
              </p>
            </Col>
          </Row>
          <Row>
            <Col md={4} className="mb-4">
              <Card className="h-100 text-center border-0 shadow-sm">
                <Card.Body>
                  <i className="bi bi-people-fill text-primary display-4 mb-3"></i>
                  <Card.Title>Expert Instructors</Card.Title>
                  <Card.Text>
                    Learn from industry experts and experienced professionals 
                    who know what it takes to succeed.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="h-100 text-center border-0 shadow-sm">
                <Card.Body>
                  <i className="bi bi-clock-fill text-primary display-4 mb-3"></i>
                  <Card.Title>Learn at Your Pace</Card.Title>
                  <Card.Text>
                    Study whenever and wherever you want with lifetime access 
                    to all course materials.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="h-100 text-center border-0 shadow-sm">
                <Card.Body>
                  <i className="bi bi-award-fill text-primary display-4 mb-3"></i>
                  <Card.Title>Certificates</Card.Title>
                  <Card.Text>
                    Earn certificates upon completion and showcase your 
                    new skills to employers.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Stats Section */}
      <section className="bg-light py-5">
        <Container>
          <Row className="text-center">
            <Col md={3} className="mb-4">
              <div className="h2 fw-bold text-primary">10,000+</div>
              <div className="text-muted">Students</div>
            </Col>
            <Col md={3} className="mb-4">
              <div className="h2 fw-bold text-primary">500+</div>
              <div className="text-muted">Courses</div>
            </Col>
            <Col md={3} className="mb-4">
              <div className="h2 fw-bold text-primary">100+</div>
              <div className="text-muted">Instructors</div>
            </Col>
            <Col md={3} className="mb-4">
              <div className="h2 fw-bold text-primary">50+</div>
              <div className="text-muted">Categories</div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-5">
        <Container>
          <Row className="text-center">
            <Col>
              <h2 className="fw-bold mb-4">Ready to Start Learning?</h2>
              <p className="lead text-muted mb-4">
                Join thousands of students already learning on ELearn Hub
              </p>
              {isAuthenticated ? (
                <LinkContainer to="/dashboard">
                  <Button variant="primary" size="lg">
                    <i className="bi bi-speedometer2 me-2"></i>
                    Go to Dashboard
                  </Button>
                </LinkContainer>
              ) : (
                <div className="d-grid gap-2 d-md-flex justify-content-center">
                  <LinkContainer to="/register">
                    <Button variant="primary" size="lg">
                      <i className="bi bi-person-plus me-2"></i>
                      Sign Up Now
                    </Button>
                  </LinkContainer>
                  <LinkContainer to="/login">
                    <Button variant="outline-primary" size="lg">
                      <i className="bi bi-box-arrow-in-right me-2"></i>
                      Login
                    </Button>
                  </LinkContainer>
                </div>
              )}
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Home;
