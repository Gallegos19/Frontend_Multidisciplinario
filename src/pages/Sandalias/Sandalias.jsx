import React from 'react';
import { useParams } from 'react-router-dom';
import SandaliasData from '../../components/ProductData/ProductData';
import Cards from '../../components/CardClient/CardsClient';
import NavClient from '../../components/NavClient/NavClient';
import Footer from '../../components/Footer/Footer';


export default function Sandalias() {
    const { genero } = useParams();
  const generos = genero.slice(1).charAt(0).toUpperCase() + genero.slice(2);
  const data = SandaliasData[generos.toLowerCase()].sandalias || [];
  const dataNinas = SandaliasData[generos.toLowerCase()].sandaliasninas || [];

  // Verificar si ambos arrays de datos son vacíos
  if ((data.length === 0 && dataNinas.length === 0) || (!Array.isArray(data) && !Array.isArray(dataNinas))) {
    // Manejo de caso en que ambos arrays son vacíos o no son arrays
    return (
      <div>
        <NavClient />
        {(genero === ':ninos' || genero === ':ninas') && (
          <p>No hay datos disponibles para mostrar.</p>
        )}
        <Footer />
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', margin: 'auto' }}>
      <NavClient />
      <div style={{ display: 'flex', flexDirection: 'column', width: '80%', margin: 'auto', marginTop: '5%' }}>
        <h3 style={{ fontFamily: 'Poppins', marginBottom: '2%' }}>
          {genero === ':caballero' ? 'Tenis para Hombres' : (genero === ':ninos' ? 'Sandalias para Niños' : (genero === ':ninas' ? 'Sandalias para Niñas' : 'Sandalias para damas'))}
        </h3>
        {data.length > 0 && (
          <>
            <h4 style={{ fontFamily: 'Poppins', marginBottom: '2%' }}></h4>
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
          </>
        )}

        {dataNinas.length > 0 && genero === ':ninos' && (
          <>
            <h4 style={{ fontFamily: 'Poppins', marginBottom: '2%' }}>Niñas</h4>
            <div style={{ display: 'flex', width: '100%', margin: 'auto', flexWrap: 'wrap' }}>
              {dataNinas.map(producto => (
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
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}
