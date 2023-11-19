// ModalCarrito.js
import React, { useState, useEffect } from "react";
import style from "./ModalCarrito.module.css";
import { useCartContext } from "../../context/CartContext";
import { FaRegTrashCan } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa";
import { RiSubtractLine } from "react-icons/ri";
import { CiSaveDown1 } from "react-icons/ci";

const ModalCarrito = ({ isOpen, onClose }) => {
  const { cart, removeProduct, setCart } = useCartContext();
  const [total, setTotal] = useState(0);
  const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);

  useEffect(() => {
    const newTotal = cart.reduce((acc, producto) => {
      return acc + producto.precio * producto.cantidad;
    }, 0);

    setTotal(newTotal);
  }, [cart]);

  if (!isOpen) {
    return null;
  }

  const handleGuardar = () => {
    setConfirmationModalOpen(true);
  };

  const handleAceptarApartado = () => {
    // Lógica para aceptar el apartado
    setConfirmationModalOpen(false);
  };

  const handleRechazarApartado = () => {
    // Lógica para rechazar el apartado
    setConfirmationModalOpen(false);
  };

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
              <CiSaveDown1 size={"2rem"} className={style.save} onClick={handleGuardar}/>
            </div>
          </ul>
        )}

        {isConfirmationModalOpen && (
          <div className={style.confirmationModal}>
            <p>¿Deseas guardar el apartado?</p>
            <button className={style.buttonCerrar} onClick={handleAceptarApartado}>Aceptar</button>
            <button className={style.buttonCerrar} onClick={handleRechazarApartado}>Rechazar</button>
          </div>
        )}

        <button className={style.buttonCerrar} onClick={onClose}>
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default ModalCarrito;