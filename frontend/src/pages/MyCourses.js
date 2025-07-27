import React from 'react';
import { Container, Row, Col, Card, ProgressBar, Button } from 'react-bootstrap';

const MyCourses = () => {
  const enrolledCourses = [
    {
      id: 1,
      title: 'React.js Complete Course',
      progress: 65,
      instructor: 'John Doe',
      nextLesson: 'State Management with Redux'
    },
    {
      id: 2,
      title: 'Node.js Backend Development',
      progress: 30,
      instructor: 'Jane Smith',
      nextLesson: 'Express.js Routing'
    }
  ];

  return (
    <Container className="py-4">
      <Row className="mb-4">
        <Col>
          <h1>My Courses</h1>
          <p className="text-muted">Continue your learning journey</p>
        </Col>
      </Row>
      
      <Row>
        {enrolledCourses.map(course => (
          <Col md={6} key={course.id} className="mb-4">
            <Card className="h-100">
              <Card.Body>
                <Card.Title>{course.title}</Card.Title>
                <Card.Text className="text-muted">
                  Instructor: {course.instructor}
                </Card.Text>
                <div className="mb-3">
                  <div className="d-flex justify-content-between mb-1">
                    <small>Progress</small>
                    <small>{course.progress}%</small>
                  </div>
                  <ProgressBar now={course.progress} />
                </div>
                <div className="mb-3">
                  <small className="text-muted">Next lesson:</small>
                  <div>{course.nextLesson}</div>
                </div>
                <Button variant="primary" className="w-100">
                  Continue Learning
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default MyCourses;
