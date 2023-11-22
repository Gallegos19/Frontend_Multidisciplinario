import React, { useState, useEffect } from 'react';
import NavClient from '../../components/NavClient/NavClient';
import Carrusel from '../../components/Carrusel/Carrusel';
import Cards from '../../components/CardClient/CardsClient';
import Footer from '../../components/Footer/Footer';

export default function HomeClient() {
  const [productos, setProductos] = useState([]);
  
  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:8080/v1/Calzados/nuevos/10', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
  
        if (!response.ok) {
          throw new Error(`Error al obtener productos: ${response.status} - ${response.statusText}`);
        }
  
        const data = await response.json();
        setProductos(data.data);

        
      } catch (error) {
        console.error(error.message); // Imprime el mensaje de error
      }
    };

    obtenerProductos();
  }, []);
  

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', margin: 'auto' }}>
      <NavClient />
      <Carrusel imagenes={productos} />
      <div style={{ display: 'flex', flexDirection: 'column', width: '80%', margin: 'auto', marginTop: '2%' }}>
        <h3 style={{ fontFamily: 'Poppins', marginBottom: '2%' }}>Nuevos Lanzamientos</h3>
        <div style={{ display: 'flex', width: '90%', margin: 'auto', flexWrap: 'wrap' }}>
          {productos.map((producto) => (
            <Cards
              key={producto.id}
              id={producto.id}
              imagen={producto.url_calzado}
              marca={producto.marca}
              modelo={producto.modelo}
              precio={producto.precio}
              stars={producto.star}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
