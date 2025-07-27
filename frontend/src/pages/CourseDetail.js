import React from 'react';
import { Container, Row, Col, Card, Button, Badge, ListGroup } from 'react-bootstrap';

const CourseDetail = () => {
  return (
    <Container className="py-4">
      <div className="course-header mb-4">
        <Container>
          <Row>
            <Col lg={8}>
              <Badge bg="light" text="dark" className="mb-2">Programming</Badge>
              <h1 className="mb-3">React.js Complete Course</h1>
              <p className="lead mb-4">
                Learn React.js from basics to advanced concepts with hands-on projects
              </p>
              <div className="d-flex align-items-center">
                <span className="me-3">
                  <i className="bi bi-person me-1"></i>
                  John Doe
                </span>
                <span className="me-3">
                  <i className="bi bi-star-fill me-1"></i>
                  4.8 (124 reviews)
                </span>
                <span>
                  <i className="bi bi-people me-1"></i>
                  1,234 students
                </span>
              </div>
            </Col>
            <Col lg={4} className="text-lg-end">
              <div className="bg-white text-dark p-4 rounded shadow">
                <h3 className="text-primary">$99</h3>
                <Button variant="primary" size="lg" className="w-100 mb-2">
                  Enroll Now
                </Button>
                <Button variant="outline-primary" className="w-100">
                  Add to Wishlist
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <Row>
        <Col lg={8}>
          <Card className="mb-4">
            <Card.Header>
              <h5 className="mb-0">Course Content</h5>
            </Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="mb-1">Introduction to React</h6>
                  <small className="text-muted">Getting started with React.js</small>
                </div>
                <Badge bg="primary" pill>15 min</Badge>
              </ListGroup.Item>
              <ListGroup.Item className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="mb-1">Components and JSX</h6>
                  <small className="text-muted">Understanding React components</small>
                </div>
                <Badge bg="primary" pill>25 min</Badge>
              </ListGroup.Item>
              <ListGroup.Item className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="mb-1">State and Props</h6>
                  <small className="text-muted">Managing component state</small>
                </div>
                <Badge bg="primary" pill>30 min</Badge>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
        
        <Col lg={4}>
          <Card>
            <Card.Header>
              <h5 className="mb-0">Course Info</h5>
            </Card.Header>
            <Card.Body>
              <div className="mb-3">
                <strong>Level:</strong> Intermediate
              </div>
              <div className="mb-3">
                <strong>Duration:</strong> 12 hours
              </div>
              <div className="mb-3">
                <strong>Lessons:</strong> 24
              </div>
              <div className="mb-3">
                <strong>Certificate:</strong> Yes
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CourseDetail;
