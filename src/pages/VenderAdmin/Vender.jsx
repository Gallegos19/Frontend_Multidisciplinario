import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Total from "../../components/precios/total";
import Registros from "../../components/registros/resgistros2";
import NavAdmin from "../../components/NavAdmin/NavAdmin";
import Buscador from "../../components/Buscador/Buscador";
import InputVender from "../../components/inputVender/inputVender";
import ButtonVenta from "../../components/buttonVenta/buttonVenta";
import CardVender from "../../components/cardVender/cardVender";
import Style from "./Vender.module.css";
import NotFoundComponent from "../../components/NotFound/NotFoundComponent";

export default function Vender() {
  const navigate = useNavigate();
  const location = useLocation();
  const apartadoData = location.state?.apartadoData || {};
  console.log(apartadoData);
  const precio1 = localStorage.getItem("precio");

  // Calcular el total
  const total2 = (apartadoData.cantidad * parseFloat(precio1)).toFixed(2);

  // Función para obtener la fecha actual en formato ISO
  const getFormattedCurrentDate = () => {
    const currentDate = new Date();
    return currentDate.toISOString();
  };

  // Función para realizar la venta
  const realizarVenta = async () => {
    try {
      // Obtener el token desde el localStorage
      const token = localStorage.getItem("token");

      // Verificar si hay un token antes de hacer la petición
      if (!token) {
        console.error("Token no encontrado");
        return;
      }

      // Construir el objeto de venta
      const ventaData = {
        productoId: 1,
        cantidad: 2.5,
        precioUnitario: 20.0,
        subTotal: 50.0,
        descuento: 5,
        total: 47.5,
        clienteId: 1,
        vigencia: getFormattedCurrentDate(),
      };

      // Construir la URL para la petición de venta
      const ventaUrl = "http://localhost:8080/v1/Ventas";

      // Hacer la petición de venta utilizando fetch
      const ventaResponse = await fetch(ventaUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ventaData),
      });

      // Verificar si la petición de venta fue exitosa (código 200)
      if (ventaResponse.ok) {
        console.log("Venta realizada con éxito");
        toast.success("Venta realizada con éxito");
        // Después de realizar la venta con éxito, llamar a la función para eliminar el apartado
        await eliminarApartado(apartadoData.apartadoId);
      } else {
        // Manejar errores si la petición de venta no fue exitosa
        console.error("Error al realizar la venta:", ventaResponse.status);
        toast.error("Error al realizar la venta");
      }
    } catch (error) {
      console.error("Error al realizar la venta:", error);
      toast.error("Error al realizar la venta");
    }
  };

  // Función para eliminar un apartado
  const eliminarApartado = async (apartadoId) => {
    try {
      // Obtener el token desde el localStorage
      const token = localStorage.getItem("token");

      // Verificar si hay un token antes de hacer la petición
      if (!token) {
        console.error("Token no encontrado");
        return;
      }

      // Construir la URL con el ID del apartado
      const apartadoUrl = `http://localhost:8080/v1/Apartados/${apartadoId}`;

      // Hacer la petición para eliminar el apartado utilizando fetch
      const apartadoResponse = await fetch(apartadoUrl, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      // Verificar si la petición para eliminar el apartado fue exitosa (código 200)
      if (apartadoResponse.ok) {
        console.log(`Apartado ${apartadoId} eliminado con éxito`);
        toast.success(`Apartado ${apartadoId} eliminado con éxito`);
        navigate("/admin");
        // Puedes hacer algo adicional aquí si la eliminación fue exitosa
      } else {
        // Manejar errores si la petición para eliminar el apartado no fue exitosa
        console.error("Error al eliminar el apartado:", apartadoResponse.status);
        toast.error("Error al eliminar el apartado");
      }
    } catch (error) {
      console.error("Error al eliminar el apartado:", error);
      toast.error("Error al eliminar el apartado");
    }
  };

  // Función para manejar el caso en que total2 sea NaN
  const handleTotalNaN = () => {
    if (isNaN(total2)) {
      return 0;
    }
    return total2;
  };

  return (
    <div>
      <div className={Style.contenedor}>
        <NavAdmin />
        <div className={Style.contenido}>
          <div className={Style.datos}>
            {/* <Buscador />
            <CardVender /> */}
          </div>
          <div className={Style.fondo}>
            <div className={Style.registros}>
              {!apartadoData ? (
                <div>
                  <NotFoundComponent />
                  <p>No se envió apartados para vender</p>
                </div>
              ) : (
                <>
                  <Registros cards1={apartadoData} />

                  <div className={Style.pago}>
                    <Total total={handleTotalNaN()} />
           
                    <div onClick={realizarVenta}>
                      <ButtonVenta />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
