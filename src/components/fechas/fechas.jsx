import React, { useState, useEffect } from 'react';
import { BsCalendar3 } from 'react-icons/bs';
import Style from './fechas.module.css';

export default function Fechas() {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    // Actualizar la fecha actual cada segundo (o según tus necesidades)
    const intervalId = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    // Limpieza del intervalo cuando el componente se desmonta
    return () => clearInterval(intervalId);
  }, []);

  // Obtener los componentes de la fecha
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1; // Los meses son indexados desde 0
  const year = currentDate.getFullYear();
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const seconds = currentDate.getSeconds();

  return (
    <div>
      <div className={Style.contenedor}>
        <div className={Style.icon}>
          <BsCalendar3 size={30} color="black" />
        </div>
        <div className={Style.fecha}>
        <h3>{`${day}/${month}/${year}`}</h3>

        </div>
      </div>
    </div>
  );
}