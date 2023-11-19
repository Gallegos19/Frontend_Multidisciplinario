// Botas.jsx

import React from 'react';
import { useParams } from 'react-router-dom';
import botasData from '../../components/ProductData/ProductData';
import Cards from '../../components/CardClient/CardsClient';
import NavClient from '../../components/NavClient/NavClient';
import Footer from '../../components/Footer/Footer';

const Botas = () => {
  const { genero } = useParams();
  const generos = genero.slice(1).charAt(0).toUpperCase() + genero.slice(2);
  const data = botasData[generos.toLowerCase()].botas || [];

  // Verificar si data es un array
  if (!Array.isArray(data) || data.length === 0) {
    // Manejo de caso en que data no es un array o está vacío
    return (
      <div>
        <NavClient />
        <p>No hay datos disponibles para mostrar.</p>
        <Footer />
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', margin: 'auto' }}>
      <NavClient />
      <div style={{ display: 'flex', flexDirection: 'column', width: '80%', margin: 'auto', marginTop: '5%' }}>
        <h3 style={{ fontFamily: 'Poppins', marginBottom: '2%' }}>{genero === ':caballero' ? 'Botas para Hombres' : 'Botas para Mujeres'}</h3>
        <div style={{ display: 'flex', width: '100%', margin: 'auto', flexWrap: 'wrap' }}>
          {data.map(producto => (
            <Cards
              key={producto.id}
              id={producto.id}
              marca={producto.marca}
              imagen={producto.imagen}
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

export default Botas;
