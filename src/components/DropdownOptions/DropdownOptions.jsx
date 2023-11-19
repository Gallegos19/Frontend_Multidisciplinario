import React from "react";
import style from './Dropdown.module.css'
const DropdownOptions = ({ options, onClick }) => {
  return (
    <div className={style.dropdownmenu}>
      {options.map((option, index) => (
        <a key={index} onClick={() => onClick(option.route)}>
          {option.label}
        </a>
      ))}
    </div>
  );
};

export default DropdownOptions;
