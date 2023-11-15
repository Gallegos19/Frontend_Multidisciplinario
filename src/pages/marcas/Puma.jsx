import React from 'react'
import NavClient from '../../components/NavClient/NavClient'
import Cards from '../../components/CardClient/CardsClient'
import puma from '../../assets/pumaHombre.jpg'
import pumaM from '../../assets/pumaMujer.jpg'
import Footer from '../../components/Footer/Footer';
export default function Puma() {
    const productos = [
        { id: 61, marca: "Nike", imagen: puma, modelo: "Nike ", precio: 2000,cantidad:1, star: 5 },
        { id: 62, marca: "Nike", imagen: puma, modelo: "Nike ", precio: 3000,cantidad:1, star: 4 },
        { id: 63, marca: "Nike", imagen: puma, modelo: "Nike ", precio: 1000,cantidad:1, star: 3 },
        { id: 64, marca: "Nike", imagen: puma, modelo: "Nike ", precio: 2300,cantidad:1, star: 2 },
        { id: 65, marca: "Nike", imagen: puma, modelo: "Nike ", precio: 2500,cantidad:1, star: 5 }
        // Agrega más productos según sea necesario
      ];
      const productos2 = [
        { id: 66, marca: "Nike", imagen: pumaM, modelo: "Nike ", precio: 2000,cantidad:1, star: 5 },
        { id: 67, marca: "Nike", imagen: pumaM, modelo: "Nike ", precio: 3000,cantidad:1, star: 4 },
        { id: 68, marca: "Nike", imagen: pumaM, modelo: "Nike ", precio: 1000,cantidad:1, star: 3 },
        { id: 69, marca: "Nike", imagen: pumaM, modelo: "Nike ", precio: 2300,cantidad:1, star: 2 },
        { id: 70, marca: "Nike", imagen: pumaM, modelo: "Nike ", precio: 2500,cantidad:1, star: 5 }
        // Agrega más productos según sea necesario
      ];
  return (
    <div style={{display:'flex', flexDirection:'column', width:'100%', margin:'auto'}}>
        <NavClient />

        <div style={{display:'flex', flexDirection:'column', width:'80%',margin:'auto',marginTop:'2%'}}>
        <h3 style={{fontFamily:'Poppins',marginBottom:'2%'}}>Caballero</h3>
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
        <h3 style={{fontFamily:'Poppins',marginBottom:'2%'}}>Dama</h3>
        <div style={{display:'flex', width:'100%',margin:'auto',flexWrap:'wrap'}}>
        {productos2.map(producto => (
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

