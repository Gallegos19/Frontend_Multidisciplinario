import React, { useState, useContext, useEffect } from "react";
import style from "./NavClient.module.css";
import logo from "../../assets/logo.png";
import Buscador from "../Buscador/Buscador";
import { BiUserCircle, BiCart } from "react-icons/bi";
import DropdownOptions from "../../components/DropdownOptions/DropdownOptions";
import UserMenu from "../MenuUser/MenuUser";
import { useNavigate, useLocation } from "react-router-dom";
import CartModal from "../ModalCarrito/ModalCarrito"; // Importa el componente CartModal
import { useCartContext } from "../../context/CartContext"; // Ajusta la ruta según la ubicación real de tu contexto
import Contador from "../Contador/Contador";

const optionsData = {
  caballero: [
    { label: "Tennis", route: "/tenis/:caballero" },
    { label: "Zapatos", route: "/zapatos/:caballero" },
    { label: "Sandalias", route: "/sandalias/:caballero" },
    { label: "Botas", route: "/botas/:caballero" },
  ],
  damas: [
    { label: "Tennis", route: "/tenis/:damas" },
    { label: "Zapatos", route: "/zapatos/:damas" },
    { label: "Sandalias", route: "/sandalias/:damas" },
    { label: "Tacones", route: "/tacones/:damas" },
  ],
  ninos: [
    { label: "Tennis", route: "/tenis/:ninos" },
    { label: "Zapatos", route: "/zapatos/:ninos" },
    { label: "Sandalias", route: "/sandalias/:ninos" },
  ],
  marcas: [
    { label: "Nike", route: "/marcas/:nike" },
    { label: "Puma", route: "/marcas/:puma" },
    { label: "Adidas", route: "/marcas/:adidas" },
    { label: "Otros", route: "/marcas/:otros" },
  ],
};

const NavClient = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const [activeSection, setActiveSection] = useState(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [showCartNotification, setShowCartNotification] = useState(false);
  const [isCartModalOpen, setCartModalOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0); // Estado para la cantidad en el carrito

  const handleMenuToggle = (menu) => {
    setActiveSection(menu);
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  const closeMenus = () => {
    setShowUserMenu(false);
    setActiveMenu(null);
  };

  useEffect(() => {
    document.addEventListener("click", closeMenus);
    return () => {
      document.removeEventListener("click", closeMenus);
    };
  }, []);

  const handleUserMenuToggle = () => {
    setShowUserMenu(!showUserMenu);
  };

  const handleAddToCart = (event) => {
    event.stopPropagation();
    setCartCount(cartCount + 1);
    setShowCartNotification(true);
    setCartModalOpen(true);

    setTimeout(() => {
      setShowCartNotification(false);
    }, 3000);
  };

  return (
    <div className={style.containerNav} onClick={(e) => e.stopPropagation()}>
      <div className={style.logo}>
        <img src={logo} alt="" onClick={() => navigate("/")} />
      </div>

      <a onClick={() => navigate("/")}>Home</a>

      <div className={`${style.menu} `}>
        <a
          className={`${style.a} ${
            currentPath.startsWith("/sandalias/:caballero") ||
            currentPath.startsWith("/botas/:caballero") ||
            currentPath.startsWith("/zapatos/:caballero")||
            currentPath.startsWith("/tenis/:caballero")
              ? style.activeMenu
              : ""
          }`}
          onClick={() => handleMenuToggle("caballero")}
        >
          Caballero
        </a>
        {activeMenu === "caballero" && (
          <DropdownOptions options={optionsData.caballero} onClick={navigate} />
        )}
      </div>

      <div className={`${style.menu}`}>
        <a
          className={`${style.a} ${
            currentPath.startsWith("/sandalias/:damas") ||
            currentPath.startsWith("/botas/:damas") ||
            currentPath.startsWith("/zapatos/:damas")||
            currentPath.startsWith("/tenis/:damas") ||
            currentPath.startsWith("/tacones/:damas")
            ? style.activeMenu : ""
          }`}
          onClick={() => handleMenuToggle("damas")}
        >
          Dama
        </a>
        {activeMenu === "damas" && (
          <DropdownOptions options={optionsData.damas} onClick={navigate} />
        )}
      </div>

      <div className={`${style.menu} `}>
        <a
          className={`${style.a} ${
            currentPath.startsWith("/sandalias/:ninos") ||
            currentPath.startsWith("/botas/:ninos") ||
            currentPath.startsWith("/zapatos/:ninos")||
            currentPath.startsWith("/tenis/:ninos") ? style.activeMenu : ""
          }`}
          onClick={() => handleMenuToggle("ninos")}
        >
          Niños/as
        </a>
        {activeMenu === "ninos" && (
          <DropdownOptions options={optionsData.ninos} onClick={navigate} />
        )}
      </div>

      <div className={`${style.menu} `}>
        <a
          className={`${style.a} ${
            currentPath.startsWith("/marcas") ? style.activeMenu : ""
          }`}
          onClick={() => handleMenuToggle("marcas")}
        >
          Marcas
        </a>
        {activeMenu === "marcas" && (
          <DropdownOptions options={optionsData.marcas} onClick={navigate} />
        )}
      </div>

      <div className={style.buscador}>
        <Buscador />
      </div>
      <div className={style.notis}>
        <div className={style.contenedorCarro}>
          <div className={style.contador}>
            <Contador />
          </div>

          <BiCart
            size={40}
            color="black"
            onClick={handleAddToCart}
            style={{ cursor: "pointer" }}
          />
        </div>

        <CartModal
          isOpen={isCartModalOpen}
          onClose={() => setCartModalOpen(false)}
        />

        <div className={style.iconUser} onClick={handleUserMenuToggle}>
          <BiUserCircle size={40} color="black" />
          {showUserMenu && <UserMenu nombre="Cliente" />}
        </div>
      </div>
    </div>
  );
};

export default NavClient;