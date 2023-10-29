import React from "react";
import NavAdmin from '../../components/NavAdmin/NavAdmin'
import Card from '../../components/molecules/card/Card'
import style from './Apartados.module.css'
import tennis from "../../assets/nikeDunk.webp";

const productos = [
    { id: 1, marca: "Nike", modelo: "Dunk Low SE", cantidad: 1, talla: 25, precio: 2500, idCliente: 2132, imagen: tennis },
    { id: 2, marca: "Nike", modelo: "Dunk Low SE", cantidad: 1, talla: 25, precio: 2500, idCliente: 2132, imagen: tennis },
    { id: 3, marca: "Nike", modelo: "Dunk Low SE", cantidad: 1, talla: 25, precio: 2500, idCliente: 2132, imagen: tennis },
    { id: 4, marca: "Nike", modelo: "Dunk Low SE", cantidad: 1, talla: 25, precio: 2500, idCliente: 2132, imagen: tennis },
    { id: 5, marca: "Nike", modelo: "Dunk Low SE", cantidad: 1, talla: 25, precio: 2500, idCliente: 2132, imagen: tennis },
    { id: 6, marca: "Nike", modelo: "Dunk Low SE", cantidad: 1, talla: 25, precio: 2500, idCliente: 2132, imagen: tennis },
    // Agrega más productos según sea necesario
];

export default function Apartados() {
  return (
    <div className={style.containerApartador}>
      <NavAdmin />
      <div className={style.cards}>
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
  );
}
