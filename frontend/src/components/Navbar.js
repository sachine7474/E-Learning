import React from 'react';
import { Navbar as BootstrapNavbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <BootstrapNavbar bg="primary" variant="dark" expand="lg" sticky="top">
      <Container>
        <LinkContainer to="/">
          <BootstrapNavbar.Brand>
            <i className="bi bi-mortarboard-fill me-2"></i>
            ELearn Hub
          </BootstrapNavbar.Brand>
        </LinkContainer>
        
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/courses">
              <Nav.Link>Courses</Nav.Link>
            </LinkContainer>
            {isAuthenticated && (
              <>
                <LinkContainer to="/dashboard">
                  <Nav.Link>Dashboard</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/my-courses">
                  <Nav.Link>My Courses</Nav.Link>
                </LinkContainer>
                {(user?.role === 'instructor' || user?.role === 'admin') && (
                  <LinkContainer to="/create-course">
                    <Nav.Link>Create Course</Nav.Link>
                  </LinkContainer>
                )}
              </>
            )}
          </Nav>
          
          <Nav>
            {isAuthenticated ? (
              <NavDropdown 
                title={
                  <span>
                    <i className="bi bi-person-circle me-1"></i>
                    {user?.firstName} {user?.lastName}
                  </span>
                } 
                id="user-nav-dropdown"
              >
                <LinkContainer to="/profile">
                  <NavDropdown.Item>
                    <i className="bi bi-person me-2"></i>
                    Profile
                  </NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>
                  <i className="bi bi-box-arrow-right me-2"></i>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="bi bi-box-arrow-in-right me-1"></i>
                    Login
                  </Nav.Link>
                </LinkContainer>
                <LinkContainer to="/register">
                  <Nav.Link>
                    <i className="bi bi-person-plus me-1"></i>
                    Register
                  </Nav.Link>
                </LinkContainer>
              </>
            )}
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;
