import React, { useState } from 'react'; 
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext'; 
import { useNavigate } from 'react-router-dom';  

const Login = () => {
  const [usuario, setUsuario] = useState(''); 
  const { login } = useAuth(); 
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    login({ name: usuario }); 
    
    navigate('/'); 
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Row className="w-100 justify-content-center">
        <Col md={6} lg={4}>
          <Card className="shadow-lg p-4">
            <Card.Body>
              <h2 className="text-center mb-4">Iniciar Sesión</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formUsername">
                  <Form.Label>Usuario</Form.Label>
                  {}
                  <Form.Control 
                    type="text" 
                    placeholder="Ingrese su usuario" 
                    required 
                    value={usuario}
                    onChange={(e) => setUsuario(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control type="password" placeholder="Ingrese su contraseña" required />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                  Ingresar
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;