import React from "react";
import { BsTrash } from "react-icons/bs";
import Imagen from "../../Imagen/Imagen";
import Text from "../../Text/Text2";
import style from "./Card.module.css";
import { CiEdit } from "react-icons/ci";

export default function Card(props) {
  const { marca, modelo, cantidad, talla, precio, idCliente, imagen } = props;

  return (
    <div className={style.containerCard}>
      <div className="tenis">
        <Imagen width="10" imagen={imagen} />
      </div>
      <div className={style.informacion}>
        <Text text={`Marca: ${marca}`} />
        <Text text={`Modelo: ${modelo}`} />
        <div className={style.info2}>
          <Text text={`Cantidad: ${cantidad}`} />
          <Text text={`Talla: ${talla}`} />
        </div>
        <Text text={`Precio: $${precio}`} />
        <Text text={`IdCliente: ${idCliente}`} />
        <div className={style.buton}>
          <CiEdit size={"25px"} className={style.editIcon} />
          <BsTrash size={"25px"} className={style.trashIcon}/>
         
        </div>
      </div>
    </div>
  );
}
