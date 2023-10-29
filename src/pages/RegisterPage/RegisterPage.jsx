import React from 'react'
import Register from '../../components/molecules/Register/Register'
import Imagen from '../../components/Imagen/Imagen'
import Logo from '../../assets/logo.png'
export default function RegisterPage() {
  return (
    <div style={{display:'flex',flexDirection:'column', justifyContent:'center', alignItems:'center', marginTop:'auto', width:'100%'}}>
        <div style={{display:'flex', justifyContent:'left', alignItems:'center', marginTop:'auto', width:'100%'}}>
        <Imagen width='8' imagen={Logo} />
        </div>
        <Register />
    </div>
  )
}
