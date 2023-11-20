import React, { useState, useRef, useEffect } from "react";
import { BiUserCircle, BiUser, BiUserX, BiHelpCircle } from "react-icons/bi";
import style from "./MenuUser.module.css";
import { useNavigate } from "react-router-dom";
import CartModal from "../ModalCarrito/ModalCarrito";
import { IoBriefcaseOutline } from "react-icons/io5";

const UserMenu = () => {
  const [showCartNotification, setShowCartNotification] = useState(false);
  const [isCartModalOpen, setCartModalOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setCartModalOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const userId = localStorage.getItem('id');
    const cachedUserData = localStorage.getItem('cachedUserData');

    if (userId && cachedUserData) {
      // Utiliza los datos en caché
      const userData = JSON.parse(cachedUserData);
      if (userData.data && userData.data.length > 0) {
        setUserName(userData.data[0].nombre);
      }
    } else if (userId) {
      // Realiza la solicitud y actualiza la caché
      const fetchUserData = async () => {
        try {
          const response = await fetch(`https://f2r4qdv2-8080.euw.devtunnels.ms/v1/Usuarios/${userId}`);
          const responseData = await response.json();

          if (responseData.data && responseData.data.length > 0) {
            setUserName(responseData.data[0].nombre);
            localStorage.setItem('cachedUserData', JSON.stringify(responseData));
          } else {
            console.error("La respuesta no tiene el formato esperado:", responseData);
          }
        } catch (error) {
          console.error("Error al obtener los datos del usuario:", error);
        }
      };

      fetchUserData();
    }
  }, []);

  const handleAddToCart = (event) => {
    event.stopPropagation();
    setShowCartNotification(true);
    setCartModalOpen(true);

    setTimeout(() => {
      setShowCartNotification(false);
    }, 3000);
  };

  const handleAddToCloseSesion = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('id');
    localStorage.removeItem('cachedUserData');
    navigate("/login");
  };

  return (
    <div className={style.userMenu} ref={menuRef}>
      <div className={style.userInfo}>
        <BiUser size={25} color="black" />
        <span>Bienvenid@ {userName}</span>
      </div>
      <div className={style.userActions}>
        {!localStorage.getItem('token') && (
          <button onClick={() => navigate("/login")}>
            <BiUserCircle size={25} color="black" />
            <span>Iniciar Sesión</span>
          </button>
        )}
        <button onClick={handleAddToCloseSesion}>
          <IoBriefcaseOutline size={25} color="black" />
          <span>Apartados</span>
        </button>
        {localStorage.getItem('token') && (
          <button onClick={handleAddToCloseSesion}>
            <BiUserX size={25} color="black" />
            <span>Cerrar Sesión</span>
          </button>
        )}
      </div>
      <CartModal isOpen={isCartModalOpen} onClose={() => setCartModalOpen(false)} />
    </div>
  );
};

export default UserMenu;
