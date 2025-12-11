import React from 'react';
import ProductList from './ProductList';

const Ofertas = () => {
  return (
    <div className="container">
      <h1>Ofertas (Menos de $50)</h1>
      <ProductList filterFunc={(prod) => prod.price < 50} />
    </div>
  );
};

export default Ofertas;