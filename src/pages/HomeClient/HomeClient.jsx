import React, { useState } from 'react';
import NavClient from '../../components/NavClient/NavClient'
import Carrusel from '../../components/Carrusel/Carrusel'
import tennis from '../../assets/descargatennis.png'
import tennis2 from '../../assets/tenisNike.png'
import tennis3 from '../../assets/adidasmujerremove.png'
import tennis4 from '../../assets/adidashombreremove.png'
import Cards from '../../components/CardClient/CardsClient'
import Footer from '../../components/Footer/Footer';

  

export default function HomeClient() {
    const productos = [
        { id: 1, marca: "Nike", imagen: tennis2, modelo: "Nike AF1", precio: 2000,cantidad:1, star: 5 },
        { id: 2, marca: "Nike", imagen: tennis2, modelo: "Nike AF1", precio: 3000,cantidad:1, star: 4 },
        { id: 3, marca: "Nike", imagen: tennis3, modelo: "Nike AF1", precio: 1000,cantidad:1, star: 3 },
        { id: 4, marca: "Nike", imagen: tennis4, modelo: "Nike AF1", precio: 2300,cantidad:1, star: 2 },
        { id: 5, marca: "Nike", imagen: tennis, modelo: "Nike AF1", precio: 2500,cantidad:1, star: 5 }
        // Agrega más productos según sea necesario
      ];
  return (
    <div style={{display:'flex', flexDirection:'column', width:'100%', margin:'auto'}}>
        <NavClient />
        <Carrusel imagenes={productos}  />        <div style={{display:'flex', flexDirection:'column', width:'80%',margin:'auto',marginTop:'2%'}}>
        <h3 style={{fontFamily:'Poppins',marginBottom:'2%'}}>Nuevos Lanzamientos</h3>
        <div style={{display:'flex', width:'100%',margin:'auto',flexWrap:'wrap'}}>
        {productos.map(producto => (
          <Cards
            key={producto.id}
            id={producto.id}
            imagen={producto.imagen}
            marca={producto.marca}
            modelo={producto.modelo}
            precio={producto.precio}
            stars={producto.star}
          />
        ))}
        </div>
         
        </div>
        <Footer/>
    </div>
  )
}