import React from 'react'
import style from './Title.module.css'


export default function Title(props) {
  return (
    <div className={style.containerTitle}>
        <h1>
        {props.text}
        </h1>
    </div>
  )
}
