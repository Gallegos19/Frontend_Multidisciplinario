import React from 'react'
import style from './Input.module.css'

export default function Input(props) {
  return (
    <div className='containerInput'>
        <input type={props.tipo} placeholder={props.name}/>
    </div>
  )
}
