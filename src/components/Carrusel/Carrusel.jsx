import React, { useState, useEffect } from 'react';
import style from './Carrusel.module.css';
import tennisIzquierda from '../../assets/trainers.png';
import tennisDerecha from '../../assets/trainers.png';
import { useNavigate } from 'react-router-dom';
import { useCartContext } from '../../context/CartContext';

export default function Carrusel({ imagenes }) {
  const navigate = useNavigate();
  const { addProduct } = useCartContext();

  const handleAddToCart = (data) => {
    localStorage.setItem('CardItem', JSON.stringify(data));
    navigate('/especifica');
  };

  const [currentIndex, setCurrentIndex] = useState(0);
  const [marca, setMarca] = useState(imagenes[0]?.marca || '');
  const [modelo, setModelo] = useState(imagenes[0]?.modelo || '');
  
  const handlePrevClick = () => {
    const newIndex = currentIndex === 0 ? imagenes.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    setMarca(imagenes[newIndex]?.marca || '');
    setModelo(imagenes[newIndex]?.modelo || '');
  };

  const handleNextClick = () => {
    const newIndex = currentIndex === imagenes.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    setMarca(imagenes[newIndex]?.marca || '');
    setModelo(imagenes[newIndex]?.modelo || '');
  };

  const handleImageClick = () => {
    const data = {
      id: imagenActual.id,
      marca: marca,
      imagen: imagenActual.url_calzado,
      tallas: imagenActual.tallas,
      modelo: modelo,
      precio: imagenActual.precio,
      stars: imagenActual.star,
   
    };
    
  
    handleAddToCart(data);
  };

  const imagenActual = imagenes[currentIndex];

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (imagenes.length > 0) {
        handleNextClick();
      }
    }, 3000);

    return () => clearInterval(intervalId);
  }, [currentIndex, imagenes]);

  return (
    <div className={style.containerCarrusel}>
      <img
        src={tennisIzquierda}
        className={style.tennisIzquierda}
        alt=""
        onClick={handlePrevClick}
      />
      <div className={style.contenidotenis}>
      <p className={style.marca}>{marca}</p>

      <div className={style.imageContainer}>
        {imagenActual && (
          <img src={imagenActual.url_calzado} alt="" onClick={handleImageClick} />
        )}
      </div>

      <p className={style.modelo}>{modelo}</p>
      </div>
      <img
        src={tennisDerecha}
        className={style.tennisDerecha}
        alt=""
        onClick={handleNextClick}
      />
    </div>
  );
}
