import React from "react";
import style from "./NavAdmin.module.css";
import logo from "../../assets/logo.png";
import Buscador from "../Buscador/Buscador";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { IoExitOutline } from "react-icons/io5";
import { useNavigate, useLocation } from "react-router-dom";


export default function NavAdmin() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const isLinkActive = (path) => currentPath.startsWith(path);

  const handleCloseSesion = () =>{
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('id');
    localStorage.removeItem('cachedUserData');
    navigate("/login");
  }

  return (
    <div className={style.containerNav}>
      <div className={style.logo}>
        <img src={logo} alt="" onClick={() => navigate("/admin")} />
      </div>
      <a
        className={style.a}
        onClick={() => navigate("/admin")}
        style={{ fontWeight: currentPath === "/admin" ? "bold" : "normal" }}
      >
        Home
      </a>
      <a className={style.a} onClick={() => navigate("/admin/vender")} style={{ fontWeight: isLinkActive("/admin/vender") ? "bold" : "normal" }}>
        Vender
      </a>
      <a className={style.a} onClick={() => navigate("/admin/apartados")} style={{ fontWeight: isLinkActive("/admin/apartados") ? "bold" : "normal" }}>
        Apartados
      </a>
      <a className={style.a} onClick={() => navigate("/admin/inventario")} style={{ fontWeight: isLinkActive("/admin/inventario") ? "bold" : "normal" }}>
        Inventario
      </a>

      <div className={style.buscador}>
        <Buscador />
      </div>
      <div className={style.iconUser}>
        <IoIosHelpCircleOutline size={40} color="black" />
        <IoExitOutline size={40} color="black" onClick={handleCloseSesion}/>
      </div>
    </div>
  );
}
