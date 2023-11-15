import React from 'react'
import NavClient from '../../components/NavClient/NavClient'
import Cards from '../../components/CardClient/CardsClient'
import Tenis from '../../assets/NikeDunk.webp';
import Footer from '../../components/Footer/Footer';
export default function Tennis() {
    const productos = [
        { id: 11, marca: "Nike", imagen: Tenis, modelo: "Nike AF1", precio: 2000,cantidad:1, star: 5 },
        { id: 12, marca: "Nike", imagen: Tenis, modelo: "Nike AF1", precio: 3000,cantidad:1, star: 4 },
        { id: 13, marca: "Nike", imagen: Tenis, modelo: "Nike AF1", precio: 1000,cantidad:1, star: 3 },
        { id: 14, marca: "Nike", imagen: Tenis, modelo: "Nike AF1", precio: 2300,cantidad:1, star: 2 },
        { id: 15, marca: "Nike", imagen: Tenis, modelo: "Bota AF1", precio: 2500,cantidad:1, star: 5 }
        // Agrega más productos según sea necesario
      ];
  return (
    <div style={{display:'flex', flexDirection:'column', width:'100%', margin:'auto'}}>
        <NavClient />

        <div style={{display:'flex', flexDirection:'column', width:'80%',margin:'auto',marginTop:'2%'}}>
        <h3 style={{fontFamily:'Poppins',marginBottom:'2%'}}>Tenis</h3>
        <div style={{display:'flex', width:'100%',margin:'auto',flexWrap:'wrap'}}>
        {productos.map(producto => (
          <Cards
            key={producto.id}
            id={producto.id}
            marca={producto.marca}
            imagen={producto.imagen}
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
