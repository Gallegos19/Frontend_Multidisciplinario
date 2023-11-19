import React from "react";
import { RiMoneyDollarCircleLine } from 'react-icons/ri';
import Style from "./total.module.css";

export default function Total(props) {
    return (
        <div>
            <div className={Style.contenido}>
                <div className={Style.total}>
                    <div className={Style.icon}>
                        <RiMoneyDollarCircleLine size={25} />
                    </div>
                    <h3>
                       Total
                    </h3>
                </div>
                <div className={Style.gancia}>
                    <h3>
                        ${props.total}100000
                    </h3>
                </div>
            </div>
        </div>
    )
}
