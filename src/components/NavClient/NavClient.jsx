import React, { useState, useContext } from "react";
import style from "../NavAdmin/NavAdmin.module.css";
import logo from "../../assets/logo.png";
import Buscador from "../Buscador/Buscador";
import { BiUserCircle } from "react-icons/bi";
import DropdownOptions from "../../components/DropdownOptions/DropdownOptions";
import UserMenu from "../MenuUser/MenuUser";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
const optionsData = {
  caballero: [
    { label: "Tennis", route: "/caballero/option1" },
    { label: "Zapatos", route: "/caballero/option2" },
    { label: "Sandalias", route: "/caballero/option3" },
  ],
  dama: [
    { label: "Tennis", route: "/damas/option1" },
    { label: "Zapatos", route: "/damas/option2" },
    { label: "Sandalias", route: "/damas/option3" },
  ],
  ninos: [
    { label: "Tennis", route: "/ninos/option1" },
    { label: "Zapatos", route: "/ninos/option2" },
    { label: "Sandalias", route: "/ninos/option3" },
  ],
  otros: [
    { label: "Opción 1", route: "/otros/option1" },
    { label: "Opción 2", route: "/otros/option2" },
    { label: "Opción 3", route: "/otros/option3" },
  ],
};

const NavClient = () => {


  const navigate = useNavigate();

  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleUserMenuToggle = () => {
    setShowUserMenu(!showUserMenu);
  };
  const [activeMenu, setActiveMenu] = useState(null);

  const handleMenuToggle = (menu) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  return (
    <div className={style.containerNav}>
      <div className={style.logo}>
        <img src={logo} alt="" onClick={() => navigate("/")} />
      </div>

      <a onClick={() => navigate("/")}>Home</a>

      <div className={`${style.menu} `}>
        <a className={style.a} onClick={() => handleMenuToggle("caballero")}>
          Caballero
        </a>
        {activeMenu === "caballero" && (
          <DropdownOptions options={optionsData.caballero} onClick={navigate} />
        )}
      </div>

      <div className={`${style.menu}`}>
        <a className={style.a} onClick={() => handleMenuToggle("dama")}>
          Dama
        </a>
        {activeMenu === "dama" && (
          <DropdownOptions options={optionsData.dama} onClick={navigate} />
        )}
      </div>

      <div className={`${style.menu} `}>
        <a className={style.a} onClick={() => handleMenuToggle("ninos")}>
          Niños
        </a>
        {activeMenu === "ninos" && (
          <DropdownOptions options={optionsData.ninos} onClick={navigate} />
        )}
      </div>

      <div className={`${style.menu} `}>
        <a className={style.a} onClick={() => handleMenuToggle("otros")}>
          Otros
        </a>
        {activeMenu === "otros" && (
          <DropdownOptions options={optionsData.otros} onClick={navigate} />
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
