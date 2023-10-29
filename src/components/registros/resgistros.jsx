import React, { useState } from "react";
import Style from "./registros.module.css";
import Contenido from "../CardsAdmin/cards";

export default function Registros() {
  // Estado para almacenar las tarjetas
  const [cards, setCards] = useState([
    { marca: "Nike", modelo: "Air Force ", cantidad: 1, precio: "$150" },
    { marca: "Nike", modelo: "Air Force ", cantidad: 1, precio: "$150" },
    { marca: "Nike", modelo: "Air Force ", cantidad: 1, precio: "$150" },
    { marca: "Nike", modelo: "Air Force ", cantidad: 1, precio: "$150" },
    { marca: "Nike", modelo: "Air Force ", cantidad: 1, precio: "$150" },
   
    
  ]);

  return (
    <div>
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

       
        {/* para cuando halla para este esa wea para actualizar nuevos registros */}
      </div>
    </div>
  );
}
