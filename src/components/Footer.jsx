import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'font-awesome/css/font-awesome.min.css';

const Footer = () => {
  return (
    <footer className="bg-dark text-white text-center py-4 mt-4">
      <Container>
        <Row>
          <Col md={6}>
            <p className="mb-0">Copyright © 2002-2025</p>
            <p className="mb-0">Avenida Siempre viva 742, Springfield</p>
          </Col>
          <Col md={6}>
            <div>
              <a href="https://facebook.com" className="text-white me-3">
                <i className="fa fa-facebook fa-2x"></i>
              </a>
              <a href="https://x.com" className="text-white me-3">
                <i className="fa fa-twitter fa-2x"></i>
              </a>
              <a href="https://instagram.com" className="text-white me-3">
                <i className="fa fa-instagram fa-2x"></i>
              </a>
              <a href="https://www.linkedin.com/in/tomas-ezequiel-perez-90230a21b/" className="text-white me-3">
                <i className="fa fa-linkedin fa-2x"></i>
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;