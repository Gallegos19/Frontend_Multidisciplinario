// CartContext.jsx
import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCartContext = () => useContext(CartContext);

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addProduct = (item, newQuantity) => {
    const newCart = cart.filter((prod) => prod.id !== item.id);
    newCart.push({ ...item, cantidad: newQuantity });
    setCart(newCart);
  };

  const clearCart = () => setCart([]);

  const isInCart = (id) => {
    return cart.find((product) => product.id === id) ? true : false;
  };

  const removeProduct = (id) => setCart(cart.filter((product) => product.id !== id));

  
  return (
    <CartContext.Provider value={{ cart, addProduct,setCart, clearCart, isInCart, removeProduct }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;