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

  const handleAceptarApartado = async() => {
    // Lógica para aceptar el apartado
    setConfirmationModalOpen(false);
    const token = localStorage.getItem('token');
      const requestBody = {
        productoId: 3,
        cantidad: 2,
        precioUnitario: 20.0,
        subTotal: 50.0,
        descuento: 5,
        total: 47.5,
        clienteId: 3,
        vigencia: "2023-12-01T12:00:00Z"
      };
    
      try {
        // Make the API request
        const response = await fetch('http://localhost:8080/v1/Apartados', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // Replace 'YOUR_ACCESS_TOKEN' with the actual token
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(requestBody)
        });
    
        if (response.ok) {
          // Handle success
          console.log('Apartado guardado exitosamente');
          // Additional logic as needed after a successful request
        } else {
          // Handle error
          console.error('Error al guardar el apartado:', response.statusText);
          // Additional error handling as needed
        }
      } catch (error) {
        console.error('Error:', error.message);
        // Additional error handling as needed
      } finally {
        // Close the confirmation modal, regardless of success or failure
        setConfirmationModalOpen(false);
      }

    
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