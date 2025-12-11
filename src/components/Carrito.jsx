import React from 'react';
import { Container, Table, Button, Card } from 'react-bootstrap';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Carrito = () => {
  const { carrito, eliminarDelCarrito } = useCart();

  const total = carrito.reduce((acc, prod) => acc + (prod.price * prod.quantity), 0);

  if (carrito.length === 0) {
    return (
      <Container className="mt-5 text-center">
        <h2>Tu carrito está vacío</h2>
        <p>¡Ve a buscar algunos productos interesantes!</p>
        <Button as={Link} to="/" variant="primary">Volver a la tienda</Button>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <h2 className="mb-4">Tu Compra</h2>
      <Card className="shadow-sm">
        <Card.Body>
          <Table responsive hover>
            <thead>
              <tr>
                <th>Producto</th>
                <th>Precio Unit.</th>
                <th>Cantidad</th> 
                <th>Subtotal</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {carrito.map((prod) => (
                <tr key={prod.id}>
                  <td className="d-flex align-items-center">
                    <img 
                      src={prod.image} 
                      alt={prod.title} 
                      style={{ width: '50px', height: '50px', objectFit: 'contain', marginRight: '15px' }} 
                    />
                    <span>{prod.title}</span>
                  </td>
                  <td className="align-middle">${prod.price}</td>
                  
                  <td className="align-middle fw-bold">{prod.quantity}</td>
                  
                  <td className="align-middle">
                    ${(prod.price * prod.quantity).toFixed(2)}
                  </td>

                  <td className="align-middle">
                    <Button 
                      variant="danger" 
                      size="sm" 
                      onClick={() => eliminarDelCarrito(prod.id)}
                    >
                      🗑️
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <div className="d-flex justify-content-end align-items-center mt-4 border-top pt-3">
            <h3 className="me-4">Total: ${total.toFixed(2)}</h3>
            <Button variant="success" size="lg">Finalizar Compra</Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Carrito;