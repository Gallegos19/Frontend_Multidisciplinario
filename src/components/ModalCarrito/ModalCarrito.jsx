// ModalCarrito.js
import React from "react";
import style from "./ModalCarrito.module.css";
import { useCartContext } from '../../context/CartContext'; // Ajusta la ruta según la ubicación real de tu contexto
import { SlTag } from "react-icons/sl";

const ModalCarrito = ({ isOpen, onClose }) => {
  const { cart, removeProduct, setCart } = useCartContext();

  if (!isOpen) {
    return null;
  }

  const handleRemoveFromCarrito = (id) => {
    removeProduct(id);
  };

  const handleEditCantidad = (id, newCantidad) => {
    if (newCantidad >= 1) {
      const updatedCarrito = cart.map((producto) => {
        if (producto.id === id) {
          return { ...producto, cantidad: newCantidad };
        }
        return producto;
      });
      setCart(updatedCarrito);
    }
  };

  return (
    <div className={style.modalOverlay} onClick={onClose}>
      <div className={style.modalContent} onClick={(e) => e.stopPropagation()}>
        <h2 style={{ color: "black" }}>Tu Carrito ({cart.length})</h2>
        {cart.length === 0 ? (
          <p>No hay productos en el carrito</p>
        ) : (
          <ul className={style.productList}>
            {cart.map((producto) => (
              <li key={producto.id}>
                {console.log(producto)}
                <img src={producto.urlImagen} className={style.tenis} alt="" />
                <div className={style.detalles}>
                <p>{producto.nombre}</p>
                <p>Cantidad: {producto.cantidad}</p>
                <p>Talla: ${producto.talla}</p>
                <p>Precio: ${producto.precio}</p>
                
                <div className={style.botones}>
                  <button onClick={() => handleRemoveFromCarrito(producto.id)}>Quitar Producto</button>
                  <button onClick={() => handleEditCantidad(producto.id, producto.cantidad + 1)}>+</button>
                  <button onClick={() => handleEditCantidad(producto.id, producto.cantidad - 1)}>-</button>
                </div>
                </div>
              </li>
            ))}
          </ul>
        )}
        <button className={style.buttonCerrar} onClick={onClose}>
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default ModalCarrito;
