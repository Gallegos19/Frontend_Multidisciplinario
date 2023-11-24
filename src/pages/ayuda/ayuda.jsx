import React from "react";
import Style from "./ayuda.module.css";
import NavAdmin from "../../components/NavAdmin/NavAdmin";
import agregar from "../../assets/Agregar.png";
import formulario from "../../assets/rellenar-formulario.png";
import seleccion from "../../assets/seleccion-img.png";
import agregarProducto from "../../assets/agregar-Producto.png";
import confirmacion from "../../assets/confirmacion.png";
import visualizacion from "../../assets/visualizacion.png";
export default function Ayuda(){
    return (
        <div>
            
          <h2>Página de Ayuda</h2>
          
          <section>
            <h3>Ayuda para Administradores</h3>
            <p>Encuentra respuestas a tus preguntas frecuentes sobre la administración de la tienda de apartados de zapatos como administrador.</p>
            <p>Para crear un zapato debe hacer los siguientes pasos</p>

            <p>1.-Presionar el boton agregar </p>
            <img src={agregar} alt="" />
            <p>2.-Rellenar todos los apartados, 'no dejar vacio ninguno, ni poner numeros negativos' </p>
            <img src={formulario} alt="" />
            <p>3.-Al seleccionar una imagen se debe precionar agregar imagen, donde se desplegara un apartado de sus archivos para seleccionar 
            la de su preferencia </p>
            <img src={seleccion} alt="" />
            <p>4.-Una vez cargue su imagen arriba de los botones agregary cancelar ya podra agregarlo</p>
            <img src={agregarProducto} alt="" />
            <p>5.-Si el producto se agrego correctamente apareceran 2 notificaciones <br /> La primera de confirmacion de agregacion confirmada. <br /> La segunda de un aviso del lado del cliente.  </p>
            <img src={confirmacion} alt="" />
            <p>6.-Si su producto fue agregado correctamente podra visualizarlo en la seccion en donde fue agregado</p>
            <img src={visualizacion} alt="" />
          </section>

          <section>
            <h3>Ayuda para Clientes</h3>
            <p>Encuentra respuestas a tus preguntas frecuentes sobre la tienda de apartados de zapatos como cliente.</p>
            
        
          </section>
    
          <hr />
        </div>
      );
}