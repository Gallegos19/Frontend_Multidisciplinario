import React from "react";
import Style from "./cardVender.module.css";
import Tenis from "../../assets/tenis.png"
export default function CardVender(){
    return(
        <div>
            <div className={Style.contenedor}>
        <div className={Style.contenido}>
          <img src={Tenis} alt="" />
          <h3 >Nike</h3>
          <h3 >Air Force</h3>
          <h3 >1</h3>
          <h3 >$150</h3>
          <button className={Style.añadir}>añadir</button>
        </div>
      </div>
    </div>
    )
}