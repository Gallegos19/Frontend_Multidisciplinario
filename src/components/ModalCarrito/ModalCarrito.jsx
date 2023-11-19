// ModalCarrito.js
import React, { useState, useEffect } from "react";
import style from "./ModalCarrito.module.css";
import { useCartContext } from "../../context/CartContext"; // Ajusta la ruta según la ubicación real de tu contexto
import { FaRegTrashCan } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa";
import { RiSubtractLine } from "react-icons/ri";
import { CiSaveDown1 } from "react-icons/ci";

const ModalCarrito = ({ isOpen, onClose }) => {
  const { cart, removeProduct, setCart } = useCartContext();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // Calcula el total cada vez que cambia el carrito
    const newTotal = cart.reduce((acc, producto) => {
      return acc + producto.precio * producto.cantidad;
    }, 0);

    setTotal(newTotal);
  }, [cart]);

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
                <img src={producto.urlImagen} className={style.tenis} alt="" />
                <div className={style.detalles}>
                  <p>{producto.nombre}</p>
                  <p>Talla: {producto.talla}</p>
                  <p>${producto.precio} </p>
                  <p> {producto.cantidad} pc</p>
                  <div className={style.botones}>
                    <button
                      onClick={() => handleRemoveFromCarrito(producto.id)}
                    >
                      <FaRegTrashCan size={"1rem"} className={style.icon} />
                    </button>
                    <button
                      onClick={() =>
                        handleEditCantidad(producto.id, producto.cantidad + 1)
                      }
                    >
                      <FaPlus size={"1rem"} className={style.icon} />
                    </button>
                    <button
                      onClick={() =>
                        handleEditCantidad(producto.id, producto.cantidad - 1)
                      }
                    >
                      <RiSubtractLine size={"1rem"} className={style.icon} />
                    </button>
                  </div>
                </div>
              </li>
            ))}
            <div className={style.section}>
          {" "}
          <p>Total: ${total}</p>
          <CiSaveDown1 size={'1.5rem'} className={style.save}/>
        </div>
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
