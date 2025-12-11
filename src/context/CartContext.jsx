import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  // Función para agregar productos
  const agregarAlCarrito = (producto) => {
    
    const existe = carrito.find((item) => item.id === producto.id);

    if (existe) {
      const carritoActualizado = carrito.map((item) =>
        item.id === producto.id 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
        
      );
      setCarrito(carritoActualizado);
      alert("Producto agregado al carrito");
    } else {
      setCarrito([...carrito, { ...producto, quantity: 1 }]);
      alert("Producto agregado al carrito");
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