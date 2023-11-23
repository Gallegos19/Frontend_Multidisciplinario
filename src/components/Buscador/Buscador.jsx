import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import style from "./Buscador.module.css";

function Buscador() {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");
  const [calzados, setCalzados] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);


  useEffect(() => {
    const fetchCalzados = async () => {
      try {
        const accessToken = localStorage.getItem('token');
        const response = await fetch(`http://localhost:8080/v1/Calzados?page=1&size=1000`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
        });

        const result = await response.json();
        if (result && Array.isArray(result.data)) {
          setCalzados(result.data);
        } else {
          console.error('Invalid data format:', result);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchCalzados();
  }, []); 

  const filteredOptions = useMemo(() => {
    return calzados
      .filter((calzado) => (
        calzado.modelo.toLowerCase().includes(inputValue.toLowerCase()) ||
        calzado.marca.toLowerCase().includes(inputValue.toLowerCase())
      ))
      .slice(0, 10);
  }, [calzados, inputValue]);

  const handleChange = ({ target }) => {
    setInputValue(target.value);
    setSelectedOption(null);
  };

  const handleOptionClick = (calzado) => {
    setSelectedOption(calzado);
    // Almacenar la información del calzado seleccionado en localStorage
    localStorage.setItem('CardItem', JSON.stringify({ ...calzado, imagen: calzado.url_calzado }));
    // Redirigir a la página específica

    const currentLocation = window.location.pathname;

    // Verificar si la ubicación actual es '/vista-datos'
    if (currentLocation === '/especifica') {
      // Recargar la página
      window.location.reload();
    } else {
      // Navegar a '/vista-datos'
      navigate('/especifica');
    }
  };

  return (
    <div className={style.group}>
      <input
        placeholder="Search"
        type="search"
        className={style.input}
        onChange={handleChange}
        list="x"
      />
      <svg className={style.icon} aria-hidden="true" viewBox="0 0 24 24">
        <g>
          <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
        </g>
      </svg>
      {inputValue && filteredOptions.length > 0 && (
        <div className={style.autocomplete}>
          {filteredOptions.map((calzado, index) => (
            <div
              key={index}
              className={style.option}
              onClick={() => handleOptionClick(calzado)}
              style={{ background: selectedOption === calzado ? "#ccc" : "transparent" }}
            >
              <span>{calzado.modelo}</span>
              <span>Marca: {calzado.marca}</span>
              {calzado.url_calzado && (
                <img src={calzado.url_calzado} alt={`Imagen de ${calzado.modelo}`} />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Buscador;
