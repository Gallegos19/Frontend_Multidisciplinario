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
import Tennis from "../pages/caballero/Tennis";
import TennisDama from "../pages/dama/Tennis";
import ZapatosDama from "../pages/dama/Zapatos";
import SandaliasDama from "../pages/dama/Sandalias";
import Tacones from "../pages/Tacones/Tacones";
import TennisNinos from "../pages/ninos/Tennis";
import ZapatosNinos from "../pages/ninos/Zapatos";
import SandaliasNinos from "../pages/ninos/Sandalias";
import Nike from "../pages/marcas/Nike";
import Puma from "../pages/marcas/Puma";
import Adidas from "../pages/marcas/Adidas";
import Otros from "../pages/marcas/Otros";
import Marcas from "../pages/marcas/Marcas";
import Botas from "../pages/Botas/Botas";
import Especifica from "../pages/Especifica/Especifica";
import Sandalias from "../pages/Sandalias/Sandalias";
import Zapatos from '../pages/Zapatos/Zapatos';
import Tenis from "../pages/Tenis/Tenis";

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
          <Route path="/marcas/nike" element={<Nike />} />
          <Route path="/marcas/puma" element={<Puma />} />
          <Route path="/marcas/adidas" element={<Adidas />} />
          <Route path="/marcas/otros" element={<Otros />} />
          <Route path="/ninos/tennis" element={<TennisNinos />} />
          <Route path="/ninos/zapatos" element={<ZapatosNinos />} />
          <Route path="/ninos/sandalias" element={<SandaliasNinos />} />
          <Route path="/damas/tennis" element={<TennisDama />} />
          <Route path="/damas/zapatos" element={<ZapatosDama />} />
          <Route path="/damas/sandalias" element={<SandaliasDama />} />
          <Route path="/damas/tacones" element={<Tacones />} />
          <Route path="/caballero/tennis" element={<Tennis />} />
          <Route path="/caballero/zapatos" element={<Zapatos />} />
          <Route path="/caballero/sandalias" element={<Sandalias />} />
          <Route path="/caballero/botas" element={<Botas />} />
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
