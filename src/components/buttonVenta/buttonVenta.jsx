import React from "react";
import Style from "./buttonVenta.module.css";
export default function ButtonVenta(){
    return(
        <div>
            <div className={Style.contenedor}>
            
                <button className={Style.button}>Aceptar venta</button>
            </div>

      
        </div>
    )
}