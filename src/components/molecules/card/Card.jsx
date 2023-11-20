import React, { useState, useEffect } from "react";
import { BsTrash } from "react-icons/bs";
import Imagen from "../../Imagen/Imagen";
import Text from "../../Text/Text2";
import style from "./Card.module.css";
import { FaRegEdit } from "react-icons/fa";

const Card = (props) => {
  const { id, marca, modelo, cantidad, talla, precio, idCliente, imagen, onEliminar, onEditar } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState({ marca, modelo, cantidad, talla, precio, idCliente, imagen });

  useEffect(() => {
    setEditedProduct({ marca, modelo, cantidad, talla, precio, idCliente, imagen });
  }, [marca, modelo, cantidad, talla, precio, idCliente, imagen]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    onEditar(editedProduct);
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
        setEditedProduct({ ...editedProduct, imagen: reader.result });
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setEditedProduct({ ...editedProduct, [name]: value });
    }
  };

  return (
    <div className={style.containerCard}>
      <div className="tenis">
      <img style={{ width: `10rem`,height:'10em', display:'flex', margin:'auto',marginTop:'1vh', justifyContent:'center', alignItems: 'center',borderRadius:'5px' }} src={props.imagen} alt="" />
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
              <div className={style.info2}>
                <label className={style.label}>
                  Cantidad:
                  <input type="number" name="cantidad" value={editedProduct.cantidad} onChange={handleChange} className={style.input} />
                </label>
                <label className={style.label}>
                  Talla:
                  <input type="number" name="talla" value={editedProduct.talla} onChange={handleChange} className={style.input} />
                </label>
              </div>
              <label className={style.label}>
                Precio:
                <input type="number" name="precio" value={editedProduct.precio} onChange={handleChange} className={style.input} />
              </label>
              <label className={style.label}>
                IdCliente:
                <input type="text" name="idCliente" value={editedProduct.idCliente} onChange={handleChange} className={style.input} />
              </label>
              <div className={style.buttonContainer}>
                <button onClick={handleSaveClick} className={style.saveButton}>Guardar</button>
                <button onClick={handleCancelClick} className={style.cancelButton}>Cancelar</button>
              </div>
            </div>

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
};

export default Card;
