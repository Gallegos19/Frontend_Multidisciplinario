import React from "react";
import styles from "./Rating.module.css"; // Importa los estilos con CSS Modules

const Rating = ({ ratingValue, id }) => {

  return (
    <div className={styles.rating}>
      <input
        value="5"
        name={`rating-${id}`}
        id={`star5-${id}`}
        type="radio"
        checked={ratingValue === 5}
        readOnly
      />
      <label htmlFor={`star5-${id}`}></label>
      <input
        value="4"
        name={`rating-${id}`}
        id={`star4-${id}`}
        type="radio"
        checked={ratingValue === 4}
        readOnly
      />
      <label htmlFor={`star4-${id}`}></label>
      <input
        value="3"
        name={`rating-${id}`}
        id={`star3-${id}`}
        type="radio"
        checked={ratingValue === 3}
        readOnly
      />
      <label htmlFor={`star3-${id}`}></label>
      <input
        value="2"
        name={`rating-${id}`}
        id={`star2-${id}`}
        type="radio"
        checked={ratingValue === 2}
        readOnly
      />
      <label htmlFor={`star2-${id}`}></label>
      <input
        value="1"
        name={`rating-${id}`}
        id={`star1-${id}`}
        type="radio"
        checked={ratingValue === 1}
        readOnly
      />
      <label htmlFor={`star1-${id}`}></label>
    </div>
  );
};

export default Rating;
