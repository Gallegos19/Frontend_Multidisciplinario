// InventarioAdmin.js
import React, { useState, useEffect } from "react";
import Style from "./inventarioAdmin.module.css";
import NavAdmin from "../../components/NavAdmin/NavAdmin";
import Card from "../../components/molecules/card/Card";
import tennis from "../../assets/nikeDunk.webp";

export default function InventarioAdmin() {
  const [productos, setProductos] = useState(JSON.parse(localStorage.getItem("productos")) || []);
  const [nuevoProducto, setNuevoProducto] = useState(null);
  const [modelos, setModelos] = useState(["Nike", "Puma", "Adidas", "Pirma"]);

  useEffect(() => {
    localStorage.setItem("productos", JSON.stringify(productos));
  }, [productos]);

  const abrirFormulario = () => {
    setNuevoProducto({
      id: productos.length + 1,
      marca: "",
      modelo: "",
      cantidad: 1,
      talla: "",
      precio: "",
      idCliente: 2132,
      imagen: tennis,
    });
  };

  const cerrarFormulario = () => {
    setNuevoProducto(null);
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === "file") {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNuevoProducto({ ...nuevoProducto, imagen: reader.result });
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setNuevoProducto({ ...nuevoProducto, [name]: value });
    }
  };

  const agregarProducto = () => {
    if (!productos.some((producto) => producto.marca === nuevoProducto.marca)) {
      setProductos([...productos, { marca: nuevoProducto.marca, productos: [nuevoProducto] }]);
    } else {
      const nuevosProductos = productos.map((producto) =>
        producto.marca === nuevoProducto.marca
          ? { ...producto, productos: [...producto.productos, nuevoProducto] }
          : producto
      );
      setProductos(nuevosProductos);
    }

    cerrarFormulario();
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
  };

  return (
    <div>
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
                  <label>
                    Marca:
                    <select name="marca" value={nuevoProducto.marca} onChange={handleChange}>
                      <option value="">Seleccionar Marca</option>
                      {modelos.map((modelo) => (
                        <option key={modelo} value={modelo}>
                          {modelo}
                        </option>
                      ))}
                    </select>
                  </label>
                  <br /> <br />
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
                  <label>
                    <br /> <br />
                    Cantidad:
                    <input
                      type="number"
                      name="cantidad"
                      value={nuevoProducto.cantidad}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Talla:
                    <input type="number" name="talla" value={nuevoProducto.talla} onChange={handleChange} />
                  </label>
                  <label>
                    Precio:
                    <input type="number" name="precio" value={nuevoProducto.precio} onChange={handleChange} />
                  </label>
                  <label>
                    Imagen:
                    <input type="file" name="imagen" onChange={handleChange} />
                  </label>
                  <button type="button" onClick={agregarProducto}>
                    Agregar
                  </button>
                  <button type="button" onClick={cerrarFormulario}>
                    Cancelar
                  </button>
                </form>
              </div>
            )}
          </div>

          {productos.map(({ marca, productos }) => (
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
  );
}
