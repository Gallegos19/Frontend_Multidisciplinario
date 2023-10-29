import React from "react";
import { BsCalendar3 } from 'react-icons/bs';
import Style from './fechas.module.css'
export default function Fechas() {
    return (
        <div>
            <div className={Style.contenedor}>
                <div className={Style.icon}>
                    
                <BsCalendar3 size={30} color="black" />
                </div>
               <div className={Style.fecha}>
               <h3>20  /  20  /  20  </h3>
               </div>
                

            </div>
        </div>
    )
}