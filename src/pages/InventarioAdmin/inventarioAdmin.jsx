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
  const [productos, setProductos] = useState([]);
  const fileInputRef = useRef(null);
  const [categorias, setCategorias] = useState([]);
  const [formularioAbierto, setFormularioAbierto] = useState(false);
  const [tallas, setTallas] = useState([]);
  const [imageLoading, setImageLoading] = useState(false);
  const [nuevoProducto, setNuevoProducto] = useState({
    marca: "",
    modelo: "",
    precio: 0,
    genero: "",
    color: "",
    descripcion: "",
    url_calzado: "",
    tipo: "",
    inventario: 0,
    calificacion: 0,
    id_categoria: "",
    urls: '',
    tallas: [],
  });

  const handleSaveClick = (marca, id, editedProduct, idCliente) => {
    onEditar(marca, id, editedProduct, idCliente);
    setIsEditing(false);
  };



  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      SubirImagen(file);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const SubirImagen = async (file) => {
    try {
      setImageLoading(true);

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
      setImage(imageData.secure_url);

      setNuevoProducto((prevProducto) => ({
        ...prevProducto,
        url_calzado: imageData.secure_url,
      }));
    } catch (error) {
      console.error("Error al subir la imagen:", error);
      toast.error("Error al subir la imagen");
    } finally {
      setImageLoading(false);
    }
  };


  useEffect(() => {
    getCalzados();
    getCategoria();
  }, []);

  const getCalzados = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch("http://localhost:8080/v1/Calzados?page=1&size=129", {
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
        const uniqueCategories = Array.from(new Set(responseData.data.map(item => item.categoria)));
        const categorias = uniqueCategories.slice(0, 5); // Tomar solo las primeras cinco categorías
        const productosPorCategoria = categorias.map((categoria) => {
          return {
            id_categoria: responseData.data.find(item => item.categoria === categoria).id,
            nombre_categoria: categoria,
            productos: responseData.data.filter((producto) => producto.categoria === categoria),
          };
        });
        setProductos(productosPorCategoria);
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
      tallas: ["23", "24", "25", "27"],
      precio: 0,
      tipo: "",
      genero: "",
      descripcion: "",
      calificacion: 0,
      color: "",
      url_calzado: image,
      categoria: categorias.length > 0 ? categorias[0].id : "", // Establecer el primer valor de categorías como predeterminado
      id_categoria: categorias.length > 0 ? categorias[0].id : "", // Establecer el primer valor de categorías como predeterminado
      inventario: 0, // Establecer el valor predeterminado para el inventario
    });
    setFormularioAbierto(true); // Abrir el formulario al hacer clic en el botón "Agregar Producto"
  };


  const cerrarFormulario = () => {
    setFormularioAbierto(false); // Cerrar el formulario al hacer clic en el botón "Cancelar"
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "file") {
      handleFileChange(e);
    } else if (type === "checkbox" && name === "tallas") {
      const tallaNumber = parseInt(value, 10);

      // Modificar el estado 'tallas'
      setTallas((prevTallas) => {
        return checked
          ? prevTallas.length < 4
            ? [...prevTallas, tallaNumber]
            : prevTallas
          : prevTallas.filter((talla) => talla !== tallaNumber);
      });
    } else if (name === "id_categoria") {
      setNuevoProducto((prevProducto) => ({
        ...prevProducto,
        id_categoria: value,
      }));
    } else {
      setNuevoProducto((prevProducto) => ({
        ...prevProducto,
        [name]: type === "number" ? parseFloat(value) : value,
      }));
    }
  };



  const agregarProducto = async () => {
    console.log(nuevoProducto);

    if (
      isNaN(nuevoProducto.inventario) ||
      nuevoProducto.inventario <= 0 ||
      isNaN(nuevoProducto.precio) ||
      nuevoProducto.precio <= 0 ||
      isNaN(nuevoProducto.calificacion) ||
      nuevoProducto.calificacion < 0 ||
      nuevoProducto.tallas.length < 1 || // Usar nuevoProducto.tallas en lugar de tallas
      !image
    ) {
      toast.error("Completa todas las casillas y asegúrate de que los números sean positivos, y al menos una talla seleccionada.");
    } else {
      try {
        const token = localStorage.getItem('token');
        console.log('Token:', token);

        const data = new FormData();
        data.append("file", fileInputRef.current.files[0]);

        // Upload the image to Cloudinary
        const uploadPreset = "danny20";
        const imageResponse = await fetch(
          `https://api.cloudinary.com/v1_1/drxfjtsnh/image/upload?upload_preset=${uploadPreset}`,
          {
            method: "POST",
            body: data,
          }
        );

        if (!imageResponse.ok) {
          const errorData = await imageResponse.json();
          throw new Error(`Error al subir la imagen: ${JSON.stringify(errorData)}`);
        }

        const imageData = await imageResponse.json();
        console.log(imageData);

        const response = await fetch("http://localhost:8080/v1/Calzados", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            "precio": nuevoProducto.precio,
            "modelo": nuevoProducto.modelo,
            "marca": nuevoProducto.marca,
            "genero": nuevoProducto.genero,
            "color": nuevoProducto.color,
            "descripcion": nuevoProducto.descripcion,
            "url_calzado": imageData.secure_url,
            "tipo": nuevoProducto.tipo,
            "inventario": nuevoProducto.inventario,
            "calificacion": nuevoProducto.calificacion,
            "id_categoria": nuevoProducto.id_categoria,
            "urls": [imageData.secure_url],
            "tallas": tallas,
          }),
        });

        // Agrega este console.log para ver los datos que estás enviando en la solicitud
        console.log('Datos enviados en la solicitud:', {
          "precio": nuevoProducto.precio,
          "modelo": nuevoProducto.modelo,
          "marca": nuevoProducto.marca,
          "genero": nuevoProducto.genero,
          "color": nuevoProducto.color,
          "descripcion": nuevoProducto.descripcion,
          "url_calzado": imageData.secure_url,
          "tipo": nuevoProducto.tipo,
          "inventario": nuevoProducto.inventario,
          "calificacion": nuevoProducto.calificacion,
          "id_categoria": nuevoProducto.id_categoria,
          "urls": [imageData.secure_url],
          "tallas": tallas,
        });

        if (response.status === 401) {
          // Manejar error de autenticación aquí, por ejemplo, redirigir al usuario a iniciar sesión.
          // Ejemplo: window.location.href = "/login";
          throw new Error("Autenticación requerida");
        }

        if (response.ok) {
          // Actualizar productos después de agregar uno nuevo
          await getCalzados();

          setNuevoProducto({
            marca: "",
            modelo: "",
            cantidad: 1,
            tallas: ["23", "24", "25", "27"],
            precio: 0,
            tipo: "",
            genero: "",
            descripcion: "",
            calificacion: 0,
            color: "",
            url_calzado: tennis,
            categoria: "",
          });
          setTallas([]); // Reiniciar las tallas seleccionadas
          setImage(null);

          setFormularioAbierto(false); // Cerrar el formulario después de agregar el producto

          toast.success("Producto agregado correctamente");
        } else {
          const errorData = await response.json();
          throw new Error(`Error al agregar el producto: ${JSON.stringify(errorData)}`);
        }
      } catch (error) {
        console.error('Error al agregar producto:', error);
        toast.error(`Error al agregar producto: ${JSON.stringify(error)}`);
      }
    }
  };

  const eliminarProducto = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:8080/v1/Calzados/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });


      if (response.ok) {
        // Update products after deletion
        await getCalzados();
        toast.success('Producto eliminado.');
      } else {
        const errorData = await response.json();
        throw new Error(`Error deleting product: ${JSON.stringify(errorData)}`);
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error(`Error deleting product: ${error.message}`);
    }
  };


  const editarProducto = async (id, productoEditado) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:8080/v1/Calzados/${id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productoEditado),
      });

      if (response.ok) {
        // Update products after editing
        await getCalzados();
      } else {
        const errorData = await response.json();
        throw new Error(`Error al editar el producto: ${JSON.stringify(errorData)}`);
      }

      // Move the toast.success outside the if block
      toast.success('Producto editado correctamente.');
    } catch (error) {
      console.error('Error al editar producto:', error);
      // Optionally, you can show an error notification here if needed
    }
  };



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
          {formularioAbierto && (
            <div className={Style.formulario}>
              <h3>Ingrese los detalles del nuevo producto:</h3>
              <form>
                <div className={Style.formGroup}>
                  <label>
                    Categoria:
                    <select name="id_categoria" value={nuevoProducto.id_categoria} onChange={handleChange}>
                      <option value="">Selecciona Categoría</option>
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
                      name="marca"
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
                      name="inventario"
                      value={nuevoProducto.inventario}
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
                      type="text"
                      name="descripcion"
                      value={nuevoProducto.descripcion}
                      onChange={handleChange}
                    />
                  </label>
                </div>
                <div className={Style.formGroup}>
                  <label>
                    calificacion:
                    <input
                      type="number"
                      name="calificacion"
                      value={nuevoProducto.calificacion}
                      onChange={handleChange}
                    />
                  </label>
                </div>
                <div className={Style.formGroup}>
                  <label>
                    Color:
                    <input
                      type="text"
                      name="color"
                      value={nuevoProducto.color}
                      onChange={handleChange}
                    />
                  </label>
                </div>
                {imageLoading ? (
                  <div className={Style.loader}>Loading...</div>
                ) : (
                  <img src={nuevoProducto.url_calzado} alt="Preview" />
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
            {productos.map(({ id_categoria, nombre_categoria, productos }) => (
              <div key={id_categoria} className={Style.contenido}>
                <h3>{nombre_categoria}</h3>
                <div className={Style.cards}>
                  {productos.map((producto) => (
                    <Card
                      key={producto.productoID}
                      {...producto}
                      idCliente={producto.idCliente}
                      onEliminar={eliminarProducto}
                      onEditar={editarProducto}
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
