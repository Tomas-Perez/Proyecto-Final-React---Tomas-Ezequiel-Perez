import React, { createContext, useState, useEffect, useContext } from 'react';

const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // ✅ Nuevo estado para manejar errores

  const API_URL = 'https://693b08609b80ba7262cc4011.mockapi.io/products';

  useEffect(() => {
    setLoading(true);
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error("No se pudieron cargar los productos");
        return res.json();
      })
      .then((data) => {
        setProductos(data);
        setError(null);
      })
      .catch((err) => {
        console.error("Error cargando productos:", err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  const agregarProducto = async (nuevoProducto) => {
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoProducto)
      });

      if (!res.ok) throw new Error("Error al crear el producto");
      
      const data = await res.json();
      setProductos([...productos, data]); 
      setError(null);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  const editarProducto = async (productoEditado) => {
    try {
      const res = await fetch(`${API_URL}/${productoEditado.id}`, {
        method: 'PUT', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productoEditado)
      });

      if (!res.ok) throw new Error("Error al editar el producto");

      const data = await res.json();
      
      const nuevosProductos = productos.map((prod) => 
        prod.id === data.id ? data : prod
      );
      setProductos(nuevosProductos);
      setError(null);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  const eliminarProducto = async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE', 
      });

      if (!res.ok) throw new Error("Error al eliminar el producto");

      const nuevosProductos = productos.filter((prod) => prod.id !== id);
      setProductos(nuevosProductos);
      setError(null);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  const getProductoById = (id) => {
    return productos.find((prod) => prod.id == id);
  };

  return (
    <ProductsContext.Provider value={{ 
      productos, 
      loading, 
      error, 
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