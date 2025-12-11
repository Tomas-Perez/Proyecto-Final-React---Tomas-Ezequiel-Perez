import React, { createContext, useState, useEffect, useContext } from 'react';

const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data) => {
        setProductos(data);
        setLoading(false);
      })
      .catch((err) => console.error("Error cargando productos:", err));
  }, []);

  const agregarProducto = (nuevoProducto) => {
    const productoConId = { ...nuevoProducto, id: Date.now() };
    setProductos([productoConId, ...productos]); 
  };

  const editarProducto = (productoEditado) => {
    const nuevosProductos = productos.map((prod) => 
      prod.id === productoEditado.id ? productoEditado : prod
    );
    setProductos(nuevosProductos);
  };

  const eliminarProducto = (id) => {
    const nuevosProductos = productos.filter((prod) => prod.id !== id);
    setProductos(nuevosProductos);
  };

  const getProductoById = (id) => {
    return productos.find((prod) => prod.id === parseInt(id));
  };

  return (
    <ProductsContext.Provider value={{ 
      productos, 
      loading, 
      agregarProducto, 
      editarProducto, 
      eliminarProducto,
      getProductoById
    }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => useContext(ProductsContext);