import React from "react";
import Style from "./inputVender.module.css";
export default function InputVender() {
    return (
        <div className={Style.contenedor}>
            <div className={Style.cantidad}>
                <h3>ingresar pago</h3>
                <input type='number' />
            </div>

        </div>

    )
}