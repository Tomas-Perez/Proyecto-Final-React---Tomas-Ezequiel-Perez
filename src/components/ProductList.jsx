import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import ProductCard from './ProductCard';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductsContext';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const ProductList = () => {
    const { productos, loading, eliminarProducto } = useProducts(); 
    const { agregarAlCarrito } = useCart();
    const { isAuthenticated } = useAuth(); // Para mostrar botones solo si esta logueado

    if (loading) return <div>Cargando productos...</div>;

    return (
        <>
            {/* Botón para Crear Producto (Solo visible si logueado) */}
            {isAuthenticated && (
                <div className="mb-4 text-end">
                    <Button as={Link} to="/producto/nuevo" variant="success">
                        + Nuevo Producto
                    </Button>
                </div>
            )}

            <Row>
                {productos.map((product) => (
                    <Col md={4} key={product.id} className="mb-4">
                        <ProductCard 
                            product={product} 
                            agregarAlCarrito={agregarAlCarrito} 
                        />
                        
                        {/* Botones de Administración (Editar/Eliminar) */}
                        {isAuthenticated && (
                            <div className="d-flex justify-content-between mt-2">
                                <Button 
                                    as={Link} 
                                    to={`/producto/editar/${product.id}`} 
                                    variant="warning" 
                                    size="sm"
                                >
                                    ✏️ Editar
                                </Button>
                                <Button 
                                    variant="danger" 
                                    size="sm"
                                    onClick={() => {
                                        if(window.confirm('¿Borrar producto?')) 
                                            eliminarProducto(product.id)
                                    }}
                                >
                                    🗑️ Borrar
                                </Button>
                            </div>
                        )}
                    </Col>
                ))}
            </Row>
        </>
  );
}
export default ProductList;