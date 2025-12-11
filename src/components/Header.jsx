import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../context/AuthContext';

const Header = () => {

  const { user, logout } = useAuth();

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Container>       
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <span>Proyecto Final React</span>
        </Navbar.Brand>

        <Nav className="ms-auto align-items-center">
          <Nav.Link as={Link} to="/" className="me-3">Home</Nav.Link> 
          <Nav.Link as={Link} to="/ofertas" className="me-3">Ofertas</Nav.Link>
          <Nav.Link as={Link} to="/infaltables" className="me-3">Infaltables</Nav.Link>

          <div className="d-flex align-items-center">
            {user ? (
              <>
                <span className="text-white me-3">Hola, {user.name}</span>
                <Button variant="outline-danger" onClick={logout} className="me-2">
                  Cerrar sesión
                </Button>
              </>
            ) : (
              <Button variant="outline-light" as={Link} to="/login" className="me-2">
                Iniciar sesión
              </Button>
            )}
            <Link to="/carrito" className="text-white">
              <FontAwesomeIcon icon={faShoppingCart} size="lg" />
            </Link>
          </div>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;