import React from 'react';
import { Row, Col } from 'react-bootstrap';
import ProductCard from './ProductCard';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductsContext';
//import { useAuth } from '../context/AuthContext';
//import { Link } from 'react-router-dom';

const ProductList = ({ filterFunc }) => { 
    const { productos, loading, error } = useProducts(); 
    const { agregarAlCarrito } = useCart();
    
    if (loading) return <div className="text-center mt-5">Cargando productos...</div>;

    if (error) return <Alert variant="danger" className="mt-5 text-center">{error}</Alert>;

    const productosAMostrar = filterFunc 
        ? productos.filter(filterFunc)
        : productos;

    return (
        <Row>
            {productosAMostrar.map((product) => (
                <Col md={4} key={product.id} className="mb-4">
                    <ProductCard 
                        product={product} 
                        agregarAlCarrito={agregarAlCarrito} 
                    />
                </Col>
            ))}
        </Row>
  );
}
export default ProductList;