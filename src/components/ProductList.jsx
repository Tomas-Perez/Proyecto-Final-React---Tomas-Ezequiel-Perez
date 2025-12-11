import React from 'react';
import { Row, Col } from 'react-bootstrap';
import ProductCard from './ProductCard';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductsContext';
//import { useAuth } from '../context/AuthContext';
//import { Link } from 'react-router-dom';

const ProductList = ({ category }) => { 
    const { productos, loading } = useProducts(); 
    const { agregarAlCarrito } = useCart();
    
    if (loading) return <div>Cargando productos...</div>;

    const productosAMostrar = category 
        ? productos.filter((prod) => prod.category === category)
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