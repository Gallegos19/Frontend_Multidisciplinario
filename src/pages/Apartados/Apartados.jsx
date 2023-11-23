import React, { useState, useEffect } from "react";
import NavAdmin from "../../components/NavAdmin/NavAdmin";
import Card from "../../components/molecules/card/Card";
import style from "./Apartados.module.css";
import tennis from "../../assets/nikeDunk.webp";
import { FaUser } from "react-icons/fa";
const Apartados = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          "http://localhost:8080/v1/Apartados?page=1&size=100",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Error al obtener los datos", response.message);
        }

        const data = await response.json();
        setProductos(data.data); // Guarda los productos en el estado
        console.log(data.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []); 

  return (
    <div className={style.containerApartador}>
      <NavAdmin />
      <div className={style.cards}>
        {productos.map((producto) => (
          <div key={producto.apartadoId}>
            <div className={style.card}>
            <FaUser size={40}/>
              <p>{`Apartado : ${producto.apartadoId}`}</p>
              <p>{`ID Cliente: ${producto.clienteId}`}</p>
              <p>{`Cantidad: ${producto.cantidad}`}</p>
              <p>{`Descuento: ${producto.descuento}`}</p>
              <p>{`Subtotal: ${producto.subTotal}`}</p>
              <p>{`Total: ${producto.total}`}</p>
              <button>Vender</button>
            </div>
          
          </div>
        ))}
      </div>
    </div>
  );
};

export default Apartados;
