import React from "react";
import { BsTrash } from "react-icons/bs";
import Imagen from "../Imagen/Imagen";
import tenis from "../../assets/tenisNike.png";
import Text from "../Text/Text2";
import Rating from "../Rating/Rating";
import style from "./CardsClient.module.css";
import Button from "../button/Button";
import { UseCartContext } from "../../context/CartContext";
export default function Card(props) {
    const {addProduct} = UseCartContext();

    const onAdd = (quantity) => {
        const data = {
            id: props.id,
            marca: props.marca,
            imagen: props.imagen,
            modelo: props.modelo,
            precio: props.precio,
            stars: props.stars,
            // Agrega más propiedades según sea necesario
        };
        addProduct(data, quantity);
    };
  return (
    <div className={style.containerCard}>
      <div className={style.tenis}>
        <Imagen width="12" imagen={tenis} />
      </div>
      <div className={style.informacion}>
      <Rating ratingValue={props.stars} id={props.id} />
        <Text text={props.modelo} />
        <Text text={`Precio: $${props.precio}`} />
        <div className={style.boton} onClick={onAdd}>
        <Button nombre='Agregar al carrito'/>
        </div>
      </div>
    </div>
  );
}
