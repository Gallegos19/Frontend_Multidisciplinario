import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

export default function Grafica({ cards, productos }) {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!cards || !Array.isArray(cards) || cards.length === 0 || !productos || !Array.isArray(productos) || productos.length === 0) {
      return;
    }

    // Obtener los IDs de las ventas más vendidas
    const topSaleIds = cards
      .sort((a, b) => b.cantidad - a.cantidad) // Ordenar las ventas de mayor a menor cantidad
      .map((venta) => venta.id) // Obtener los IDs de las ventas

    // Filtrar los productos por las marcas más vendidas
    const filteredProducts = productos.filter((producto) => {
      return topSaleIds.includes(producto.idVenta);
    });

    // Contar las ventas por modelo y marca
    const productCount = filteredProducts.reduce((acc, product) => {
      const productName = `${product.marca}-${product.modelo}`;

      if (!acc[productName]) {
        acc[productName] = {
          totalVentas: 0,
        };
      }

      acc[productName].totalVentas += 1; 

      return acc;
    }, {});

    const sortedProducts = Object.keys(productCount).sort((a, b) => {
      return productCount[b].totalVentas - productCount[a].totalVentas;
    });

    const data = {
      labels: sortedProducts,
      datasets: [
        {
          label: 'Ventas por Producto',
          backgroundColor: getRandomColor(),
          borderColor: getRandomColor(),
          borderWidth: 1,
          data: sortedProducts.map((productName) => productCount[productName].totalVentas),
        },
      ],
    };

    const options = {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    };

    const ctx = chartRef.current?.getContext('2d');
    if (!ctx) return;

    const myChart = new Chart(ctx, {
      type: 'bar',
      data: data,
      options: options,
    });

    return () => {
      myChart.destroy();
    };
  }, [cards, productos]);

  

  // Función para obtener colores aleatorios
  const getRandomColor = () => `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.2)`;

  return (
    <div>
      <canvas ref={chartRef} width="400" height="400"></canvas>
     
    </div>
  );
}
