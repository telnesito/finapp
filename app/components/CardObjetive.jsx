import React from "react";
import Image from "next/image";

const CardObjetive = ({ title, description, date, total, current }) => {
  // Calcular el porcentaje de progreso
  const progress = Math.floor((current / total) * 100);

  return (
    <div className="p-[10px]">
      <div className="flex justify-between">
        <div className="flex h-[55px]  gap-[15px] ">
          <div className="flex items-center justify-center rounded bg-[#F2F2F2] w-[40px] h-[40px]">
            <Image
              width={15}
              height={20}
              alt="uparrow"
              src={"/songicon.svg"}
            ></Image>
          </div>

          <div>
            {/* Título y descripción de la deuda */}
            <p className="text-[16px] text-azulMarino font-medium">
              {title.slice(0, 25)}
            </p>
            <p className="text-gray-300 text-[12px]">
              {description.slice(0, 25)}
            </p>
          </div>
        </div>
        <div className="flex flex-col ">
          {/* Mostrar el progreso */}
          {progress === 100 ? (
            <>
              <strike className={`text-black text-[16px] text-right`}>
                {progress + "%"}
              </strike>
              <p className="text-gray-300 text-[12px] text-right">{date}</p>
            </>
          ) : (
            <>
              <p className={`text-black-400 text-[16px] text-right`}>
                {progress + "%"}
              </p>
              <p className="text-gray-300 text-[12px] text-right">{date}</p>
            </>
          )}
        </div>
      </div>
      {/* Divider */}
      <div className="h-[1px] mt-[5px] mb-[5px] bg-gray-100"></div>
    </div>
  );
};

export default CardObjetive;
