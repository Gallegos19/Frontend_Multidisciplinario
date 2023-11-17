import React, { useState } from 'react';
import NavClient from '../../components/NavClient/NavClient'
import Carrusel from '../../components/Carrusel/Carrusel'
import tennis from '../../assets/descargatennis.png'
import tennis2 from '../../assets/tenisNike.png'
import Cards from '../../components/CardClient/CardsClient'
import Footer from '../../components/Footer/Footer';
import tennis1 from '../../assets/adidashombre.jpg';
import tennis3 from '../../assets/adidasmujer.jpg';
import tennis4 from '../../assets/pumaMujer.jpg';
export default function HomeClient() {
    const productos = [
        { id: 1, marca: "Nike", imagen: tennis1, modelo: "Nike AF1", precio: 2000,cantidad:1, star: 5 },
        { id: 2, marca: "puma", imagen: tennis2, modelo: "Nike AF1", precio: 3000,cantidad:1, star: 4 },
        { id: 3, marca: "adidas", imagen: tennis3, modelo: "Nike AF1", precio: 1000,cantidad:1, star: 3 },
        { id: 4, marca: "pirma", imagen: tennis4, modelo: "Nike AF1", precio: 2300,cantidad:1, star: 2 },
        { id: 5, marca: "jordan", imagen: tennis, modelo: "Nike AF1", precio: 2500,cantidad:1, star: 5 }
        // Agrega más productos según sea necesario
      ];

     
  return (
    <div style={{display:'flex', flexDirection:'column', width:'100%', margin:'auto'}}>
        <NavClient />
        <Carrusel imagenes={productos}  />
        <div style={{display:'flex', flexDirection:'column', width:'80%',margin:'auto',marginTop:'2%'}}>
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
