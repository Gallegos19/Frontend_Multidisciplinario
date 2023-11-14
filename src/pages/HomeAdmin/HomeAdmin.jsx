import React, { useState } from "react";
import Fechas from '../../components/fechas/fechas';
import Total from "../../components/precios/total";
import Registros from "../../components/registros/resgistros";
import Grafica from "../../components/Grafica/grafica";
import Style from "./homeAdmin.module.css";
import NavAdmin from "../../components/NavAdmin/NavAdmin";

export default function HomeAdmin() {
  // Estado inicial de cards
  const [cards, setCards] = useState([
    { marca: "Nike", modelo: "Jadidas", cantidad: 4, precio: "$150" },
    { marca: "Nike", modelo: "Jordan ", cantidad: 3, precio: "$150" },
    { marca: "Nike", modelo: "Kike", cantidad: 10, precio: "$150" },
    { marca: "Nike", modelo: "Pumba", cantidad: 1, precio: "$150" },
    // Agrega más datos según sea necesario
  ]);

  return (
    <div>
      <div className={Style.contenedor}>
        <NavAdmin />
        <div className={Style.contenido}>
          <div className={Style.datos}>
            <Fechas />
            <Total />
          </div>
          <div className={Style.registros}>
           
            <Registros cards={cards} />
            <div className={Style.contendorgrafica}>
            <h2>Productos más populares</h2>
              <Grafica cards={cards} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
