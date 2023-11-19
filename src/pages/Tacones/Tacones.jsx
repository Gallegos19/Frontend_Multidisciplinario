import React from 'react';
import { useParams } from 'react-router-dom';
import TaconesData from '../../components/ProductData/ProductData';
import Cards from '../../components/CardClient/CardsClient';
import NavClient from '../../components/NavClient/NavClient';
import Footer from '../../components/Footer/Footer';


export default function Tacones() {
    const { genero } = useParams();
    const generos = genero.slice(1).charAt(0).toUpperCase() + genero.slice(2);
    const data = TaconesData[generos.toLowerCase()].tacones || [];
  
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
      <h3 style={{ fontFamily: 'Poppins', marginBottom: '2%' }}>{genero === ':caballero' ? 'Sandalias para Hombres' : (genero === ':ninos' ? 'Sandalias para Niños/as' : 'Tacones para Mujeres')}
</h3>
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
  )
}
