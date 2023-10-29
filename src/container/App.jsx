import React  from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '../css/App.css'
import HomeClient from '../pages/HomeClient/HomeClient'
import Apartados from '../pages/Apartados/Apartados';
import RegisterPage from '../pages/RegisterPage/RegisterPage';
import LoginPage from '../pages/LoginPage/LoginPage';
import HomeAdmin from '../pages/HomeAdmin/HomeAdmin';
import CartProvider from '../context/CartContext';

function App() {
   return (
    
     <BrowserRouter>
     <CartProvider>
     <Routes>
       <Route path="/" element={<HomeClient />} />
       <Route path="/admin" element={<HomeAdmin />} />
       <Route path="/login" element={<LoginPage />} />
       <Route path="/register" element={<RegisterPage />} />
       <Route path="/admin/apartados" element={<Apartados />} />
     </Routes>
     </CartProvider>
   </BrowserRouter>
  )
}

export default App
