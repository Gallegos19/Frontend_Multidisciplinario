import React, { useState } from 'react';
import style from './Login.module.css';
import Title from '../../Title/Title';
import Input from '../../Input/Input';
import Button from '../../button/Button';
import Text from '../../Text/Text';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    // Basic form validation
    if (!email.trim() || !password.trim()) {
      toast.error('Ingrese su correo electrónico y contraseña', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
      return;
    }

    // Mostrar notificación de que la solicitud se está procesando
    toast.info('Iniciando sesión...', {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: false,
    });

    try {
      const response = await fetch('http://localhost:8080/auth/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        // Cerrar la notificación de inicio de sesión en caso de error
        toast.dismiss(); // Cierra la notificación actual
        toast.error('Credenciales inválidas', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });
        return;
      }

      const data = await response.json();
      const { token, rol, id } = data.data;

      // Save the token to localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('id', id);




      // Agregar un pequeño retraso antes de redirigir para permitir que la notificación se muestre
      setTimeout(() => {
        // Redirect based on the user's role
        if (rol === 'ADMIN') {
          navigate('/admin');
        } else {
          navigate('/');
        }
      }, 2000);
    } catch (error) {
      console.error('Error:', error);
      // Cerrar la notificación de inicio de sesión en caso de error
      toast.dismiss(); // Cierra la notificación actual
      toast.error('Error en la solicitud, por favor inténtelo nuevamente', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }
  };

  return (
    <div>
      <form className={style.containerLogin} onSubmit={handleLogin}>
        <div className={style.title}>
          <Title text='Iniciar Sesión' />
        </div>
        <div className={style.inputs}>
          <input
            type='email'
            placeholder='Correo'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type='password'
            placeholder='Contraseña'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className={style.boton}>
          <Button nombre='Ingresar' type='submit' />
        </div>
        <div onClick={() => navigate('/register')}>
          <Text text='¿No tienes cuenta? Regístrate aquí' />
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}
