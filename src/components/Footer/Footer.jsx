import React from "react";
import style from "./Footer.module.css";
import logo from "../../assets/logo2.png";
import SocialMedia from '../SocialMedia/SocialMedia'
export default function Footer() {
  return (
    <div className={style.containerFooter}>
      <div className={style.logo}>
        <img src={logo} alt="" />
      </div>
      <div className={style.contactos}>
        <h2>
            Contactos
        </h2>
        <div className={style.socialmedia}>
        <SocialMedia />
        </div>
        
      </div>
    </div>
  );
}
