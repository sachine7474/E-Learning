import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <Container className="py-4">
      <Row>
        <Col>
          <h1 className="mb-4">Welcome back, {user?.firstName}!</h1>
        </Col>
      </Row>
      
      <Row>
        <Col md={3} className="mb-4">
          <Card className="stat-card">
            <Card.Body>
              <div className="stat-number">5</div>
              <div>Enrolled Courses</div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-4">
          <Card className="stat-card">
            <Card.Body>
              <div className="stat-number">2</div>
              <div>Completed</div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-4">
          <Card className="stat-card">
            <Card.Body>
              <div className="stat-number">45h</div>
              <div>Study Time</div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-4">
          <Card className="stat-card">
            <Card.Body>
              <div className="stat-number">3</div>
              <div>Certificates</div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <h5 className="mb-0">Recent Activity</h5>
            </Card.Header>
            <Card.Body>
              <p>This is a demo dashboard. In a real application, this would show recent course activity, progress, and recommendations.</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
