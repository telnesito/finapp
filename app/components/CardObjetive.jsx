import Image from "next/image";
import React, { useState } from "react";
import useModal from "../customHooks/useModa";
import { Box, Modal } from "@mui/material";
import TextField from "./TextField";
import Button from "./Button";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

const CardObjetive = ({ title, description, date, total, current, state, category }) => {
  // Calcular el porcentaje de progreso
  const progress = Math.floor((current / total) * 100);
  const { closeModal, isOpen, openModal } = useModal();


  const [newObjetivo, setNewObjetivo] = useState({
    fecha: '',
    meta: '',
    titulo: '',
    categoria: 'Entretenimiento',
    descripcion: '',
    estado: 1
  })

  const handleGetText = (name, value) => {
    setNewObjetivo({ ...newObjetivo, [name]: value });
  };

  return (
    <div className={"p-[10px]"} onClick={() => openModal()}>
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
      <Modal
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        open={isOpen}
        onClose={closeModal}
      >
        <div className="p-[20px] overflow-scroll w-11/12 h-5/6 bg-white">
          <Box
            display={"flex"}
            component={"button"}
            onClick={() => closeModal()}
            flexDirection={"row"}
            marginBottom={"20px"}
            alignItems={"center"}
            gap={"10px"}
          >
            <KeyboardArrowLeftIcon />
            <p className="text-azulMarino text-[16px] font-medium ">
              Detalles del <b>objetivo</b>
            </p>
          </Box>
          <form>
            <TextField
              label={"Fecha"}
              defaultValue={"2019-09-18"}
              type="date"
            />
            <TextField
              label={"Último monto registrado"}
              defaultValue="144"
              type="number"
            />
            <TextField
              label={"Titulo"}
              defaultValue="Spotify Subscr."
              type="text"
            />
            <TextField
              label={"Descripcion"}
              defaultValue="Subscription"
              type="text"
            />

            <div>
              <p className="text-GrisLabel text-[12px] mb-1">Categoria</p>
              <select
                required
                defaultValue={"Entretenimiento"}
                className="w-full focus:bg-white h-[48px] placeholder:font-light p-[10px] text-NegroInputs outline-1 outline-Gris rounded bg-[#F7F7F7]"
              >
                <option>Comida</option>
                <option>Entretenimiento</option>
                <option>Transporte</option>
                <option>Cultura</option>
                <option>Regalos</option>
                <option>Educacion</option>
                <option>Ropa</option>
                <option>Mantenimiento del hogar</option>
                <option>Productos de belleza</option>
                <option>Otro</option>
              </select>
            </div>

            <div>
              <p className="text-GrisLabel text-[12px] mb-1">Cuenta</p>
              <select
                required
                className="w-full focus:bg-white h-[48px] placeholder:font-light p-[10px] text-NegroInputs outline-1 outline-Gris rounded bg-[#F7F7F7]"
              >
                <option>Cuenta bancaria</option>
                <option>Efectivo</option>
                <option>Tarjeta de credito</option>
              </select>
            </div>
            <div className="flex items-center justify-center gap-5 flex-col mt-[40px]">
              <Button value={"Editar"} type="contained" />
              <Button value={"Eliminar"} />
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default CardObjetive;
