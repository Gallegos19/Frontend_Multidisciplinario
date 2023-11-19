import React from "react";
import Style from "./cards.module.css";
import Tenis from "../../assets/tenis.png";

export default function Contenido(props) {
  return (
    <div>
      <div className={Style.contenedor}>
        <div className={Style.contenido}>
          <img src={Tenis} alt="" />
          <h3 className={Style.marca}>{props.marca}</h3>
          <h3 className={Style.modelo}>{props.modelo}</h3>
          <h3 className={Style.cantidad}>{props.cantidad}</h3>
          <h3 className={Style.precio}>{props.precio}</h3>
        </div>
      </div>
    </div>
  );
}
