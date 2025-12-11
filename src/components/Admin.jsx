import React from 'react';
import { Container, Button, Table, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useProducts } from '../context/ProductsContext';

const Admin = () => {
  const { user } = useAuth();
  const { productos, eliminarProducto } = useProducts();

  if (user?.role !== 'admin') {
    return (
        <Container className="mt-5 text-center">
            <h3 className="text-danger">Acceso Denegado</h3>
            <p>Necesitas permisos de administrador para ver esta sección.</p>
        </Container>
    );
  }

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Panel de Administración</h1>
        <Button as={Link} to="/producto/nuevo" variant="success" size="lg">
          + Nuevo Producto
        </Button>
      </div>

      <Card className="shadow">
        <Card.Body>
          <Table responsive hover striped>
            <thead className="table-dark">
              <tr>
                <th>Img</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Categoría</th>
                <th className="text-end">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((prod) => (
                <tr key={prod.id} className="align-middle">
                  <td>
                    <img 
                      src={prod.image} 
                      alt={prod.title} 
                      style={{ width: '40px', height: '40px', objectFit: 'contain' }} 
                    />
                  </td>
                  <td>{prod.title}</td>
                  <td>${prod.price}</td>
                  <td>{prod.category}</td>
                  <td className="text-end">
                    <Button 
                      as={Link} 
                      to={`/producto/editar/${prod.id}`} 
                      variant="warning" 
                      size="sm"
                      className="me-2"
                    >
                      ✏️ Editar
                    </Button>

                    <Button 
                      variant="danger" 
                      size="sm"
                      onClick={() => {
                        if(window.confirm('¿Estás seguro de eliminar este producto?')) 
                           eliminarProducto(prod.id)
                      }}
                    >
                      🗑️ Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Admin;