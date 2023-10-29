import React from 'react'
import style from './Carrusel.module.css'
import tennis from '../../assets/trainers.png'
export default function Carrusel(props) {
  return (
    <div className={style.containerCarrusel}>
        <div className={style.tenisizquierda2}>
        <img src={tennis} className={style.tennisIzquierda} alt="" />
        </div>
        <p className={style.marca}>
            {props.marca}
        </p>
            <img src={props.img} className={style.tenis} alt="" />
        <p className={style.modelo}>
            {props.modelo}
        </p>
        <img src={tennis} className={style.tennisDerecha} alt="" />
    </div>
  )
}
