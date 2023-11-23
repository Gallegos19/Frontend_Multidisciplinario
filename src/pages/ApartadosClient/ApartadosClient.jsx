import React, { useEffect, useState } from 'react';
import style from './Apartados.module.css';
import Card from '../../components/CardClient/CardsClient';
import NavClient from '../../components/NavClient/NavClient';
import Footer from '../../components/Footer/Footer';
import Loader from '../../components/Loader/Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Apartados from '../Apartados/Apartados';

export default function ApartadosClient() {
  const [apartados, setApartados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [renderedCards, setRenderedCards] = useState(null);

  useEffect(() => {
    const fetchApartados = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:8080/v1/Apartados?page=1&size=100', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setApartados(data.data);
        console.log(data.data)
      } catch (error) {
        console.error('Error fetching apartados:', error);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(() => {
      fetchApartados();
    }, 2000);

    // Limpieza del temporizador si el componente se desmonta antes de que termine el tiempo de espera
    return () => clearTimeout(timeoutId);
  }, []);

  const clienteId = localStorage.getItem('id');

  const renderCardDetails = async (productoId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:8080/v1/Calzados/${productoId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const productDetails = await response.json();

      // Verificar si hay datos y si hay un objeto en la posición 0 antes de acceder a las propiedades
      if (productDetails.data && productDetails.data.length > 0) {
        console.log('productdetails', productDetails.data[0]);
        return productDetails.data[0];
      } else {
        console.error('Error fetching product details: No data found');
        return null;
      }
    } catch (error) {
      console.error('Error fetching product details:', error);
      return null;
    }
  };

  const deleteApartado = async (apartadoId) => {
    try {
      const token = localStorage.getItem('token');
      await fetch(`http://localhost:8080/v1/Apartados/${apartadoId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.error(`Apartado ${apartadoId} eliminado.`, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
      console.log(`Apartado ${apartadoId} eliminado.`);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error('Error deleting apartado:', error);
    }
  };

  const renderCards = async () => {
    const clienteApartados = apartados.filter((apartado) => apartado.clienteId === parseInt(clienteId));

    const cards = await Promise.all(
      clienteApartados.map(async (apartado) => {
        const productDetails = await renderCardDetails(apartado.productoId);

        // Verificar si productDetails es null antes de intentar acceder a las propiedades
        if (productDetails) {
          // Calcular la fecha de vigencia y la fecha de notificación
          const fechaVigencia = new Date(apartado.createdAt);
          fechaVigencia.setDate(fechaVigencia.getDate() + 3); // Sumar 3 días

          const fechaNotificacion = new Date(fechaVigencia);
          fechaNotificacion.setDate(fechaNotificacion.getDate() - 1); // Restar 1 día para notificar un día antes

          // Calcular el tiempo restante hasta la notificación en días
          const tiempoRestante = Math.ceil((fechaNotificacion - Date.now()) / (1000 * 60 * 60 * 24)); // Convertir de milisegundos a días

          // Texto y estilo para mostrar en la interfaz
          let vigenciaText = `Vigencia: ${tiempoRestante} días`;
          let vigenciaStyle = { color: 'black', display: 'flex', alignItems: 'Center', justifyContent: 'center', width: '100%', margin: 'auto' }; // Color por defecto

          // Si la vigencia es 0 días, cambiar el texto a rojo y mostrar "Vence hoy"
          if (tiempoRestante === 0) {
            vigenciaText = 'Vence hoy';
            vigenciaStyle = { color: 'red', display: 'flex', alignItems: 'Center', justifyContent: 'center', width: '100%', margin: 'auto' };
          }
          if (tiempoRestante < 0) {
            vigenciaText = 'Apartado Vencido';
            vigenciaStyle = { color: 'red', display: 'flex', alignItems: 'Center', justifyContent: 'center', width: '100%', margin: 'auto' };
          }
          // Programar la notificación
          setTimeout(() => {
            // Notificar al cliente
            console.log(`Notificar al cliente: El apartado ${apartado.apartadoId} está a punto de vencer.`);
          }, tiempoRestante * 24 * 60 * 60 * 1000); // Convertir días a milisegundos

          // Programar la eliminación del apartado
          setTimeout(() => {
            deleteApartado(apartado.apartadoId);
          }, fechaVigencia - Date.now());

          return (
            <div key={apartado.apartadoId} style={{ pointerEvents: 'none', display: 'flex', flexDirection: 'column', margin: 'auto' }}>
              <p style={{ fontSize: '0.9rem', ...vigenciaStyle }}>{vigenciaText}</p>
              <p style={{ fontSize: '0.9rem', ...vigenciaStyle }}>Numero de apartado: <p style={{backgroundColor:'skyblue', borderRadius:'10px'}}>{apartado.apartadoId}</p></p>

              <Card
                key={apartado.apartadoId}
                id={apartado.apartadoId}
                modelo={productDetails.modelo}
                cantidad={apartado.cantidad}
                precio={productDetails.precio}
                subTotal={apartado.subTotal}
                descuento={apartado.descuento}
                total={apartado.total}
                imagen={productDetails ? productDetails.url_calzado : ''}
              />
            </div>
          );
        } else {
          // Manejar el caso donde no se pueden obtener los detalles del producto
          console.error('Error rendering card: Product details not available');
          return null;
        }
      })
    );

    setRenderedCards(cards.filter(card => card !== null));
  };

  useEffect(() => {
    if (!loading) {
      renderCards();
    }
  }, [loading]);

  return (
    <div className={style.containerApartadoClient}>
      <NavClient />
      <p>Calzados apartados</p>

      <div className={style.contenido}>
        {loading ? (
          <>
            <div style={{ display: 'flex', flexDirection: 'column', width: '90%', height: '48vh', justifyContent: 'center', alignItems: 'center' }}>
              <Loader />
              <p>Loading...</p>
            </div>
          </>
        ) : renderedCards && renderedCards.length > 0 ? (
          renderedCards
        ) : (
          <>
            <div style={{ display: 'flex', flexDirection: 'column', height: '48vh', justifyContent: 'center', alignItems: 'center' }}>
              <p>No se encontraron apartados para este cliente.</p>
            </div>
          </>
        )}
      </div>
      <Footer />
      <ToastContainer />
    </div>
  );
}
