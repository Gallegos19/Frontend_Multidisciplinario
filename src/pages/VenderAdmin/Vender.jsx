import React from "react";
import Total from "../../components/precios/total";
import Registros from "../../components/registros/resgistros";
import NavAdmin from "../../components/NavAdmin/NavAdmin";
import Buscador from "../../components/Buscador/Buscador";
import InputVender from "../../components/inputVender/inputVender";
import ButtonVenta from "../../components/buttonVenta/buttonVenta";
import CardVender from "../../components/cardVender/cardVender";
import Style from "./Vender.module.css"
export default function Vender() {
    return (
        <div>
            <div className={Style.contenedor}>
                <NavAdmin />
                <div className={Style.contenido}>
                    <div className={Style.datos}>
                        <Buscador />
                        <CardVender/>
                    </div>
                    <div className={Style.fondo}>
                    <div className={Style.registros}>
                        <Registros />

                        <div className={Style.pago}>
                            <Total />
                            <InputVender />
                            <ButtonVenta/>

                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}