import React from 'react';
import { Container, Table, Button, Card } from 'react-bootstrap';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Carrito = () => {
  // 1. Obtenemos los datos y funciones del contexto
  const { carrito, eliminarDelCarrito } = useCart();

  // 2. Calculamos el total dinámicamente
  const total = carrito.reduce((acc, prod) => acc + prod.price, 0);

  // 3. Renderizado condicional: Si está vacío, mostramos mensaje
  if (carrito.length === 0) {
    return (
      <Container className="mt-5 text-center">
        <h2>Tu carrito está vacío 😢</h2>
        <p>¡Ve a buscar algunos productos interesantes!</p>
        <Button as={Link} to="/" variant="primary">Volver a la tienda</Button>
      </Container>
    );
  }

  // 4. Si tiene productos, mostramos la tabla
  return (
    <Container className="mt-5">
      <h2 className="mb-4">Tu Compra</h2>
      <Card className="shadow-sm">
        <Card.Body>
          <Table responsive hover>
            <thead>
              <tr>
                <th>Producto</th>
                <th>Precio</th>
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
                  <td className="align-middle">
                    <Button 
                      variant="danger" 
                      size="sm" 
                      onClick={() => eliminarDelCarrito(prod.id)}
                    >
                      🗑️ Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {/* Resumen del Total */}
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