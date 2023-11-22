// ModalCarrito.js
import React, { useState, useEffect } from "react";
import style from "./ModalCarrito.module.css";
import { useCartContext } from "../../context/CartContext";
import { FaRegTrashCan } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa";
import { RiSubtractLine } from "react-icons/ri";
import { CiSaveDown1 } from "react-icons/ci";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ModalCarrito = ({ isOpen, onClose }) => {
  const { cart, removeProduct, setCart,clearCart } = useCartContext();
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

  const handleAceptarApartado = async () => {
    setConfirmationModalOpen(false);
    const token = localStorage.getItem('token');
    const idclient= localStorage.getItem('id');
  
    try {
      // Enviar una solicitud para cada producto en el carrito
      for (const producto of cart) {
        const vigencia = new Date();
      vigencia.setDate(vigencia.getDate() + 3);

      const requestBody = {
        productoId: producto.id,
        cantidad: producto.cantidad,
        precioUnitario: producto.precio,
        subTotal: producto.precio * producto.cantidad,
        descuento: 0, // Puedes ajustar esto según tus necesidades
        total: producto.precio * producto.cantidad,
        clienteId: idclient, // Cambia esto según tus necesidades
        vigencia: vigencia.toISOString() 
        };
  
        const response = await fetch('http://localhost:8080/v1/Apartados', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(requestBody)
        });
  
        if (response.ok) {
          console.log(`Apartado para ${producto.nombre} guardado exitosamente`);
         
          // Puedes agregar lógica adicional aquí después de una solicitud exitosa
        } else {
          console.error(`Error al guardar el apartado para ${producto.nombre}:`, response.statusText);
          toast.error(`Error al guardar el apartado para ${producto.nombre}:`, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
          });
          // Puedes manejar el error de alguna manera
        }
      }
    } catch (error) {
      console.error('Error:', error.message);
      toast.error(`Error al guardar el apartado`, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
      // Puedes manejar el error de alguna manera
    } finally {
      toast.success(`Apartado guardado exitosamente`, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
      setTimeout(() => {
        clearCart();
      }, 1400);
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
    const maxCantidad = 3; // Establece el máximo permitido
  
    // Obtén el producto actual del carrito
    const productoActual = cart.find((producto) => producto.id === id);
  
    // Asegúrate de que la nueva cantidad no sea menor que 1
    newCantidad = Math.max(1, newCantidad);
  
    const updatedCarrito = cart.map((producto) => {
      if (producto.id === id) {
        return { ...producto, cantidad: newCantidad };
      }
      return producto;
    });
  
    // Verifica si la cantidad total en el carrito supera el límite
    const totalCarrito = updatedCarrito.reduce((acc, producto) => {
      return acc + producto.cantidad;
    }, 0);
  
    if (totalCarrito <= maxCantidad) {
      // Si la nueva cantidad es menor o igual al máximo permitido, actualiza el carrito
      setCart(updatedCarrito);
    } else {
      toast.error(`Solo puede apartar máximo 3 calzados`, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
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
      <ToastContainer />
    </div>
  );
};

export default ModalCarrito;