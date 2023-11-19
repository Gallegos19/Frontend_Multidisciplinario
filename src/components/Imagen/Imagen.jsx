import React from 'react';

export default function Imagen(props) {
  return (
    <div>
      <img style={{ width: `${props.width}rem`, display:'flex', margin:'auto',marginTop:'1vh', justifyContent:'center', alignItems: 'center',borderRadius:'5px' }} src={props.imagen} alt="" />
    </div>
  );
}
