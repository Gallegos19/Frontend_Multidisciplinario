import React from "react";
import { Link } from "react-router-dom";
import { BsTrash } from "react-icons/bs";
import Imagen from "../Imagen/Imagen";   
import tenis from "../../assets/tenisNike.png";
import Text from "../Text/Text2";
import Rating from "../Rating/Rating";
import style from "./CardsClient.module.css";
import Button from "../button/Button";
import { useNavigate } from "react-router-dom";


export default function Card(props) {
  const navigate = useNavigate();
  const data = {
    id: props.id,
    marca: props.marca, 
    imagen: props.imagen,
    modelo: props.modelo,    
    precio: props.precio,
    stars: props.stars,
  
    // Agrega más propiedades según sea necesario
  };
  
  // const onAdd = (data,quantity) => {
    
  //   addProduct(data, quantity);
  // };
  const handleAddToCart = () => {
    // Lógica para agregar el producto al carrito (usando addProduct si es necesario)
    // ...

    // Almacena el producto en el localStorage
    localStorage.setItem('CardItem', JSON.stringify(data));

    // Redirige a otra página
    navigate('/especifica');
  };

  return (
    <div
      onClick={handleAddToCart}
      className={style.containerCard}
    >
      <div className={style.tenis}>
        <Imagen width="12" imagen={props.imagen} />
      </div>
      <div className={style.informacion}>
        <Rating ratingValue={props.stars} id={props.id} />
        <Text text={props.modelo} />
        <Text text={`Precio: $${props.precio}`} />
        {/* Ejemplo de cómo agregar al carrito */}
        {/* <div className={style.boton} onClick={onAdd}>
          <Button nombre="Agregar al carrito" />
        </div> */}
      </div>
    </div>
  );
}
