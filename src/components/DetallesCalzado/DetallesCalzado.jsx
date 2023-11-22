import React, { useState, useEffect } from "react";
import style from "./DetallesCalzado.module.css";
import Title from "../../components/Title/Title";
import Imagen from "../Imagen/Imagen";
import Text from "../Text/Text";
import Boton from "../button/Button";
import { useCartContext } from "../../context/CartContext"; // Asegúrate de utilizar 'useCartContext' con 'u' minúscula
// Al principio de tu archivo
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../Footer/Footer";

export default function DetallesCalzado({
  id,
  marca,
  imagen,
  modelo,
  precio,
  descripcion,
  color,
  tallas,
  stars,
}) {
  const { addProduct } = useCartContext(); // Accede a las funciones del contexto
  const [mostrarContainer2, setMostrarContainer2] = useState(false);
  const [number, setNumber] = useState(0);
  const [tallaSeleccionada, setTallaSeleccionada] = useState(null);
  // const tallas = props.tallas ? props.tallas.map(Number) : [];
  const [productData, setProductData] = useState({});
  const { clearCart, isInCart, removeProduct } = useCartContext(); // Accede a las funciones del contexto

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
    setNumber((prevNumber) => (prevNumber < 3 ? prevNumber + 1 : prevNumber));
  };
  
  const decrementValue = () => {
    setNumber((prevNumber) => (prevNumber > 0 ? prevNumber - 1 : prevNumber));
  };
  
  const handleTalla = (talla) => {
    setTallaSeleccionada(talla);
  };

  const addToCart = () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Debe iniciar sesión para agregar productos al carrito", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });
        // You can redirect the user to the login page or take appropriate action
        // Example: navigate('/login');
        return;
      }
      if (tallaSeleccionada === null) {
        toast.error("Seleccione una talla por favor", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });
      } else if (number < 1) {
        toast.error("Seleccione la cantidad por favor", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });
      } else if (tallaSeleccionada && number > 0) {
        const item = {
          id: productData.id,
          nombre: productData.modelo,
          precio: productData.precio,
          urlImagen: productData.imagen,
          talla: tallaSeleccionada,
          cantidad: number,
        };

        addProduct(item, number);

        // Muestra la notificación de éxito
        toast.success("¡Producto añadido al carrito!", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });
      }
    } catch (error) {
      // Muestra la notificación de fallo
      toast.error(
        "Error al añadir el producto al carrito. Por favor, inténtalo de nuevo.",
        {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        }
      );
    }
  };

  return (
    <div className={style.containerDetalles}>
      <div className={style.container1}>
        <div className={style.sectionFotos}>
          <Imagen imagen={productData.imagen} width="20" />
        </div>
        <div className={style.sectionInfo}>
          <Title text={productData.modelo} />
          <h3>Precio: ${productData.precio}</h3>
          <div className={style.options}>
            <Imagen imagen={productData.imagen} width="5" />
            <Imagen imagen={productData.imagen} width="5" />
            <Imagen imagen={productData.imagen} width="5" />
          </div>
          <div style={{ display: "flex", justifyContent: "left" }}>
            <b
              style={{
                fontWeight: "bold",
                color: "black",
                fontFamily: "Poppins",
              }}
            >
              {productData.marca}
            </b>
          </div>
          <div className={style.contenedorTallas}>
            {productData.tallas &&
              productData.tallas.map((talla, index) => (
                <input
                  key={index}
                  className={`${style.tallaInput} ${
                    talla === tallaSeleccionada ? style.selected : ""
                  }`}
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
                style={{
                  width: "20%",
                  display: "flex",
                  textAlign: "center",
                  marginRight: "1%",
                  marginLeft: "1%",
                }}
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
          <div onClick={addToCart}>
            <Boton nombre="Añadir al carrito" />
            <hr
              style={{
                border: "1px solid rgba(168, 167, 167, 0.73)",
                width: "80%",
                display: "flex",
                marginLeft: 0,
                marginTop: "2%",
              }}
            />
          </div>
        </div>
      </div>
      <div className={style.Descripcion}>
        <div className={style.TextDescripcion}>
          <p onClick={toggleContainer2}>Descripción</p>
        </div>
        <div className={style.line}>
          <hr className={style.linea} />
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
          <div
            readOnly
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "left",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Text text={productData.descripcion} />
          </div>
        </div>
        <div className={style.especificaciones}>
          <p>Especificaciones</p>
          <div
            readOnly
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Text text={`Color:  ${productData.color}`} />
          </div>
        </div>
      </div>
      <ToastContainer />
      
    </div>
  );
}
