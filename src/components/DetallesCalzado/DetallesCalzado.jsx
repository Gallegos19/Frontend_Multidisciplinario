import React, { useState, useEffect } from "react";
import style from "./DetallesCalzado.module.css";
import Title from "../../components/Title/Title";
import Imagen from "../Imagen/Imagen";
import img from "../../assets/adidashombre.jpg";
import Text from "../Text/Text";
import Boton from "../button/Button";

export default function DetallesCalzado(props) {
  const [mostrarContainer2, setMostrarContainer2] = useState(false);
  const [number, setNumber] = useState(0);
  const [tallaSeleccionada, setTallaSeleccionada] = useState(null);
  const tallas = [24,25,26,27,28,29];
  const [producto, setProducto] = useState(null);
  const [productData, setProductData] = useState({});

  useEffect(() => {
    // Obtener el producto del localStorage
    const productData = localStorage.getItem("CardItem");
    
    // Parsear el objeto JSON de la cadena recuperada
    const parsedProductData = JSON.parse(productData);
  
    // Actualizar el estado del producto con los datos parseados
    setProductData(parsedProductData);
  }, []);

  const toggleContainer2 = () => {
    setMostrarContainer2(!mostrarContainer2);
  };
  const incrementValue = () => {
    setNumber((prevNumber) => prevNumber + 1);
  };

  const decrementValue = () => {
    setNumber((prevNumber) => (prevNumber > 0 ? prevNumber - 1 : prevNumber));
  };
  const handleTalla = (talla) =>{
    setTallaSeleccionada(talla);
        console.log(tallaSeleccionada)
  }

  return (
    <div className={style.containerDetalles}>
      <div className={style.container1}>
        <div className={style.sectionFotos}>
       <Imagen imagen={productData.imagen} width="20" />      </div>
        <div className={style.sectionInfo}>
          <Title text={productData.modelo}/>
          <h3>${productData.precio}</h3>
          <div className={style.options}>
            <Imagen imagen={productData.imagen} width="5" />
            <Imagen imagen={productData.imagen} width="5" />
            <Imagen imagen={productData.imagen} width="5" />
          </div>
          <div className={style.contenedorTallas}>
          {tallas.map((talla, index) => (
          <input
            key={index}
            className={`${style.tallaInput} ${talla === tallaSeleccionada ? style.selected : ''}`}
            type="text"
            value={talla}
            onClick={() => handleTalla(talla)}
            readOnly
          />
        ))}
          </div>
          <div className={style.contenedorCantidad}>
            <p>Cantidad</p>

            <div className={style.cantidad}>
              <button className={style.boton} onClick={incrementValue}>
                +
              </button>
              <input
                style={{ width: "20%",display:'flex', textAlign:'center',marginRight:'1%', marginLeft:'1%' }}
                type="text"
                id="number"
                value={number}
                readOnly
              />
              <button className={style.boton} onClick={decrementValue}>
                -
              </button>
            </div>
          </div>
          <Boton nombre="Añadir al carrito" />
            <hr style={{
              border: "1px solid rgba(168, 167, 167, 0.73)",
              width: "80%",
              display: "flex",
              marginLeft:0,
              marginTop:'2%'
            }} />
        </div>
      </div>
      <div className={style.Descripcion}>
        <div className={style.TextDescripcion}>
          <p onClick={toggleContainer2}>Descripción</p>
        </div>
        <div className={style.line}>
          <hr
            className={style.linea}
          />
        </div>
      </div>
      <div
        className={style.container2}
        style={{ display: mostrarContainer2 ? "flex" : "none" }}
      >
        <div className={style.detalles}>
            <div className={style.textDetalles}>
          <p>Detalles</p>
          </div>
          <Text text="
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel sapien eu risus gravida efficitur. Fusce non turpis non libero viverra aliquam at in massa. Curabitur ac vestibulum purus, nec varius quam. Fusce id metus vel nunc feugiat aliquet. Proin eu lorem ac est interdum hendrerit. Sed vitae fermentum odio. Maecenas in ligula ut justo consequat dignissim." />
        </div>
        <div className={style.especificaciones}>
          <p>Especificaciones</p>
        </div>
      </div>
    </div>
  );
}
