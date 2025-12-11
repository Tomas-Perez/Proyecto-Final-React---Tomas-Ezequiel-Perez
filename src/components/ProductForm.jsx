import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Card } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useProducts } from '../context/ProductsContext';

const ProductForm = () => {
  const { agregarProducto, editarProducto, getProductoById } = useProducts();
  const navigate = useNavigate();
  const { id } = useParams(); // Si hay ID, estamos editando

  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    image: '',
    category: 'electronic'
  });

  useEffect(() => {
    if (id) {
      const producto = getProductoById(id);
      if (producto) {
        setFormData(producto);
      }
    }
  }, [id, getProductoById]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (id) {
      editarProducto({ ...formData, id: parseInt(id) }); // Aseguramos que el ID se mantenga
      alert("Producto actualizado correctamente");
    } else {
      agregarProducto({ 
        ...formData, 
        price: parseFloat(formData.price), 
        image: formData.image || "https://via.placeholder.com/150" // Sino agregamos imagen por defecto
      }); 
      alert("Producto creado correctamente");
    }
    navigate('/'); // Volver al inicio
  };

  return (
    <Container className="mt-5">
      <Card className="p-4 shadow">
        <h2 className="text-center mb-4">{id ? "Editar Producto" : "Nuevo Producto"}</h2>
        <Form onSubmit={handleSubmit}>
          
          <Form.Group className="mb-3">
            <Form.Label>Nombre del Producto</Form.Label>
            <Form.Control 
              type="text" name="title" required 
              value={formData.title} onChange={handleChange} 
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Precio</Form.Label>
            <Form.Control 
              type="number" name="price" required 
              value={formData.price} onChange={handleChange} 
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>URL de la Imagen</Form.Label>
            <Form.Control 
              type="text" name="image" 
              placeholder="https://..."
              value={formData.image} onChange={handleChange} 
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Descripción</Form.Label>
            <Form.Control 
              as="textarea" rows={3} name="description" required 
              value={formData.description} onChange={handleChange} 
            />
          </Form.Group>

          <Button variant="success" type="submit" className="w-100">
            {id ? "Guardar Cambios" : "Crear Producto"}
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default ProductForm;