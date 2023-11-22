import React from 'react'
import NotFoundComponent from '../../components/NotFound/NotFoundComponent'
export default function NotFound() {
  return (
    <div style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column', width:'100%'}}>
        <NotFoundComponent/>
        <h1>Oops!</h1>
        <p>Algo salio mal</p>
    </div>
  )
}
