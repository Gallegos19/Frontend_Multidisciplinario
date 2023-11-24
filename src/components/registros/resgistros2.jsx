import React, { useState, useEffect } from "react";
import Style from "./registros.module.css";
import Contenido from "../CardsAdmin/cards";
import { FaRegEdit } from "react-icons/fa";

export default function Registros({ cards1 }) {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    // Flag para verificar si el componente está montado
    let isMounted = true;

    // Función para hacer la petición
    const buscarProductoPorId = async (productoId) => {
      try {
        // Obtener el token desde el localStorage
        const token = localStorage.getItem("token");

        // Verificar si hay un token antes de hacer la petición
        if (!token) {
          console.error("Token no encontrado");
          return;
        }

        // Construir la URL con el ID del producto
        const url = `http://localhost:8080/v1/Calzados/${productoId}`;

        // Hacer la petición utilizando fetch
        const response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            // Otros headers necesarios según la API
          },
        });

        // Verificar si la petición fue exitosa (código 200)
        if (response.ok) {
          // Convertir la respuesta a formato JSON
          const producto = await response.json();

          // Verificar si el componente está montado antes de actualizar el estado
          if (isMounted) {
            // Verificar si producto.data tiene elementos antes de acceder a ellos
            if (producto.data && producto.data.length > 0) {
              // Actualizar el estado con los datos recibidos
          
              localStorage.setItem('precio', producto.data[0].precio);

              setCards((prevCards) => [
                ...prevCards,
                {
                  marca: producto.data[0].marca,
                  modelo: producto.data[0].modelo,
                  cantidad: producto.data[0].inventario,
                  precio: `$${ producto.data[0].precio}`,
                  imagen: producto.data[0].url_calzado,
                },
              ]);
            } else {
              console.error("El array producto.data está vacío o indefinido:", producto);
            }
          }
        } else {
          // Manejar errores si la petición no fue exitosa
          console.error("Error al buscar el producto:", response.status);
        }
      } catch (error) {
        console.error("Error en la petición:", error);
      }
    };

    // Verificar si el componente está montado antes de hacer la petición
    if (isMounted && cards1 && cards1.productoId) {
      buscarProductoPorId(cards1.productoId);
    } else {
      console.error("cards1 no tiene la propiedad productoId:", cards1);
    }

    // Función de limpieza para actualizar el estado solo si el componente está montado
    return () => {
      isMounted = false;
    };
  }, [cards1]);

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
            cantidad={cards1.cantidad}
            precio={card.precio}
            imagen={card.imagen}
          />
        ))}
      </div>
    </div>
  );
}
