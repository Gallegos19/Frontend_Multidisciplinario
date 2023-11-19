import React, { useState, useEffect } from "react";
import { useCartContext } from "../../context/CartContext";
import style from "./Contador.module.css";

const PlusButton = (props) => {
  const { cart } = useCartContext();
  const [totalQuantity, setTotalQuantity] = useState(0);

  useEffect(() => {
    // Calcula la cantidad total sumando las cantidades de cada elemento en el carrito
    const newTotalQuantity = cart.reduce((total, item) => total + item.cantidad, 0);
    setTotalQuantity(newTotalQuantity);
  }, [cart]);

  return (
    <p
      style={{
        display: 'flex',
        justifyContent: 'center',
        position:'relative',
        borderRadius: '100%',
        width: '20px',
        backgroundColor: 'black',
        fontFamily: 'Poppins',
        fontSize: '0.9rem',
        color: 'white',
        fontWeight:  'bold',
      }}
    >
      {totalQuantity > 9 ? '9+' : totalQuantity}
    </p>
  );
};

export default PlusButton;
