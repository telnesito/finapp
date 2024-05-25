import React from 'react';
import { ICONS } from '../utils/constantes';


const DynamicIcon = ({ cat }) => {
  const foundIcon = ICONS.find(item => item.categoria === cat);


  if (!foundIcon) {
    return (
      <div className="flex items-center justify-center rounded bg-[#F2F2F2] w-[40px] h-[40px]">
        <p className="text-[10px]">Icono no encontrado</p>
      </div>
    );
  }

  const { icon: Icon, categoria } = foundIcon;

  return (
    <div className="flex items-center justify-center rounded bg-[#F2F2F2] w-[40px] h-[40px]">
      <Icon className="text-azulMarino" size="25px" />
    </div>
  );
};

export default DynamicIcon;

