import React from 'react';
import style from './Login.module.css'
import Title from '../../Title/Title';
import Input from '../../Input/Input';
import Button from '../../button/Button';
import Text from '../../Text/Text';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  function IniciarSesion(e){
    
      console.log("Hola")
    
      

  }
  return (
    <form className={style.containerLogin}>
      <div className={style.title}>
        <Title text='Iniciar Sesion' />
        </div>
        <div className={style.inputs}>
        <Input tipo='email' name='Correo' />
        <Input tipo='password' name='Contraseña' />
        </div>
        <div className={style.boton} onClick={() => navigate("/")}>
        <Button nombre='Ingresar' />
        </div>
        <div onClick={() => navigate("/register")}>
          <Text text='¿No tienes cuenta? Registrate aqui'/>
        </div>
    </form>
  )
}
