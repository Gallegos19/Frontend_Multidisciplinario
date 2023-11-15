import React from 'react'
import NavClient from '../../components/NavClient/NavClient'
import Cards from '../../components/CardClient/CardsClient'
import sandalia from '../../assets/sandaliasninos.jpg';
import Footer from '../../components/Footer/Footer';
export default function Sandalias() {
    const productos = [
        { id: 71, marca: "Nike", imagen: sandalia, modelo: "Nike ", precio: 2000,cantidad:1, star: 5 },
        { id: 72, marca: "Nike", imagen: sandalia, modelo: "Nike ", precio: 3000,cantidad:1, star: 4 },
        { id: 73, marca: "Nike", imagen: sandalia, modelo: "Nike ", precio: 1000,cantidad:1, star: 3 },
        { id: 74, marca: "Nike", imagen: sandalia, modelo: "Nike ", precio: 2300,cantidad:1, star: 2 },
        { id: 75, marca: "Nike", imagen: sandalia, modelo: "Nike ", precio: 2500,cantidad:1, star: 5 }
        // Agrega más productos según sea necesario
      ];
  return (
    <div style={{display:'flex', flexDirection:'column', width:'100%', margin:'auto'}}>
        <NavClient />

        <div style={{display:'flex', flexDirection:'column', width:'80%',margin:'auto',marginTop:'2%'}}>
        <h3 style={{fontFamily:'Poppins',marginBottom:'2%'}}>Sandalias</h3>
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

