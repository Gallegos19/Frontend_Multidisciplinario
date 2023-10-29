import React from "react";
import Fechas from '../../components/fechas/fechas'
import Total from "../../components/precios/total";
import Registros from "../../components/registros/resgistros";
import Grafica from "../../assets/grafica.png";
import Style from "./homeAdmin.module.css";
import NavAdmin from "../../components/NavAdmin/NavAdmin";
export default function HomeAdmin() {
    return (
        <div>
            <div className={Style.contenedor}>
                <NavAdmin />
                <div className={Style.contenido}>
                <div className={Style.datos}>
                    <Fechas />
                    <Total />
                   
                    

                </div>
            
                <div className={Style.registros}>
                <Registros />
              
                <div className={Style.contendorgrafica}>
                <h3 className={Style.producto}>Top Productos del dia</h3>                
                 <img className={Style.grafica} src={Grafica} alt="" />

                 </div>

                </div>
                </div>
            </div>
        </div>
    )
}