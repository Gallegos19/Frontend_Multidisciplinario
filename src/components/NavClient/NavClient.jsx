import React, { useState, useContext, useEffect } from "react";
import style from "../NavAdmin/NavAdmin.module.css";
import logo from "../../assets/logo.png";
import Buscador from "../Buscador/Buscador";
import { BiUserCircle } from "react-icons/bi";
import DropdownOptions from "../../components/DropdownOptions/DropdownOptions";
import UserMenu from "../MenuUser/MenuUser";
import { useNavigate,useLocation } from "react-router-dom";
import { AiOutlineMenu } from 'react-icons/ai';
const optionsData = {
  caballero: [
    { label: "Tennis", route: "/caballero/tennis" },
    { label: "Zapatos", route: "/caballero/zapatos" },
    { label: "Sandalias", route: "/caballero/sandalias" },
    { label: "Botas", route: "/caballero/botas" },
  ],
  dama: [
    { label: "Tennis", route: "/damas/tennis" },
    { label: "Zapatos", route: "/damas/zapatos" },
    { label: "Sandalias", route: "/damas/sandalias" },
    { label: "Tacones", route: "/damas/tacones" },
  ],
  ninos: [
    { label: "Tennis", route: "/ninos/tennis" },
    { label: "Zapatos", route: "/ninos/zapatos" },
    { label: "Sandalias", route: "/ninos/sandalias" },
  ],
  marcas: [
    { label: "Nike", route: "/marcas/nike" },
    { label: "Puma", route: "/marcas/puma" },
    { label: "Adidas", route: "/marcas/adidas" },
    { label: "Otros", route: "/marcas/otros" },
  ],
};

const NavClient = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const [activeSection, setActiveSection] = useState(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);

  const handleMenuToggle = (menu) => {
    setActiveSection(menu);
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  const closeMenus = () => {
    setShowUserMenu(false);
    setActiveMenu(null);
  };

  useEffect(() => {
    // Agregar un event listener al montar el componente para cerrar los menús al hacer clic fuera de ellos
    document.addEventListener("click", closeMenus);

    // Limpiar el event listener al desmontar el componente
    return () => {
      document.removeEventListener("click", closeMenus);
    };
  }, []); 

  const handleUserMenuToggle = () => {
    setShowUserMenu(!showUserMenu);
  };

  return (
    <div className={style.containerNav} onClick={(e) => e.stopPropagation()}>
      <div className={style.logo}>
        <img src={logo} alt="" onClick={() => navigate("/")} />
      </div>

      <a onClick={() => navigate("/")}>Home</a>

      <div className={`${style.menu} `}>
        <a className={`${style.a} ${currentPath.startsWith("/caballero") ? style.activeMenu : ""}`} onClick={() => handleMenuToggle("caballero")}>
          Caballero
        </a>
        {activeMenu === "caballero" && (
          <DropdownOptions options={optionsData.caballero} onClick={navigate} />
        )}
      </div>

      <div className={`${style.menu}`}>
        <a className={`${style.a} ${currentPath.startsWith("/damas") ? style.activeMenu : ""}`} onClick={() => handleMenuToggle("dama")}>
          Dama
        </a>
        {activeMenu === "dama" && (
          <DropdownOptions options={optionsData.dama} onClick={navigate} />
        )}
      </div>

      <div className={`${style.menu} `}>
        <a className={`${style.a} ${currentPath.startsWith("/ninos") ? style.activeMenu : ""}`} onClick={() => handleMenuToggle("ninos")}>
          Niñ@s
        </a>
        {activeMenu === "ninos" && (
          <DropdownOptions options={optionsData.ninos} onClick={navigate} />
        )}
      </div>

      <div className={`${style.menu} `}>
        <a className={`${style.a} ${currentPath.startsWith("/marcas") ? style.activeMenu : ""}`} onClick={() => handleMenuToggle("marcas")}>
          Marcas
        </a>
        {activeMenu === "marcas" && (
          <DropdownOptions options={optionsData.marcas} onClick={navigate} />
        )}
      </div>

      <div className={style.buscador}>
        <Buscador />
      </div>
      <div className={style.iconUser} onClick={handleUserMenuToggle}>
        <BiUserCircle size={50} color="black" />
        {showUserMenu && <UserMenu nombre="Cliente" />}
      </div>
    </div>
  );
};

export default NavClient;
