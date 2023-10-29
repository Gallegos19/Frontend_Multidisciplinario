import React, { useState, useRef, useEffect } from "react";
import { BiUserCircle, BiCart, BiUser, BiUserX } from "react-icons/bi";
import style from "./MenuUser.module.css"; // Agrega tus estilos CSS aquí
import { useNavigate } from "react-router-dom";

const UserMenu = ({ nombre }) => {
  const [showCartNotification, setShowCartNotification] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        // Cerrar el menú cuando se hace clic fuera de él
        setShowUserMenu(false);
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
        <button onClick={handleAddToCart}>
          <BiCart size={25} color="black" />
          <a>Carrito</a>
        </button>
        {showCartNotification && (
          <div className={style.cartNotification}>
            ¡Producto agregado al carrito!
          </div>
        )}
        <button onClick={() => navigate("/login")}>
          <BiUserCircle size={25} color="black" />
          <a>Iniciar Sesion</a>
        </button>
        <button onClick={handleAddToCloseSesion}>
          <BiUserX size={25} color="black" />
          <a>Cerrar Sesion</a>
        </button>
      </div>
    </div>
  );
};

export default UserMenu;
