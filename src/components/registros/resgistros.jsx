import React, { useState } from "react";
import Style from "./registros.module.css";
import Contenido from "../CardsAdmin/cards";
import { FaRegEdit } from "react-icons/fa";
export default function Registros() {
  const [cards, setCards] = useState([
    { marca: "Nike", modelo: "Air Force", cantidad: 1, precio: "$150" },
    { marca: "Nike", modelo: "Air Force", cantidad: 1, precio: "$150" },
    { marca: "Nike", modelo: "Air Force", cantidad: 1, precio: "$150" },
    { marca: "Nike", modelo: "Air Force", cantidad: 1, precio: "$150" },
    { marca: "Nike", modelo: "Air Force", cantidad: 1, precio: "$150" },
  ]);

  return (
    <div className={Style.contenedor}>
      <div className={Style.nav}>
        <h3 className={Style.foto}>Foto</h3>
        <h3>Marca</h3>
        <h3>Modelo</h3>
        <h3>Cantidad</h3>
        <h3>Precio</h3>
      </div>
      <div className={Style.card}>
        {cards.map((card, index) => (
          <Contenido
            key={index}
            marca={card.marca}
            modelo={card.modelo}
            cantidad={card.cantidad}
            precio={card.precio}
          />
        ))}
      </div>
    </div>
  );
}