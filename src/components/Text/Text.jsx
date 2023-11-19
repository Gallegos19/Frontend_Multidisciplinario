import React from 'react'
import style from './Text.module.css'

export default function Text(props) {
  return (
    <div className={style.containerText}>
        <a href="">
            {
                props.text
            }
        </a>
    </div>
  )
}
