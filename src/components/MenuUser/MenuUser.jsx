import React, { useState, useRef, useEffect } from "react";
import { BiUserCircle, BiCart, BiUser, BiUserX, BiHelpCircle } from "react-icons/bi";
import style from "./MenuUser.module.css"; // Agrega tus estilos CSS aquí
import { useNavigate } from "react-router-dom";
import CartModal from "../ModalCarrito/ModalCarrito"; // Importa el componente CartModal

const UserMenu = ({ nombre }) => {
  const [showCartNotification, setShowCartNotification] = useState(false);
  const [isCartModalOpen, setCartModalOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        // Cerrar el menú cuando se hace clic fuera de él
        setCartModalOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleAddToCart = (event) => {
    // Detener la propagación del evento de clic dentro del menú
    event.stopPropagation();

    // Lógica para agregar elementos al carrito
    // Puedes usar un estado global o un contexto para manejar el estado del carrito
    // Por ejemplo: addToCart(item);
    setShowCartNotification(true);

    // Mostrar el modal del carrito
    setCartModalOpen(true);

    // Ocultar la notificación después de un cierto período de tiempo (por ejemplo, 3 segundos)
    setTimeout(() => {
      setShowCartNotification(false);
    }, 3000);
  };

  const handleAddToSesion = (event) => {
    event.stopPropagation();
  };

  const handleAddToCloseSesion = (event) => {
    event.stopPropagation();
  };

  const navigate = useNavigate();
  return (
    <div className={style.userMenu} ref={menuRef}>
      <div className={style.userInfo}>
        <BiUser size={25} color="black" />
        <span>{nombre}</span>
      </div>
      <div className={style.userActions}>
        {/* <button onClick={handleAddToCart}>
          <BiCart size={25} color="black" />
          <a>Carrito</a>
        </button> */}
        <button onClick={() => navigate("/login")}>
          <BiUserCircle size={25} color="black" />
          <a>Iniciar Sesión</a>
        </button>
        <button onClick={handleAddToCloseSesion}>
          <BiUserX size={25} color="black" />
          <a>Cerrar Sesión</a>
        </button>
        <button onClick={handleAddToCloseSesion}>
          <BiHelpCircle size={25} color="black" />
          <a>Apartados</a>
        </button>
      </div>
      {/* <CartModal isOpen={isCartModalOpen} onClose={() => setCartModalOpen(false)} /> */}
    </div>
  );
};

export default UserMenu;