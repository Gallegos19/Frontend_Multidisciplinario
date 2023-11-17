import React, { useState } from "react";
import { BsTrash } from "react-icons/bs";
import Imagen from "../../Imagen/Imagen";
import Text from "../../Text/Text2";
import style from "./Card.module.css";
import { FaRegEdit } from "react-icons/fa";

export default function Card(props) {
  const { id, marca, modelo, cantidad, talla, precio, idCliente, imagen, onEliminar, onEditar } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState({ marca, modelo, cantidad, talla, precio, idCliente, imagen });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    onEditar(id, editedProduct);
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    // Restaurar los valores originales si se cancela la edición
    setEditedProduct({ marca, modelo, cantidad, talla, precio, idCliente, imagen });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  return (
    <div className={style.containerCard}>
      <div className="tenis">
        <Imagen width="10" imagen={imagen} />
      </div>
      <div className={style.informacion}>
        {isEditing ? (
          <>
            <label>
              Marca:
              <input type="text" name="marca" value={editedProduct.marca} onChange={handleChange} />
            </label>
            <label>
              Modelo:
              <input type="text" name="modelo" value={editedProduct.modelo} onChange={handleChange} />
            </label>
            <div className={style.info2}>
              <label>
                Cantidad:
                <input type="number" name="cantidad" value={editedProduct.cantidad} onChange={handleChange} />
              </label>
              <label>
                Talla:
                <input type="number" name="talla" value={editedProduct.talla} onChange={handleChange} />
              </label>
            </div>
            <label>
              Precio:
              <input type="number" name="precio" value={editedProduct.precio} onChange={handleChange} />
            </label>
            <label>
              IdCliente:
              <input type="text" name="idCliente" value={editedProduct.idCliente} onChange={handleChange} />
            </label>
          </>
        ) : (
          <>
            <Text text={`Marca: ${marca}`} />
            <Text text={`Modelo: ${modelo}`} />
            <div className={style.info2}>
              <Text text={`Cantidad: ${cantidad}`} />
              <Text text={`Talla: ${talla}`} />
            </div>
            <Text text={`Precio: $${precio}`} />
            <Text text={`IdCliente: ${idCliente}`} />
          </>
        )}

        <div className={style.buton}>
          {isEditing ? (
            <>
              <button onClick={handleSaveClick}>Guardar</button>
              <button onClick={handleCancelClick}>Cancelar</button>
            </>
          ) : (
            <>
              <BsTrash size={"25px"} onClick={() => onEliminar(id)} />
              <FaRegEdit size={'25px'} onClick={handleEditClick} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
