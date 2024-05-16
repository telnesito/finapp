import Image from "next/image";
import React, { use, useState } from "react";
import useModal from "../customHooks/useModa";
import { Backdrop, Box, CircularProgress, Modal } from "@mui/material";
import TextField from "./TextField";
import Button from "./Button";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { eliminarDeuda } from "../firebase/firestore/deleteDeuda";
import SuccesfullModal from "./SuccesfullModal";

const CardDebts = ({ title, description, date, total, category, id, completada }) => {
  const { closeModal, isOpen, openModal } = useModal();
  const [isLoading, setIsLoading] = useState(false)
  const confirmDelete = useModal()
  const fecha = new Date(date)
  // To do: Pasar a constantes en otro archivo
  const meses = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];


  const handleDelete = async () => {
    setIsLoading(true)
    try {
      const res = await eliminarDeuda(id)
      confirmDelete.openModal()
      setIsLoading(false)

      console.log(res)
    } catch (error) {
      console.log(error)
    }

  }

  return (
    <div className="p-[10px]" onClick={() => openModal()}>
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
            <p className="text-[16px] text-azulMarino font-medium">
              {title.slice(0, 25)}
            </p>
            <p className="text-gray-300 text-[12px]">
              {description.slice(0, 25)}
            </p>
          </div>
        </div>
        <div className="flex flex-col ">
          {completada ? (
            <>
              <strike className={`text-black text-[16px] text-right`}>
                {total > 0 ? total + "$" : total + "$"}
              </strike>
              <p className="text-gray-300 text-[12px] text-right">{fecha.getDate() + " " + meses[fecha.getMonth()] + " " + fecha.getFullYear()}</p>
            </>
          ) : (
            <>
              <p className={`text-red-400 text-[16px] text-right`}>
                {total > 0 ? total + "$" : total + "$"}
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
        <div className="p-[20px] rounded-xl overflow-scroll w-11/12 h-5/6 bg-white">
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
              Detalle de <b>deuda</b>
            </p>
          </Box>
          <form>
            <TextField
              label={"Fecha"}
              defaultValue={fecha}
              type="date"
            />
            <TextField label={"Importe"} defaultValue={total} type="number" />
            <TextField
              label={"Titulo"}
              defaultValue={title}
              type="text"
            />
            <TextField
              label={"Descripcion"}
              defaultValue={description}
              type="text"
            />

            <div>
              <p className="text-GrisLabel text-[12px] mb-1">Categoria</p>
              <select
                required
                value={category}
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
            </div>
          </form>
          <div className="flex items-center justify-center mt-5">

            <Button onClick={() => handleDelete()} value={"Eliminar"} />
          </div>
          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={isLoading}

          >
            <CircularProgress color="inherit" />
          </Backdrop>
          <SuccesfullModal closeModal={confirmDelete.closeModal} text={'Se ha eliminado una deuda correctamente'} isOpen={confirmDelete.isOpen} />


        </div>
      </Modal>
    </div>
  );
};

export default CardDebts;
