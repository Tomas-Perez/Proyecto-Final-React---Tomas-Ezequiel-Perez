import React, { useState } from 'react';
import { Container, Button, Table, Card, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useProducts } from '../context/ProductsContext';

const Admin = () => {
  const { user } = useAuth();
  const { productos, eliminarProducto } = useProducts();

  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const handleClose = () => {
    setShowModal(false);
    setSelectedId(null);
  };

  const handleShow = (id) => {
    setSelectedId(id);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    if (selectedId) {
      await eliminarProducto(selectedId);
    }
    handleClose();
  };

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
                      onClick={() => handleShow(prod.id)} 
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

      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que deseas eliminar este producto? 
          <br />
          <small className="text-muted">Esta acción no se puede deshacer.</small>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>

    </Container>
  );
};

export default Admin;