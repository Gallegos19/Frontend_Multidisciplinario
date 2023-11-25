import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import "../css/App.css";
import HomeClient from "../pages/HomeClient/HomeClient";
import Apartados from "../pages/Apartados/Apartados";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import HomeAdmin from "../pages/HomeAdmin/HomeAdmin";
import CartProvider from "../context/CartContext";
import Vender from "../pages/VenderAdmin/Vender";
import InventarioAdmin from "../pages/InventarioAdmin/inventarioAdmin";
import Tacones from "../pages/Tacones/Tacones";
import Marcas from "../pages/marcas/Marcas";
import Botas from "../pages/Botas/Botas";
import Especifica from "../pages/Especifica/Especifica";
import Sandalias from "../pages/Sandalias/Sandalias";
import Zapatos from '../pages/Zapatos/Zapatos';
import Tenis from "../pages/Tenis/Tenis";
import ApartadosClient from "../pages/ApartadosClient/ApartadosClient";
import NotFound from "../pages/NotFound/NotFound";
import SockJS from 'sockjs-client/dist/sockjs';
import { over } from 'stompjs';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Ayuda from "../pages/ayuda/ayuda";
import Loader from "../components/Loader/Loader";

function App() {
  const URI = "http://localhost:8081/ws";
  var stompClient = null;

  const connect = () => {
    let socket = new SockJS(URI);
    stompClient = over(socket);
    stompClient.connect({}, onConnected, onError);
  };

  const onConnected = () => {
    console.log('Conectado al servidor WebSocket');
    stompClient.subscribe('/public/chat/notificaciones', onMessageReceived);
  };

  const onMessageReceived = (frame) => {
    const messageBody = JSON.parse(frame.body);
    console.log("Mensaje recibido:", messageBody);

    let msg = messageBody.content;
    console.log(msg);

    console.log("Antes de toast.info");

    toast.info(`Mensaje recibido: ${messageBody.content}`, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
    });


    console.log("Después de toast.info");
  };

  const onError = (error) => {
    console.error('Error en la conexión WebSocket:', error);

    connect();
  };

  useEffect(() => {
    connect();
  }, []);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleLogin = (token) => {
    setIsAuthenticated(true);
    localStorage.setItem("token", token);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("token");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  return (
    <BrowserRouter>
      <CartProvider>
        <Routes>
          <Route path="/" element={<HomeClient />} />
          <Route path="/marcas/:marca" element={<Marcas />} />
          <Route path="/botas/:genero" element={<Botas />} />
          <Route path="/sandalias/:genero" element={<Sandalias />} />
          <Route path="/tenis/:genero" element={<Tenis />} />
          <Route path="/tacones/:genero" element={<Tacones />} />
          <Route path="/zapatos/:genero" element={<Zapatos />} />
          <Route path="/especifica" element={<Especifica />} />
          <Route path="/apartado" element={<ApartadosClient />} />
          <Route path="/login" element={loading ? <Loader /> : <LoginPage />} />
          <Route path="/register" element={loading ? <Loader /> : <RegisterPage />} />
          {isAuthenticated ? (
            <>
              <Route path="/admin" element={<HomeAdmin />} />
              <Route path="/admin/vender" element={<Vender />} />
              <Route path="/admin/inventario" element={<InventarioAdmin />} />
              <Route path="/admin/ayuda" element={<Ayuda />} />
              <Route path="/admin/apartados" element={<Apartados />} />
            </>
          ) : null}
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </CartProvider>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
