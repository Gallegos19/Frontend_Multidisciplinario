import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Cards from '../../components/CardClient/CardsClient';
import NavClient from '../../components/NavClient/NavClient';
import Footer from '../../components/Footer/Footer';
import NotFoundComponent from '../../components/NotFound/NotFoundComponent';
export default function Zapatos() {
  const { genero } = useParams();
  const generos = genero.slice(1).toLowerCase();

  const [data, setData] = useState([]);
  const [dataNinas, setDataNinas] = useState([]); // Added state for dataNinas
  const [generoValue, setGeneroValue] = useState('');

  useEffect(() => {
    // Set generoValue directly based on generos
    if (generos === 'caballero') {
      setGeneroValue('h');
    } else if (generos === 'damas') {
      setGeneroValue('f');
    } else if (generos === 'ninos') {
      setGeneroValue('k');
    } else {
      // Handle the case when generos is none of the expected values
      setGeneroValue('');
    }
  }, [generos]);


    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem('token');

        const response = await fetch('http://localhost:8080/v1/Calzados?page=1&size=1000', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
        });

        const result = await response.json();
        if (result && Array.isArray(result.data)) {
          let filteredData = result.data;

          if (generos === 'ninos') {
            // Make a second request specifically for 'ninas'
            const responseNinas = await fetch('http://localhost:8080/v1/Calzados?page=1&size=1000', {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
              },
            });
            const resultNinas = await responseNinas.json();
          
            if (resultNinas && Array.isArray(resultNinas.data)) {
              // Set the 'dataNinas' state with the filtered data for 'ninas'
              let filteredNinas = resultNinas.data;
              filteredNinas = filteredNinas.filter(item => 'n' === item.genero.toLowerCase() && item.categoria.toLowerCase() === 'zapatos');
              setDataNinas(filteredNinas);
            } else {
              console.error('Invalid data format for ninas:', resultNinas);
            }
          }
          

          // Filter the combined data based on generoValue and categoria
          filteredData = filteredData.filter(item => generoValue === item.genero.toLowerCase() && item.categoria.toLowerCase() === 'zapatos');
          console.log(filteredData)
          setData(filteredData);
        } else {
          console.error('Invalid data format:', result);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    useEffect(() => {
    fetchData();
  }, [generoValue, generos]);

  useEffect(() => {
    console.log('Data updated:', data);
    console.log('Data for ninas updated:', dataNinas);
  
  }, [data, dataNinas]);

  if (!Array.isArray(data) || data.length === 0) {
    fetchData();
    return (
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%', margin: 'auto', justifyContent:'center', alignItems:'center' }}>
        <NavClient />
        <NotFoundComponent />
        <p>No hay datos disponibles para mostrar.</p>
        <Footer />
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', margin: 'auto' }}>
      <NavClient />
      <div style={{ display: 'flex', flexDirection: 'column', width: '80%', margin: 'auto', marginTop: '5%' }}>
        <h3 style={{ fontFamily: 'Poppins', marginBottom: '2%' }}> {genero === ':caballero' ? 'zapatos para Hombres' : (genero === ':ninos' ? 'zapatos para Niños' : (genero === ':ninas' ? 'zapatos para Niñas' : 'zapatos para damas'))}</h3>
        <div style={{ display: 'flex', width: '90%', margin: 'auto', flexWrap: 'wrap' }}>
          {data.map(producto => (
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
        {/* Render data for ninas if available */}
        {dataNinas.length > 0 && generos === 'ninos' && (
          <>
            <h4 style={{ fontFamily: 'Poppins', marginBottom: '2%' }}>Niñas</h4>
            <div style={{ display: 'flex', width: '100%', margin: 'auto', flexWrap: 'wrap' }}>
              {dataNinas.map(producto => (
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
