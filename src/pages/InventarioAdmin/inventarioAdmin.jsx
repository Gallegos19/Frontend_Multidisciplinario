import React, { useState, useEffect, useRef } from "react";
import Style from "./inventarioAdmin.module.css";
import NavAdmin from "../../components/NavAdmin/NavAdmin";
import Card from "../../components/molecules/card/Card";
import tennis from "../../assets/nikeDunk.webp";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Cloudinary } from 'cloudinary-core';

const InventarioAdmin = () => {
  const cl = new Cloudinary({ cloud_name: 'drxfjtsnh' });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [productos, setProductos] = useState([]);
  const fileInputRef = useRef(null);
  const [categorias, setCategorias] = useState([]);
  const [tallas, setTallas] = useState([]);
  const [imageLoading, setImageLoading] = useState(false);
  const [nuevoProducto, setNuevoProducto] = useState({
    marca: "",
    modelo: "",
    cantidad: 1,
    precio: "",
    genero: "",
    color: "",
    descripcion: "",
    url_calzado: "https://ejemplo.com/calzado.jpg",
    tipo: "Deportivo",
    inventario: "",
    calificacion: "",
    id_categoria: 1,
    urls: [],
    tallas: ["26", "27", "28", "29"],
  });

  const SubirImagen = async () => {
    try {
      const file = fileInputRef.current.files[0];

      if (!file) {
        console.error("No se seleccionó ninguna imagen.");
        return;
      }

      setLoading(true);

      const data = new FormData();
      data.append("file", file);

      const uploadPreset = "danny20";
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/drxfjtsnh/image/upload?upload_preset=${uploadPreset}`,
        {
          method: "POST",
          body: data,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error al subir la imagen: ${JSON.stringify(errorData)}`);
      }

      const imageData = await response.json();
      console.log(imageData);
      setImage(imageData.secure_url);
    } catch (error) {
      console.error("Error al subir la imagen:", error);
      toast.error("Error al subir la imagen");
    } finally {
      setLoading(false);
      setImageLoading(false); // Set loading to false when the image is loaded
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
        // Update the state with the base64 representation of the image
        setNuevoProducto((prevProducto) => ({
            ...prevProducto,
            imagen: reader.result,
        }));
    };

    if (file) {
        reader.readAsDataURL(file);
    }
};


  useEffect(() => {
    getCalzados();
    getCategoria();
  }, []);

  const getCalzados = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch("http://localhost:8080/v1/Calzados?page=1&size=56", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 302) {
        const newLocation = response.headers.get('Location');
        // Realizar otra solicitud a la nueva ubicación, si es necesario
      }

      const responseData = await response.json();
      console.log('Datos obtenidos de la API:', responseData);

      if (Array.isArray(responseData.data)) {
        setProductos(responseData.data);
      } else {
        console.error('Los datos obtenidos no son un array:', responseData.data);
        toast.error('Error al obtener calzados');
      }
    } catch (error) {
      console.error('Error al obtener calzados:', error);
      toast.error('Error al obtener calzados');
    }
  };


  const getCategoria = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch("http://localhost:8080/v1/Category", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 302) {
        const newLocation = response.headers.get('Location');
        // Realizar otra solicitud a la nueva ubicación, si es necesario
      }

      const responseData = await response.json();
      console.log('Datos obtenidos de la API:', responseData);

      if (Array.isArray(responseData.data)) {
        setCategorias(responseData.data);
      } else {
        console.error('Los datos obtenidos no son un array:', responseData.data);
        toast.error('Error al obtener categorías');
      }
    } catch (error) {
      console.error('Error al obtener categorías:', error);
      toast.error('Error al obtener categorías');
    }
  };






  const abrirFormulario = () => {
    setNuevoProducto({
      marca: "",
      modelo: "",
      cantidad: 1,
      tallas: ["23", "24", "25", "27"],
      precio: "",
      idCliente: "",
      imagen: tennis,
      categoria: "",
    });
  };


  const cerrarFormulario = () => {
    setNuevoProducto(null);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "file") {
      handleFileChange(e);
    } else if (type === "checkbox" && name === "tallas") {
      // Manejar cambios en los checkboxes de tallas
      setTallas((prevTallas) => {
        const tallaNumber = parseInt(value, 10);
        if (checked) {
          // Agregar la talla al array si está marcada y hay menos de 4 tallas
          return prevTallas.length < 4 ? [...prevTallas, tallaNumber] : prevTallas;
        } else {
          // Eliminar la talla del array si está desmarcada
          return prevTallas.filter((talla) => talla !== tallaNumber);
        }
      });
    } else {
      setNuevoProducto((prevProducto) => ({
        ...prevProducto,
        [name]: value,
      }));
    }
  };



  const agregarProducto = async () => {
    if (
      isNaN(nuevoProducto.cantidad) ||
      nuevoProducto.cantidad <= 0 ||
      isNaN(nuevoProducto.precio) ||
      nuevoProducto.precio <= 0 ||
      tallas.length < 1
    ) {
      toast.error("Completa todas las casillas y asegúrate de que los números sean positivos, y al menos una talla seleccionada.");
    }
    else {
      try {
        const token = localStorage.getItem('token');

        // Envía los datos del nuevo producto al servidor
        const response = await fetch("http://localhost:8080/v1/Calzados", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`, // Asegúrate de tener el token adecuado
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            marca: nuevoProducto.marca,
            modelo: nuevoProducto.modelo,
            cantidad: nuevoProducto.cantidad,
            url_calzado: nuevoProducto.url_calzado,
            id_categoria: nuevoProducto.id_categoria,
            urls: nuevoProducto.urls,
            tallas: tallas,
          }),
        });

        if (response.ok) {
          // Obtener el nuevo estado actualizado del inventario
          const updatedProductos = await getCalzados();

          // Actualizar el local storage
          localStorage.setItem("productos", JSON.stringify(updatedProductos));

          // Limpiar el formulario después de agregar el producto
          setNuevoProducto(null);

          // Mostrar un mensaje de éxito
          toast.success("Producto agregado correctamente");
        } else {
          // Si la respuesta no es exitosa, manejar el error
          const errorData = await response.json();
          throw new Error(`Error al agregar el producto: ${JSON.stringify(errorData)}`);
        }
      } catch (error) {
        console.error('Error al agregar producto:', error);
        toast.error('Error al agregar producto');
      }
    }
  };



  const eliminarProducto = (marca, id) => {
    const nuevosProductos = productos.map((producto) =>
      producto.marca === marca
        ? {
          ...producto,
          productos: producto.productos.filter((prod) => prod.id !== id),
        }
        : producto
    );
    setProductos(nuevosProductos);
    toast.success("Producto eliminado correctamente.");
  };

  const editarProducto = (marca, id, productoEditado) => {
    const nuevosProductos = productos.map((producto) =>
      producto.marca === marca
        ? {
          ...producto,
          productos: producto.productos.map((prod) =>
            prod.id === id ? { ...prod, ...productoEditado } : prod
          ),
        }
        : producto
    );
    setProductos(nuevosProductos);
    toast.success("Producto editado correctamente.");
  };

  const filteredAndMappedData = productos
    ? productos.reduce((acc, producto) => {
      const existingMarcaIndex = acc.findIndex((item) => item.marca === producto.marca);

      if (existingMarcaIndex !== -1) {
        acc[existingMarcaIndex].productos.push(producto);
      } else {
        acc.push({ marca: producto.marca, productos: [producto] });
      }

      return acc;
    }, [])
    : [];

  return (
    <div className={Style.contenedor}>
      <NavAdmin />
      <div className={Style.contenedorCard}>
        <div className={Style.bt}>
          <button className={Style.agregar} onClick={abrirFormulario}>
            Agregar Producto
          </button>
        </div>

        <br />
        <div className={Style.formularioContainer}>
          {nuevoProducto && (
            <div className={Style.formulario}>
              <h3>Ingrese los detalles del nuevo producto:</h3>
              <form>
                <div className={Style.formGroup}>
                  <label>
                    Categoria:
                    <select name="categoria" value={nuevoProducto.categoria} onChange={handleChange}>
                      <option value="">Selecciona Categoria</option>
                      {categorias.map((categoriaItem) => (
                        <option key={categoriaItem.id} value={categoriaItem.id}>
                          {categoriaItem.categoria}
                        </option>
                      ))}
                    </select>
                  </label>


                </div>
                <div className={Style.formGroup}>
                  <label>
                    Marca:
                    <input
                      type="string"
                      name="Marca"
                      onChange={handleChange}
                    />
                  </label>
                </div>
                <div className={Style.formGroup}>
                  <label>
                    Modelo:
                    <select name="modelo" value={nuevoProducto.modelo} onChange={handleChange}>
                      <option value="">Seleccionar Modelo</option>
                      <option value="Modelo1">Modelo1</option>
                      <option value="Modelo2">Modelo2</option>
                      <option value="Modelo3">Modelo3</option>
                      <option value="Modelo4">Modelo4</option>
                    </select>
                  </label>
                </div>
                <div className={Style.formGroup}>
                  <label>
                    Inventario:
                    <input
                      type="number"
                      name="cantidad"
                      value={nuevoProducto.cantidad}
                      onChange={handleChange}
                    />
                  </label>
                </div>
                <div className={Style.formGroup}>
                  <label>
                    Tallas:
                    {[23, 24, 25, 26].map((tallaNumber) => (
                      <label key={tallaNumber}>
                        <input
                          type="checkbox"
                          name="tallas"
                          value={tallaNumber}
                          checked={tallas.includes(tallaNumber)}
                          onChange={handleChange}
                          disabled={tallas.length === 4 && !tallas.includes(tallaNumber)}
                        />
                        {tallaNumber}
                      </label>
                    ))}
                  </label>
                </div>


                <div className={Style.formGroup}>
                  <label>
                    Precio:
                    <input
                      type="number"
                      name="precio"
                      value={nuevoProducto.precio}
                      onChange={handleChange}
                    />
                  </label>

                </div>
                <div className={Style.formGroup}>
                  <label>
                    Tipo:
                    <input
                      type="text"
                      name="tipo"
                      value={nuevoProducto.tipo}
                      onChange={handleChange}
                    />
                  </label>
                </div>
                <div className={Style.formGroup}>
                  <label>
                    Genero:
                    <input
                      type="text"
                      name="genero"
                      value={nuevoProducto.genero}
                      onChange={handleChange}
                    />
                  </label>
                </div>
                <div className={Style.formGroup}>
                  <label>
                    Descripcion:
                    <input
                      type="number"
                      name="precio"
                      value={nuevoProducto.precio}
                      onChange={handleChange}
                    />
                  </label>
                </div>
                <div className={Style.formGroup}>
                  <label>
                    calificacion:
                    <input
                      type="number"
                      name="precio"
                      value={nuevoProducto.precio}
                      onChange={handleChange}
                    />
                  </label>
                </div>
                <div className={Style.formGroup}>
                  <label>
                    Color:
                    <input
                      type="number"
                      name="precio"
                      value={nuevoProducto.precio}
                      onChange={handleChange}
                    />
                  </label>
                </div>
                {imageLoading ? (
                  <div className={Style.loader}>Loading...</div>
                ) : (
                  <img src={nuevoProducto.imagen} alt="Preview" />
                )}

                <div className={Style.formGroup}>
                  <label>Imagen:</label>
                  <input
                    type="file"
                    name="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                  />
                </div>
                <div className={Style.opciones}>
                  <button type="button" onClick={agregarProducto}>
                    Agregar
                  </button>
                  <button type="button" onClick={cerrarFormulario}>
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
        <div className={Style.cardsContainer}>
          <div>
            {filteredAndMappedData.map(({ marca, productos }) => (
              <div key={marca} className={Style.contenido}>
                <h3>{marca}</h3>
                <div className={Style.cards}>
                  {productos.map((producto) => (
                    <Card
                      key={producto.id}
                      {...producto}
                      onEliminar={() => eliminarProducto(marca, producto.id)}
                      onEditar={(productoEditado) => editarProducto(marca, producto.id, productoEditado)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default InventarioAdmin;
