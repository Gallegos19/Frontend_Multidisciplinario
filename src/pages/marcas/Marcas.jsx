import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Cards from "../../components/CardClient/CardsClient";
import NavClient from "../../components/NavClient/NavClient";
import Footer from "../../components/Footer/Footer";
import NotFoundComponent from "../../components/NotFound/NotFoundComponent";

const API_URL = "http://localhost:8080/v1/Calzados";

export default function Marcas() {
  const { marca } = useParams();
  const MARCAS = marca?.slice(1).toLowerCase();
  console.log("Marca" + MARCAS);

  const [data, setData] = useState([]);
  const [dataMujeres, setDataMujeres] = useState([]);


    const fetchCalzadosData = async () => {
      try {
        const accessToken = localStorage.getItem("token");

        const response = await fetch(`${API_URL}?page=1&size=1000`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const result = await response.json();
        console.log(result);

        if (result && Array.isArray(result.data)) {
          let filteredData = result.data;

          if (MARCAS) {
            // Filtering logic for Mujeres
            let filteredMujeres = filteredData.filter(
              (item) =>
                "f" === item.genero.toLowerCase() &&
                item.marca.toLowerCase() === MARCAS
            );
            setDataMujeres(filteredMujeres);
            console.log(filteredMujeres);
          }

          // Filtering logic for Hombres
          filteredData = filteredData.filter(
            (item) =>
              "h" === item.genero.toLowerCase() &&
              item.marca.toLowerCase() === MARCAS
          );

          setData(filteredData);
        } else {
          console.error("Invalid data format:", result);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    useEffect(() => {
    fetchCalzadosData();
  }, [MARCAS]);

  useEffect(() => {
    console.log("Data updated:", data);
    console.log("Data for Mujeres updated:", dataMujeres);
  }, [data, dataMujeres]);

  if (!Array.isArray(data) || data.length === 0) {
    fetchCalzadosData();
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          margin: "auto",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <NavClient />
        <NotFoundComponent />
        <p>No hay datos disponibles para mostrar.</p>
        <Footer />
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        margin: "auto",
      }}
    >
      <NavClient />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "80%",
          margin: "auto",
          marginTop: "5%",
        }}
      >
        <h3 style={{ fontFamily: "Poppins", marginBottom: "2%" }}>
          {" "}
          Caballero
        </h3>
        <div
          style={{
            display: "flex",
            width: "90%",
            margin: "auto",
            flexWrap: "wrap",
          }}
        >
          {data.map((producto) => {

            return (
              <Cards
                key={producto.productoID}
                id={producto.productoID}
                marca={producto.marca}
                imagen={producto.url_calzado}
                modelo={producto.modelo}
                precio={producto.precio}
                descripcion={producto.descripcion}
                color={producto.color}
                tallas={producto.tallas}
                stars={producto.calificacion}
              />
            );
          })}
        </div>
        {/* Render data for Mujeres if available */}
        {dataMujeres.length > 0 && (
          <>
            <h4 style={{ fontFamily: "Poppins", marginBottom: "2%" }}>Damas</h4>
            <div
              style={{
                display: "flex",
                width: "90%",
                margin: "auto",
                flexWrap: "wrap",
              }}
            >
              {dataMujeres.map((producto) => (
                <Cards
                  key={producto.productoID}
                  id={producto.productoID}
                  marca={producto.marca}
                  imagen={producto.url_calzado}
                  modelo={producto.modelo}
                  precio={producto.precio}
                  descripcion={producto.descripcion}
                  color={producto.color}
                  tallas={producto.tallas}
                  stars={producto.calificacion}
                />
              ))}
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}
