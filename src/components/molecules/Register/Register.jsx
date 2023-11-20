import React, { useState } from 'react';
import style from './Register.module.css';
import Title from '../../Title/Title';
import Input from '../../Input/Input';
import Button from '../../button/Button';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const navigate = useNavigate();

  // Estados para los campos del formulario
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación básica de los campos
    if (!nombre.trim() || !apellido.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {

      toast.error('Por favor, complete todos los campos.', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
      return;
    }

    // Validación de la contraseña
    if (password !== confirmPassword) {
      toast.error('Las contraseñas no coinciden.', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
      return;
    }

    // Crear el objeto de usuario a enviar a la API
    const newUser = {
      nombre,
      apellido,
      email,
      password,
      rol: 'USER',
    };

    // Consumir la API para registrar al usuario
    try {
      const response = await fetch('https://f2r4qdv2-8080.euw.devtunnels.ms/v1/Usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        toast.error('Error al registrar el usuario. Inténtelo nuevamente.', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });
        return;
      }

      // Usuario registrado con éxito
      alert('Usuario registrado con éxito. ¡Inicie sesión para continuar!');
      toast.success('¡Usuario registrado con éxito. ¡Inicie sesión para continuar!', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
      });
      setTimeout(() => {
        // Redirect based on the user's role
                 navigate('/');
        
      }, 2000); 
  
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
      toast.error('Error al registrar el usuario. Inténtelo nuevamente.', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }
  };

  return (
    <form className={style.containerRegister} onSubmit={handleSubmit}>
      <div className={style.title}>
        <Title text='Registrarse' />
      </div>
      <div className={style.inputs}>
        <div className={style.inputdatos}>
          <input type='text' placeholder='Nombres' value={nombre} onChange={(e) => setNombre(e.target.value)} />
          <input type='text' placeholder='Apellidos' value={apellido} onChange={(e) => setApellido(e.target.value)} />
        </div>
        <input type='email' placeholder='Correo' value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type='password' placeholder='Contraseña' value={password} onChange={(e) => setPassword(e.target.value)} />
        <input
          type='password'
          placeholder='Confirmar Contraseña'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <div className={style.boton} onClick={handleSubmit}>
        <Button nombre='Registrar' type='submit' />
      </div>
    </form>
  );
};

export default Register;
