import React from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';

const Courses = () => {
  const sampleCourses = [
    {
      id: 1,
      title: 'React.js Complete Course',
      description: 'Learn React.js from basics to advanced concepts',
      instructor: 'John Doe',
      price: 99,
      level: 'Intermediate',
      category: 'Programming'
    },
    {
      id: 2,
      title: 'Node.js Backend Development',
      description: 'Master backend development with Node.js and Express',
      instructor: 'Jane Smith',
      price: 89,
      level: 'Advanced',
      category: 'Programming'
    },
    {
      id: 3,
      title: 'UI/UX Design Fundamentals',
      description: 'Learn the principles of user interface and experience design',
      instructor: 'Mike Johnson',
      price: 79,
      level: 'Beginner',
      category: 'Design'
    }
  ];

  return (
    <Container className="py-4">
      <Row className="mb-4">
        <Col>
          <h1>All Courses</h1>
          <p className="text-muted">Discover our collection of courses</p>
        </Col>
      </Row>
      
      <Row>
        {sampleCourses.map(course => (
          <Col md={4} key={course.id} className="mb-4">
            <Card className="course-card h-100">
              <div className="course-thumbnail bg-light d-flex align-items-center justify-content-center">
                <i className="bi bi-play-circle display-1 text-muted"></i>
              </div>
              <Card.Body>
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <Badge bg="primary">{course.category}</Badge>
                  <Badge bg="secondary">{course.level}</Badge>
                </div>
                <Card.Title>{course.title}</Card.Title>
                <Card.Text className="text-muted">
                  {course.description}
                </Card.Text>
                <div className="d-flex justify-content-between align-items-center">
                  <small className="text-muted">by {course.instructor}</small>
                  <h5 className="text-primary mb-0">${course.price}</h5>
                </div>
              </Card.Body>
              <Card.Footer className="bg-transparent">
                <Button variant="primary" className="w-100">
                  View Course
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Courses;
