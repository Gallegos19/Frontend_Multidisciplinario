<<<<<<< HEAD
import React, { useState } from "react";
=======
import React, { useState, useEffect } from "react";
>>>>>>> origin/PagesAdmin
import { BsTrash } from "react-icons/bs";
import Imagen from "../../Imagen/Imagen";
import Text from "../../Text/Text2";
import style from "./Card.module.css";
import { FaRegEdit } from "react-icons/fa";

<<<<<<< HEAD
export default function Card(props) {
=======
const Card = (props) => {
>>>>>>> origin/PagesAdmin
  const { id, marca, modelo, cantidad, talla, precio, idCliente, imagen, onEliminar, onEditar } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState({ marca, modelo, cantidad, talla, precio, idCliente, imagen });

<<<<<<< HEAD
=======
  useEffect(() => {
    setEditedProduct({ marca, modelo, cantidad, talla, precio, idCliente, imagen });
  }, [marca, modelo, cantidad, talla, precio, idCliente, imagen]);

>>>>>>> origin/PagesAdmin
  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
<<<<<<< HEAD
    onEditar(id, editedProduct);
=======
    onEditar(editedProduct);
>>>>>>> origin/PagesAdmin
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
<<<<<<< HEAD
    // Restaurar los valores originales si se cancela la edición
    setEditedProduct({ marca, modelo, cantidad, talla, precio, idCliente, imagen });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
=======
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
>>>>>>> origin/PagesAdmin
  };

  return (
    <div className={style.containerCard}>
      <div className="tenis">
<<<<<<< HEAD
        <Imagen width="10" imagen={imagen} />
=======
      <img style={{width:'200px',height:'200px', display:'flex', margin:'auto', justifyContent:'center', alignItems: 'center',borderRadius:'5px', padding:'20px'}} src={imagen} />
>>>>>>> origin/PagesAdmin
      </div>
      <div className={style.informacion}>
        {isEditing ? (
          <>
<<<<<<< HEAD
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
=======
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

>>>>>>> origin/PagesAdmin
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
<<<<<<< HEAD
              <button onClick={handleSaveClick}>Guardar</button>
              <button onClick={handleCancelClick}>Cancelar</button>
=======

>>>>>>> origin/PagesAdmin
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
<<<<<<< HEAD
}
=======
};

export default Card;
>>>>>>> origin/PagesAdmin
