import React from 'react';
import style from './Register.module.css';
import Title from '../../Title/Title';
import Input from '../../Input/Input';
import Button from '../../button/Button';
import Text from '../../Text/Text';
import { useNavigate } from 'react-router-dom';


export default function Register() {
  const navigate = useNavigate();

  return (
    <form className={style.containerRegister}>
           <div className={style.title}>
        <Title text='Registrarse' />
        </div>
        <div className={style.inputs}>
            <div className={style.inputdatos}>
            <Input tipo='text' name='Nombres' />
            <Input tipo='text' name='Apellidos' />
            </div>
        <Input tipo='email' name='Correo' />
        <Input tipo='password' name='Contraseña' />
        <Input tipo='password' name='Confirmar Contraseña' />
        </div>
        <div className={style.boton} onClick={() => navigate("/")}>
        <Button nombre='Ingresar' />
        </div>
    </form>
  )
}
