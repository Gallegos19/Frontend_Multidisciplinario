import React from 'react'
import style from './Text.module.css'

export default function Text2(props) {
  return (
    <div className={style.containerText}>
        <a>
            {
                props.text
            }
        </a>
    </div>
  )
}