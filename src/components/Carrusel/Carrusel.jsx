import React, { useState, useEffect } from 'react';
import style from './Carrusel.module.css';
import tennisIzquierda from '../../assets/trainers.png';
import tennisDerecha from '../../assets/trainers.png';
import { useNavigate } from "react-router-dom";
import { UseCartContext } from "../../context/CartContext";

export default function Carrusel({ imagenes }) {
  const navigate = useNavigate();
  const { addProduct } = UseCartContext();

  const handleAddToCart = (data) => {

    localStorage.setItem('CardItem', JSON.stringify(data));

   
    navigate('/especifica');
  };

  const [currentIndex, setCurrentIndex] = useState(0);
  const [marca, setMarca] = useState(imagenes[0].marca);
  const [modelo, setModelo] = useState(imagenes[0].modelo);

 const [isTransitioning, setIsTransitioning] = useState(false);

useEffect(() => {
  const intervalId = setInterval(() => {
    setIsTransitioning(true);
    handleNextClick();
  }, 3000);

  return () => {
    clearInterval(intervalId);
  };
}, [currentIndex]);

const handlePrevClick = () => {
  setIsTransitioning(true);
  const newIndex = currentIndex === 0 ? imagenes.length - 1 : currentIndex - 1;
  setCurrentIndex(newIndex);
  setMarca(imagenes[newIndex].marca);
  setModelo(imagenes[newIndex].modelo);
};

const handleNextClick = () => {
  setIsTransitioning(true);
  const newIndex = currentIndex === imagenes.length - 1 ? 0 : currentIndex + 1;
  setCurrentIndex(newIndex);
  setMarca(imagenes[newIndex].marca);
  setModelo(imagenes[newIndex].modelo);
};

const handleTransitionEnd = () => {
  setIsTransitioning(false);
};


  const handleImageClick = () => {
    const data = {
      id: imagenActual.id,
      marca: marca,
      imagen: imagenActual.imagen,
      modelo: modelo,
      precio: imagenActual.precio,
      stars: imagenActual.star,
   
    };
    
  
    handleAddToCart(data);
  };

  const imagenActual = imagenes[currentIndex];

  useEffect(() => {
   
    const intervalId = setInterval(() => {
      handleNextClick();
    }, 3000);

 
    return () => clearInterval(intervalId);
  }, [currentIndex]);

  return (
    <div className={`${style.containerCarrusel} ${isTransitioning ? style.sliding : ''}`}>
      <img
        src={tennisIzquierda}
        className={style.tennisIzquierda}
        alt=""
        onClick={handlePrevClick}
      />
  
      <p className={style.marca}>{marca}</p>
  
      <div
      className={`${style.imageContainer} ${isTransitioning ? `${style.sliding} ${style.transitioning}` : ''}`}
      onTransitionEnd={handleTransitionEnd}
    >
      <img src={imagenActual.imagen} alt="" onClick={handleImageClick} />
    </div>
  
      <p className={style.modelo}>{modelo}</p>
      <img
        src={tennisDerecha}
        className={style.tennisDerecha}
        alt=""
        onClick={handleNextClick}
      />
    </div>
  );
}
