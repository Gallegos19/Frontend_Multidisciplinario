import React, { useState, useEffect } from "react";
import Fechas from '../../components/fechas/fechas';
import Total from "../../components/precios/total";
import Registros from "../../components/registros/resgistros";
import Grafica from "../../components/Grafica/grafica";
import Style from "./homeAdmin.module.css";
import NavAdmin from "../../components/NavAdmin/NavAdmin";

export default function HomeAdmin() {
  const [cards, setCards] = useState([]);
  const [totalVentas, setTotalVentas] = useState(0);
  const [loading, setLoading] = useState(true);
  const [productos, setProductos] = useState([]); 

  useEffect(() => {
    const obtenerVentas = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:8080/v1/Ventas?page=1&size=1000', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Error al obtener ventas: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();

        if (!Array.isArray(data.data)) {
          console.error('Los datos obtenidos no son un array:', data.data);
          return;
        }

        const ventasDelDia = data.data.filter((venta) => {
          const ventaFecha = new Date(venta.createdAt);
          const fechaActual = new Date();

          return (
            ventaFecha.getDate() === fechaActual.getDate() &&
            ventaFecha.getMonth() === fechaActual.getMonth() &&
            ventaFecha.getFullYear() === fechaActual.getFullYear()
          );
        });

        setCards(ventasDelDia);
       

        const total = ventasDelDia.reduce((acc, venta) => acc + venta.total, 0).toFixed(2); 
        setTotalVentas(total);
      } catch (error) {
        console.error('Error en la petición fetch:', error);
      } finally {
        setLoading(false);
      }
    };


    obtenerVentas();

    const getCalzados = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:8080/v1/Calzados?page=1&size=1000', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Error al obtener calzados: ${response.status} - ${response.statusText}`);
        }

        const responseData = await response.json();

        if (Array.isArray(responseData.data)) {
          setProductos(responseData.data);
        } else {
          console.error('Los datos obtenidos no son un array:', responseData.data);
        }
      } catch (error) {
        console.error('Error al obtener calzados:', error);
      }
    };

    getCalzados();
  }, []); 



  return (
    <div>
      <div className={Style.contenedor}>
        <NavAdmin />
        <div className={Style.contenido}>
          <div className={Style.datos}>
            <Fechas />
            <Total total={totalVentas} />
          </div>
          <div className={Style.registros}>
            <Registros cards={cards} />
            <div className={Style.contendorgrafica}>
              <h2>Productos más populares</h2>
              {loading ? (
                <p>Cargando gráfica...</p>
              ) : (
                <Grafica cards={cards} productos={productos} />
                
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
