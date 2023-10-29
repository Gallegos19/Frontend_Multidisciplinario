import React from 'react'
import style from './NavAdmin.module.css'
import logo from '../../assets/logo.png'
import Buscador from '../Buscador/Buscador'
import { BiUserCircle } from 'react-icons/bi';
import { AiOutlineMenu } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

export default function NavAdmin() {
    const navigate = useNavigate();
  return (
    <div className={style.containerNav}>
        <div className={style.logo}>
            <img src={logo} alt="" onClick={() => navigate("/admin")} />
        </div>
        
            <a className={style.a} onClick={() => navigate("/admin")}>
                Home
            </a>
            <a className={style.a} onClick={() => navigate("/")}>
                Vender
            </a>
            <a className={style.a} onClick={() => navigate("/admin/apartados")}>
                Apartados
            </a>
            <a className={style.a} onClick={() => navigate("/")}>
                Inventario
            </a>
        
        <div className={style.buscador}>
            <Buscador />
        </div>
        <div className={style.iconUser}>
        <BiUserCircle size={50} color="black" />
        </div>
    </div>
  )
}
