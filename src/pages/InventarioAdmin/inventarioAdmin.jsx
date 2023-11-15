import React from "react";
import Style from "./inventarioAdmin.module.css";
import NavAdmin from "../../components/NavAdmin/NavAdmin";
import Card from "../../components/molecules/card/Card";
import tennis from "../../assets/nikeDunk.webp";
import { SiNike,SiPuma } from "react-icons/si";

export default function InventarioAdmin() {
  const productos = [
    {
      id: 1,
      marca: "Nike",
      modelo: "Dunk Low SE",
      cantidad: 1,
      talla: 25,
      precio: 2500,
      idCliente: 2132,
      imagen: tennis,
    },
    {
      id: 2,
      marca: "Nike",
      modelo: "Dunk Low SE",
      cantidad: 1,
      talla: 25,
      precio: 2500,
      idCliente: 2132,
      imagen: tennis,
    },
    {
      id: 3,
      marca: "Nike",
      modelo: "Dunk Low SE",
      cantidad: 1,
      talla: 25,
      precio: 2500,
      idCliente: 2132,
      imagen: tennis,
    },
    {
      id: 4,
      marca: "Nike",
      modelo: "Dunk Low SE",
      cantidad: 1,
      talla: 25,
      precio: 2500,
      idCliente: 2132,
      imagen: tennis,
    },
    {
      id: 5,
      marca: "Nike",
      modelo: "Dunk Low SE",
      cantidad: 1,
      talla: 25,
      precio: 2500,
      idCliente: 2132,
      imagen: tennis,
    },
    {
      id: 6,
      marca: "Nike",
      modelo: "Dunk Low SE",
      cantidad: 1,
      talla: 25,
      precio: 2500,
      idCliente: 2132,
      imagen: tennis,
    },
    // Agrega más productos según sea necesario
  ];

  return (
    <div>
      <div className={Style.contenedor}>
        <NavAdmin />
        <div className={Style.contenedorCard}>
          <div className={Style.contenido}>
            <div style={{display:'flex', flexDirection:'row',gap:'2%', alignItems:'center'}}>
              <h3>Nike</h3> <SiNike size={42} />
            </div>

            <div className={Style.cards}>
              {productos.map((producto) => (
                <Card
                  key={producto.id}
                  marca={producto.marca}
                  modelo={producto.modelo}
                  cantidad={producto.cantidad}
                  talla={producto.talla}
                  precio={producto.precio}
                  idCliente={producto.idCliente}
                  imagen={producto.imagen}
                />
              ))}
            </div>
          </div>

          <div className={Style.contenido}>
          <div style={{display:'flex', flexDirection:'row',gap:'2%', alignItems:'center'}}>
              <h3>Puma</h3> <SiPuma size={42} />
            </div>
            <div className={Style.cards}>
              {productos.map((producto) => (
                <Card
                  key={producto.id}
                  marca={producto.marca}
                  modelo={producto.modelo}
                  cantidad={producto.cantidad}
                  talla={producto.talla}
                  precio={producto.precio}
                  idCliente={producto.idCliente}
                  imagen={producto.imagen}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
