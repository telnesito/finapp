import Image from "next/image";
import React, { useState } from "react";
import useModal from "../customHooks/useModa";
import { Backdrop, Box, CircularProgress, Modal } from "@mui/material";
import TextField from "./TextField";
import Button from "./Button";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { eliminarObjetivo } from "../firebase/firestore/deleteObjetive";
import { actualizarObjetive } from "../firebase/firestore/updateObjetive";
import DynamicIcon from "./DynamicIcon";

const CardObjetive = ({ title, description, date, total, current, state, category, id, percentaje }) => {
  // Calcular el porcentaje de progreso
  const progress = Math.floor((current / total) * 100);
  const { closeModal, isOpen, openModal } = useModal();

  const [isLoading, setIsLoading] = useState(false)

  const fecha = new Date(date)
  // To do: Pasar a constantes en otro archivo
  const meses = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];


  const [objetivo, setObjetivo] = useState({
    fecha: date,
    meta: total,
    saldoActual: current,
    titulo: title,
    categoria: category,
    descripcion: description,
    estado: 1
  })

  const handleGetText = (name, value) => {
    setObjetivo({ ...objetivo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault()

    setIsLoading(true)
    console.log(id)
    try {
      const res = await actualizarObjetive(id, objetivo,)
      console.log(res)

      setIsLoading(false)

    } catch (error) {
      console.log(error)
    }

  }

  const handleDelete = async (e) => {
    setIsLoading(true)
    try {
      const res = await eliminarObjetivo(id)
      console.log(res)

      setIsLoading(false)

    } catch (error) {
      console.log(error)
    }

  }

  return (
    <div className={"p-[10px]"} onClick={() => openModal()}>
      <div className="flex justify-between">
        <div className="flex h-[55px]  gap-[15px] ">
          <DynamicIcon cat={category} />


          <div>
            {/* Título y descripción de la deuda */}
            <p className="text-[16px] text-azulMarino font-medium">
              {title.slice(0, 25)}
            </p>
            <p className="text-gray-300 text-[12px]">
              {description.slice(0, 25)}...
            </p>
          </div>
        </div>
        <div className="flex flex-col ">
          {/* Mostrar el progreso */}
          {percentaje === 100 ? (
            <>
              <strike className={`text-black text-[16px] text-right`}>
                {percentaje + "%"}
              </strike>
              <p className="text-gray-300 text-[12px] text-right">{fecha.getDate() + " " + meses[fecha.getMonth()] + " " + fecha.getFullYear()}</p>
            </>
          ) : (
            <>
              <p className={`text-black-400 text-[16px] text-right`}>
                {percentaje + "%"}
              </p>
              <p className="text-gray-300 text-[12px] text-right">{fecha.getDate() + " " + meses[fecha.getMonth()] + " " + fecha.getFullYear()}</p>
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
        <div className="p-[20px] rounded-lg overflow-scroll w-11/12 h-5/6 bg-white">
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
          <form onSubmit={(e) => handleSubmit(e)}>
            <TextField
              label={"Fecha"}
              defaultValue={objetivo.fecha}
              type="date"
              onChange={(value) => handleGetText('fecha', value)}
            />

            <TextField
              label={"Titulo"}
              defaultValue={objetivo.titulo}
              type="text"
              onChange={(value) => handleGetText('titulo', value)}
            />
            <TextField
              label={"Descripcion"}
              defaultValue={objetivo.descripcion}
              type="text"
              onChange={(value) => handleGetText('descripcion', value)}
            />

            <TextField min={0} onChange={(value) => handleGetText('meta', value)} defaultValue={objetivo.meta} label={'Total objetivo'} type='number'></TextField>

            <TextField onChange={(value) => handleGetText('saldoActual', value)} defaultValue={objetivo.saldoActual} label={'Saldo actual ($)'} min={0} type='number'></TextField>




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

            <div className="flex items-center justify-center gap-5 flex-col mt-[40px]">
              <Button value={"Editar"} type="contained" />
            </div>
          </form>
          <div className="flex items-center justify-center mt-3">

            <Button onClick={(e) => handleDelete(e)} value={"Eliminar"} />
          </div>
          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={isLoading}

          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </div>



      </Modal>
    </div>
  );
};

export default CardObjetive;
