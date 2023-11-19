import Bota from '../../assets/Bota.webp';
import Tenis from '../../assets/NikeDunk.webp';
import zapato from '../../assets/zapato.jpg';
import Sandalia from '../../assets/sandaliaHombre.jpg';
import sandalia2 from '../../assets/sandaliasMujer.jpg';
import Tacon from "../../assets/tacon.jpg";
import Tenis2 from '../../assets/nikeMujer.webp';
import adidasF from '../../assets/adidasmujer.jpg';
import adidas from '../../assets/adidashombre.jpg'
import nike from '../../assets/tenisNike.png'
import nikeF from '../../assets/nikeMujer.webp';
import pumaHombre from '../../assets/pumaHombre.jpg'
import pumaMujer from '../../assets/pumaMujer.jpg'
import sandalia3 from '../../assets/sandaliasninos.jpg';
import zapatoninas from '../../assets/zapatoniña.jpg'
import zapatosninos from '../../assets/zapatoniño.jpg';
import zapatoDama from '../../assets/zapConford.jpg';
import tenis from '../../assets/tenisninos.jpg';

const productosData = {
  
  caballero: {
    botas: [
        { id: 1, marca: "Bota", imagen: Bota, modelo: "Bota AF1", precio: 2000, cantidad: 1, star: 5 },
        { id: 2, marca: "Bota", imagen: Bota, modelo: "Bota AF1", precio: 3000, cantidad: 1, star: 4 },
        { id: 3, marca: "Bota", imagen: Bota, modelo: "Bota AF1", precio: 1000, cantidad: 1, star: 3 },
        { id: 4, marca: "Bota", imagen: Bota, modelo: "Bota AF1", precio: 2300, cantidad: 1, star: 2 },
        { id: 5, marca: "Bota", imagen: Bota, modelo: "Bota AF1", precio: 2500, cantidad: 1, star: 5 }
    ],
    tenis: [
        { id: 12, marca: "Nike", imagen: Tenis, modelo: "Nike AF1", precio: 3000,cantidad:1, star: 4 },
        { id: 13, marca: "Nike", imagen: Tenis, modelo: "Nike AF1", precio: 1000,cantidad:1, star: 3 },
        { id: 14, marca: "Nike", imagen: Tenis, modelo: "Nike AF1", precio: 2300,cantidad:1, star: 2 },
        { id: 15, marca: "Nike", imagen: Tenis, modelo: "Bota AF1", precio: 2500,cantidad:1, star: 5 }
    ],
    sandalias: [
        { id: 6, marca: "Bota", imagen: Sandalia, modelo: "Bota AF1", precio: 2000,cantidad:1, star: 5 },
        { id: 7, marca: "Bota", imagen: Sandalia, modelo: "Bota AF1", precio: 3000,cantidad:1, star: 4 },
        { id: 8, marca: "Bota", imagen: Sandalia, modelo: "Bota AF1", precio: 1000,cantidad:1, star: 3 },
        { id: 9, marca: "Bota", imagen: Sandalia, modelo: "Bota AF1", precio: 2300,cantidad:1, star: 2 },
        { id: 10, marca: "Bota", imagen: Sandalia, modelo: "Bota AF1", precio: 2500,cantidad:1, star: 5 }
    ],
    zapatos: [
        { id: 16, marca: "Nike", imagen: zapato, modelo: "Nike AF1", precio: 2000,cantidad:1, star: 5 },
        { id: 17, marca: "Nike", imagen: zapato, modelo: "Nike AF1", precio: 3000,cantidad:1, star: 4 },
        { id: 18, marca: "Nike", imagen: zapato, modelo: "Nike AF1", precio: 1000,cantidad:1, star: 3 },
        { id: 19, marca: "Nike", imagen: zapato, modelo: "Nike AF1", precio: 2300,cantidad:1, star: 2 },
        { id: 20, marca: "Nike", imagen: zapato, modelo: "Bota AF1", precio: 2500,cantidad:1, star: 5 }
    ],
    // Agrega más secciones según sea necesario
  },
  damas: {
    tenis: [
        { id: 31, marca: "Nike", imagen: Tenis2, modelo: "Nike AF1", precio: 2000,cantidad:1, star: 5 },
        { id: 32, marca: "Nike", imagen: Tenis2, modelo: "Nike AF1", precio: 3000,cantidad:1, star: 4 },
        { id: 33, marca: "Nike", imagen: Tenis2, modelo: "Nike AF1", precio: 1000,cantidad:1, star: 3 },
        { id: 34, marca: "Nike", imagen: Tenis2, modelo: "Nike AF1", precio: 2300,cantidad:1, star: 2 },
        { id: 35, marca: "Nike", imagen: Tenis2, modelo: "Bota AF1", precio: 2500,cantidad:1, star: 5 }
    ],
    zapatos: [
        { id: 36, marca: "Nike", imagen: zapatoDama, modelo: "Nike AF1", precio: 2000,cantidad:1, star: 5 },
        { id: 37, marca: "Nike", imagen: zapatoDama, modelo: "Nike AF1", precio: 3000,cantidad:1, star: 4 },
        { id: 38, marca: "Nike", imagen: zapatoDama, modelo: "Nike AF1", precio: 1000,cantidad:1, star: 3 },
        { id: 39, marca: "Nike", imagen: zapatoDama, modelo: "Nike AF1", precio: 2300,cantidad:1, star: 2 },
        { id: 40, marca: "Nike", imagen: zapatoDama, modelo: "Bota AF1", precio: 2500,cantidad:1, star: 5 }
    ],
    sandalias:[
        { id: 21, marca: "Nike", imagen: sandalia2, modelo: "Nike AF1", precio: 2000,cantidad:1, star: 5 },
        { id: 22, marca: "Nike", imagen: sandalia2, modelo: "Nike AF1", precio: 3000,cantidad:1, star: 4 },
        { id: 23, marca: "Nike", imagen: sandalia2, modelo: "Nike AF1", precio: 1000,cantidad:1, star: 3 },
        { id: 24, marca: "Nike", imagen: sandalia2, modelo: "Nike AF1", precio: 2300,cantidad:1, star: 2 },
        { id: 25, marca: "Nike", imagen: sandalia2, modelo: "Bota AF1", precio: 2500,cantidad:1, star: 5 }
    ],
    tacones:[
        {
            id: 26,
            marca: "Nike",
            imagen: Tacon,
            modelo: "Nike AF1",
            precio: 2000,
            cantidad: 1,
            star: 5,
          },
          {
            id: 27,
            marca: "Nike",
            imagen: Tacon,
            modelo: "Nike AF1",
            precio: 3000,
            cantidad: 1,
            star: 4,
          },
          {
            id: 28,
            marca: "Nike",
            imagen: Tacon,
            modelo: "Nike AF1",
            precio: 1000,
            cantidad: 1,
            star: 3,
          },
          {
            id: 29,
            marca: "Nike",
            imagen: Tacon,
            modelo: "Nike AF1",
            precio: 2300,
            cantidad: 1,
            star: 2,
          },
          {
            id: 30,
            marca: "Nike",
            imagen: Tacon,
            modelo: "Bota AF1",
            precio: 2500,
            cantidad: 1,
            star: 5,
          },
    ]
  },
  ninos: {
    tenis: [
        { id: 81, marca: "Nike", imagen: tenis, modelo: "Nike ", precio: 2000,cantidad:1, star: 5 },
        { id: 82, marca: "Nike", imagen: tenis, modelo: "Nike ", precio: 3000,cantidad:1, star: 4 },
        { id: 83, marca: "Nike", imagen: tenis, modelo: "Nike ", precio: 1000,cantidad:1, star: 3 },
        { id: 84, marca: "Nike", imagen: tenis, modelo: "Nike ", precio: 2300,cantidad:1, star: 2 },
        { id: 85, marca: "Nike", imagen: tenis, modelo: "Nike ", precio: 2500,cantidad:1, star: 5 }
    ],
    tenisninas:[
        { id: 101, marca: "Nike", imagen: tenis, modelo: "Nike ", precio: 2000,cantidad:1, star: 5 },
        { id: 102, marca: "Nike", imagen: tenis, modelo: "Nike ", precio: 3000,cantidad:1, star: 4 },
        { id: 103, marca: "Nike", imagen: tenis, modelo: "Nike ", precio: 1000,cantidad:1, star: 3 },
        { id: 104, marca: "Nike", imagen: tenis, modelo: "Nike ", precio: 2300,cantidad:1, star: 2 },
        { id: 105, marca: "Nike", imagen: tenis, modelo: "Nike ", precio: 2500,cantidad:1, star: 5 }
    ],
    zapatos:[
        { id: 91, marca: "Nike", imagen: zapatosninos, modelo: "Nike ", precio: 2000,cantidad:1, star: 5 },
        { id: 92, marca: "Nike", imagen: zapatosninos, modelo: "Nike ", precio: 3000,cantidad:1, star: 4 },
        { id: 93, marca: "Nike", imagen: zapatosninos, modelo: "Nike ", precio: 1000,cantidad:1, star: 3 },
        { id: 94, marca: "Nike", imagen: zapatosninos, modelo: "Nike ", precio: 2300,cantidad:1, star: 2 },
        { id: 95, marca: "Nike", imagen: zapatosninos, modelo: "Nike ", precio: 2500,cantidad:1, star: 5 }
        // Agrega más productos según sea necesario
      ],
    zapatosninas:[
        { id: 106, marca: "Nike", imagen: zapatoninas, modelo: "Nike ", precio: 2000,cantidad:1, star: 5 },
        { id: 107, marca: "Nike", imagen: zapatoninas, modelo: "Nike ", precio: 3000,cantidad:1, star: 4 },
        { id: 108, marca: "Nike", imagen: zapatoninas, modelo: "Nike ", precio: 1000,cantidad:1, star: 3 },
        { id: 109, marca: "Nike", imagen: zapatoninas, modelo: "Nike ", precio: 2300,cantidad:1, star: 2 },
        { id: 110, marca: "Nike",imagen: zapatoninas, modelo: "Nike ", precio: 2500,cantidad:1, star: 5 }
    ],
    sandalias:[
        { id: 71, marca: "Nike", imagen: sandalia3, modelo: "Nike ", precio: 2000,cantidad:1, star: 5 },
        { id: 72, marca: "Nike", imagen: sandalia3, modelo: "Nike ", precio: 3000,cantidad:1, star: 4 },
        { id: 73, marca: "Nike", imagen: sandalia3, modelo: "Nike ", precio: 1000,cantidad:1, star: 3 },
        { id: 74, marca: "Nike", imagen: sandalia3, modelo: "Nike ", precio: 2300,cantidad:1, star: 2 },
        { id: 75, marca: "Nike", imagen: sandalia3, modelo: "Nike ", precio: 2500,cantidad:1, star: 5 }
    ],
    sandaliasninas:[
        { id: 111, marca: "Nike", imagen: sandalia3, modelo: "Nike ", precio: 2000,cantidad:1, star: 5 },
        { id: 112, marca: "Nike", imagen: sandalia3, modelo: "Nike ", precio: 3000,cantidad:1, star: 4 },
        { id: 113, marca: "Nike", imagen: sandalia3, modelo: "Nike ", precio: 1000,cantidad:1, star: 3 },
        { id: 114, marca: "Nike", imagen: sandalia3, modelo: "Nike ", precio: 2300,cantidad:1, star: 2 },
        { id: 115, marca: "Nike", imagen: sandalia3, modelo: "Nike ", precio: 2500,cantidad:1, star: 5 }
    ],

  },
  marcas: {
    nike: [
        {
          id: 51,
          marca: "Nike",
          imagen: nike,
          modelo: "Nike Modelo Hombre",
          precio: 2000,
          cantidad: 1,
          star: 5,
        },
        {
          id: 52,
          marca: "Nike",
          imagen: nike,
          modelo: "Nike Modelo Hombre",
          precio: 3000,
          cantidad: 1,
          star: 4,
        },
        {
          id: 53,
          marca: "Nike",
          imagen: nike,
          modelo: "Nike Modelo Hombre",
          precio: 1000,
          cantidad: 1,
          star: 3,
        },
        {
          id: 54,
          marca: "Nike",
          imagen: nike,
          modelo: "Nike Modelo Hombre",
          precio: 2300,
          cantidad: 1,
          star: 2,
        },
        {
          id: 55,
          marca: "Nike",
          imagen: nike,
          modelo: "Nike Modelo Hombre",
          precio: 2500,
          cantidad: 1,
          star: 5,
        },
      ],
      nikeMujer: [
        {
          id: 56,
          marca: "Nike",
          imagen: nikeF,
          modelo: "Nike Modelo Mujer",
          precio: 2000,
          cantidad: 1,
          star: 5,
        },
        {
          id: 57,
          marca: "Nike",
          imagen: nikeF,
          modelo: "Nike Modelo Mujer",
          precio: 3000,
          cantidad: 1,
          star: 4,
        },
        {
          id: 58,
          marca: "Nike",
          imagen: nikeF,
          modelo: "Nike Modelo Mujer",
          precio: 1000,
          cantidad: 1,
          star: 3,
        },
        {
          id: 59,
          marca: "Nike",
          imagen: nikeF,
          modelo: "Nike Modelo Mujer",
          precio: 2300,
          cantidad: 1,
          star: 2,
        },
        {
          id: 60,
          marca: "Nike",
          imagen: nikeF,
          modelo: "Nike Modelo Mujer",
          precio: 2500,
          cantidad: 1,
          star: 5,
        },
      ],
      puma: [
        {
          id: 71,
          marca: "Puma",
          imagen: pumaHombre,
          modelo: "Puma Hombre",
          precio: 2000,
          cantidad: 1,
          star: 5,
        },
        {
          id: 72,
          marca: "Puma",
          imagen: pumaHombre,
          modelo: "Puma Hombre",
          precio: 3000,
          cantidad: 1,
          star: 4,
        },
        {
          id: 73,
          marca: "Puma",
          imagen: pumaHombre,
          modelo: "Puma Hombre",
          precio: 1000,
          cantidad: 1,
          star: 3,
        },
        {
          id: 74,
          marca: "Puma",
          imagen: pumaHombre,
          modelo: "Puma Hombre",
          precio: 2300,
          cantidad: 1,
          star: 2,
        },
        {
          id: 75,
          marca: "Puma",
          imagen: pumaHombre,
          modelo: "Puma Hombre",
          precio: 2500,
          cantidad: 1,
          star: 5,
        }
      ],
  
      pumaMujer: [
        {
          id: 76,
          marca: "Puma",
          imagen: pumaMujer,
          modelo: "Puma Mujer",
          precio: 2000,
          cantidad: 1,
          star: 5,
        },
        {
          id: 77,
          marca: "Puma",
          imagen: pumaMujer,
          modelo: "Puma Mujer",
          precio: 3000,
          cantidad: 1,
          star: 4,
        },
        {
          id: 78,
          marca: "Puma",
          imagen: pumaMujer,
          modelo: "Puma Mujer",
          precio: 1000,
          cantidad: 1,
          star: 3,
        },
        {
          id: 79,
          marca: "Puma",
          imagen: pumaMujer,
          modelo: "Puma Mujer",
          precio: 2300,
          cantidad: 1,
          star: 2,
        },
        {
          id: 80,
          marca: "Puma",
          imagen: pumaMujer,
          modelo: "Puma Mujer",
          precio: 2500,
          cantidad: 1,
          star: 5,
        }
      ],
   adidas: [
      {
        id: 51,
        marca: "Adidas",
        imagen: adidas,
        modelo: "Adidas Modelo Hombre",
        precio: 2000,
        cantidad: 1,
        star: 5,
      },
      {
        id: 52,
        marca: "Adidas",
        imagen: adidas,
        modelo: "Adidas Modelo Hombre",
        precio: 3000,
        cantidad: 1,
        star: 4,
      },
      {
        id: 53,
        marca: "Adidas",
        imagen: adidas,
        modelo: "Adidas Modelo Hombre",
        precio: 1000,
        cantidad: 1,
        star: 3,
      },
      {
        id: 54,
        marca: "Adidas",
        imagen: adidas,
        modelo: "Adidas Modelo Hombre",
        precio: 2300,
        cantidad: 1,
        star: 2,
      },
      {
        id: 55,
        marca: "Adidas",
        imagen: adidas,
        modelo: "Adidas Modelo Hombre",
        precio: 2500,
        cantidad: 1,
        star: 5,
      },
    ],
    adidasMujer: [
      {
        id: 56,
        marca: "Adidas",
        imagen: adidasF,
        modelo: "Adidas Modelo Mujer",
        precio: 2000,
        cantidad: 1,
        star: 5,
      },
      {
        id: 57,
        marca: "Adidas",
        imagen: adidasF,
        modelo: "Adidas Modelo Mujer",
        precio: 3000,
        cantidad: 1,
        star: 4,
      },
      {
        id: 58,
        marca: "Adidas",
        imagen: adidasF,
        modelo: "Adidas Modelo Mujer",
        precio: 1000,
        cantidad: 1,
        star: 3,
      },
      {
        id: 59,
        marca: "Adidas",
        imagen: adidasF,
        modelo: "Adidas Modelo Mujer",
        precio: 2300,
        cantidad: 1,
        star: 2,
      },
      {
        id: 60,
        marca: "Adidas",
        imagen: adidasF,
        modelo: "Adidas Modelo Mujer",
        precio: 2500,
        cantidad: 1,
        star: 5,
      },
    ],
    otros:[

    ]

  },
};

export default productosData;
