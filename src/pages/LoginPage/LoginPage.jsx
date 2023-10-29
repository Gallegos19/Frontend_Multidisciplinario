import React from 'react'
import Login from '../../components/molecules/Login/Login'
import Imagen from '../../components/Imagen/Imagen'
import Logo from '../../assets/logo.png'
export default function LoginPage() {
  return (
    <div style={{display:'flex',flexDirection:'column', justifyContent:'center', alignItems:'center', marginTop:'auto', width:'100%'}}>
        <div style={{display:'flex', justifyContent:'left', alignItems:'center', marginTop:'auto', width:'100%'}}>
        <Imagen width='8' imagen={Logo} />
        </div>
        <Login />
    </div>
  )
}
