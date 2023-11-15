import React from 'react'
import style from './Button.module.css'

export default function Button(props) {
  return (
    <div className={style.containerButton}>
        <button className={style.boton} role='boton'>
            {
                props.nombre
            }
        </button>
    </div>
  )
}
