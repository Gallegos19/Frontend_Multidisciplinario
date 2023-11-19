import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

export default function Grafica({ cards }) {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!cards || !Array.isArray(cards) || cards.length === 0) {
      return;
    }

    const productCount = cards.reduce((acc, card) => {
      acc[card.modelo] = (acc[card.modelo] || 0) + card.cantidad;
      return acc;
    }, {});

    const data = {
      labels: Object.keys(productCount),
      datasets: [{
        label: 'Ventas por producto',
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        data: Object.values(productCount),
      }],
    };

    const options = {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    };

    const ctx = chartRef.current.getContext('2d');
    const myChart = new Chart(ctx, {
      type: 'bar',
      data: data,
      options: options,
    });

    return () => {
      myChart.destroy();
    };
  }, [cards]);

  return (
    <div>
      <canvas ref={chartRef} width="400" height="400"></canvas>
    </div>
  );
}
