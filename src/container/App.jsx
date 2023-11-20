import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Routes>
          <Route path="/" element={<HomeClient />} />
          <Route path="/marcas/:nombreMarca" element={<Marcas />} />
          <Route path="/botas/:genero" element={<Botas />} />     
          <Route path="/sandalias/:genero" element={<Sandalias />} />   
          <Route path="/tenis/:genero" element={<Tenis />} />  
          <Route path="/tacones/:genero" element={<Tacones />} />
          <Route path="/zapatos/:genero" element={<Zapatos />} />   
          <Route path="/especifica" element={<Especifica />} />
          <Route path="/apartado" element={<ApartadosClient />} />

          <Route path="/admin" element={<HomeAdmin />} />
          <Route path="/admin/vender" element={<Vender />} />
          <Route path="/admin/inventario" element={<InventarioAdmin />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/admin/apartados" element={<Apartados />} />
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;