import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const NotFound = () => {
  return (
    <Container className="py-5">
      <Row className="justify-content-center text-center">
        <Col md={6}>
          <div className="display-1 text-primary mb-4">404</div>
          <h2 className="mb-4">Page Not Found</h2>
          <p className="text-muted mb-4">
            The page you are looking for doesn't exist or has been moved.
          </p>
          <LinkContainer to="/">
            <Button variant="primary" size="lg">
              <i className="bi bi-house me-2"></i>
              Go Home
            </Button>
          </LinkContainer>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound;
