import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  // Función para agregar productos
  const agregarAlCarrito = (producto) => {

    const existe = carrito.find((item) => item.id === producto.id);
    
    if (existe) { // REVISAR
      // Si ya existe, podríamos aumentar la cantidad (lógica futura)
      alert("El producto ya está en el carrito");
    } else {
      setCarrito([...carrito, producto]);
      alert("Producto agregado correctamente");
    }
  };

  const eliminarDelCarrito = (id) => {
    setCarrito(carrito.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider value={{ carrito, agregarAlCarrito, eliminarDelCarrito }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);