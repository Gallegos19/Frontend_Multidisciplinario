import React from 'react'
import style from './Button.module.css'

export default function Button(props) {
  return (
    <div className='containerButton'>
        <button role='boton'>
            {
                props.nombre
            }
        </button>
    </div>
  )
}
