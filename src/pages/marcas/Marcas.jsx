import React from 'react';
import { useParams } from 'react-router-dom';
import NavClient from '../../components/NavClient/NavClient';
import Cards from '../../components/CardClient/CardsClient';
import Footer from '../../components/Footer/Footer';
import productosData from '../../components/ProductData/ProductData';

const Marca = () => {
  const { nombreMarca } = useParams(); 
  console.log({nombreMarca})
  const marca = nombreMarca.slice(1).charAt(0).toUpperCase() + nombreMarca.slice(2);

  if (marca === undefined) {
    // Manejo de caso en que marca es undefined
    return <p>Marca no definida</p>;
  }
  const productosHombre = productosData.marcas[marca.toLowerCase()] || [];
  const productosMujer = productosData.marcas[`${marca.toLowerCase()}Mujer`] || [];
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', margin: 'auto' }}>
      <NavClient />

      <div style={{ display: 'flex', flexDirection: 'column', width: '80%', margin: 'auto', marginTop: '2%' }}>
        <h3 style={{ fontFamily: 'Poppins', marginBottom: '2%' }}>Hombres</h3>
        <div style={{ display: 'flex', width: '100%', margin: 'auto', flexWrap: 'wrap' }}>
          {productosHombre.map(producto => (
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

        <h3 style={{ fontFamily: 'Poppins', marginBottom: '2%' }}>Mujeres</h3>
        <div style={{ display: 'flex', width: '100%', margin: 'auto', flexWrap: 'wrap' }}>
          {productosMujer.map(producto => (
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

export default Marca;
