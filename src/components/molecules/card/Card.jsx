import React, { useState, useEffect } from "react";
import { BsTrash } from "react-icons/bs";
import Imagen from "../../Imagen/Imagen";
import Text from "../../Text/Text2";
import style from "./Card.module.css";

import { FaRegEdit } from "react-icons/fa";

const Card = ({ productoID, marca, modelo, inventario, talla, precio, urls, onEliminar, onEditar }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState({
    productoID,
    marca,
    modelo,
    inventario,
    talla,
    precio,
    imagen: urls && urls.length > 0 ? urls[0] : '', // Tomar la primera URL del array
  });

  useEffect(() => {
    setEditedProduct({
      productoID,
      marca,
      modelo,
      inventario,
      talla,
      precio,
      imagen: urls && urls.length > 0 ? urls[0] : '', // Tomar la primera URL del array
    });
  }, [productoID, marca, modelo, inventario, talla, precio, urls]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    onEditar(productoID, editedProduct);
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === "file") {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedProduct((prevProduct) => ({
          ...prevProduct,
          imagen: reader.result,
        }));
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setEditedProduct((prevProduct) => ({
        ...prevProduct,
        [name]: value,
      }));
    }
  };

  const generateKey = (prefix) => `${prefix}-${productoID}`;

  return (
    <div key={generateKey("card")} className={style.containerCard}>
      <div className="tenis">
        <img
          style={{
            width: `10rem`,
            height: "10em",
            display: "flex",
            margin: "auto",
            marginTop: "1vh",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "5px",
          }}
          src={isEditing ? editedProduct.imagen : urls && urls.length > 0 ? urls[0] : ''}
          alt=""
        />
      </div>
      <div className={style.informacion}>
        {isEditing ? (
          <>
            <div className={style.container}>
              <label className={style.label}>
                Marca:
                <input type="text" name="marca" value={editedProduct.marca} onChange={handleChange} className={style.input} />
              </label>
              <label className={style.label}>
                Modelo:
                <input type="text" name="modelo" value={editedProduct.modelo} onChange={handleChange} className={style.input} />
              </label>
              <label className={style.label}>
                Inventario:
                <input type="number" name="inventario" value={editedProduct.inventario} onChange={handleChange} className={style.input} />
              </label>
              <div className={style.buttonContainer}>
                <button onClick={handleSaveClick} className={style.saveButton}>
                  Guardar
                </button>
                <button onClick={handleCancelClick} className={style.cancelButton}>
                  Cancelar
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <Text text={`Marca: ${marca}`} />
            <Text text={`Modelo: ${modelo}`} />
            <Text text={`Inventario: ${inventario}`} />
            <Text text={`Talla: ${talla}`} />
            <Text text={`Precio: $${precio}`} />
          </>
        )}

        <div className={style.buton}>
          {isEditing ? (
            <>
            </>
          ) : (
            <>
              <BsTrash size={"25px"} onClick={() => onEliminar(productoID)} />
              <FaRegEdit size={'25px'} onClick={handleEditClick} />

            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
