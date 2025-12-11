import React from 'react';
import ProductList from './ProductList';

const Infaltables = () => {
 return (
    <div className="container">
      <h1>Infaltables (Menos de $25)</h1>
      <ProductList filterFunc={(prod) => prod.price < 25} />
    </div>
  );
};

export default Infaltables;