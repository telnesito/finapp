import React, { useState } from 'react'
import useModal from '../customHooks/useModa'
import { Backdrop, Box, CircularProgress, Modal } from '@mui/material'
import TextField from './TextField'
import Button from './Button'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { actualizarTransaccion } from '../firebase/firestore/updateTransaction'
import { eliminarTransaccion } from '../firebase/firestore/deleteTransaction'
import DynamicIcon from './DynamicIcon'
import { formatearNumero } from '../utils/formatearNumeros'
import { UserProvider, useUser } from '../customHooks/UserContext'
import { getUserProfile } from '../firebase/firestore/getProfileFromDb'
import { obtenerUsuario } from '../firebase/auth/currentSesion'
const CardInOut = ({ title, description, amounth, category, date, account, tipo, id }) => {

  const { isOpen, openModal, closeModal } = useModal()
  const [isLoading, setIsLoading] = useState(false)

  const { userProfile, setUserProfile } = useUser()

  const handleGetText = (name, value) => {
    SetUpdatedFields({ ...updatedFields, [name]: value });
  };


  const [updatedFields, SetUpdatedFields] = useState({
    fecha: date,
    importe: amounth,
    titulo: title,
    categoria: category,
    cuenta: account,
    descripcion: description,
    tipo: tipo
  })

  const fecha = new Date(date)
  // To do: Pasar a constantes en otro archivo
  const meses = [
    "Ene",
    "Feb",
    "Mar",
    "Abr",
    "May",
    "Jun",
    "Jul",
    "Ago",
    "Sep",
    "Oct",
    "Nov",
    "Dic",
  ];

  const handleDelete = async (id) => {
    closeModal()
    setIsLoading(true)

    try {
      await eliminarTransaccion(id)
      const userFromFireStore = await getUserProfile(obtenerUsuario().uid)
      setUserProfile(userFromFireStore)

      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }


  const handleUpdate = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {

      const res = await actualizarTransaccion(id, updatedFields)
      const userFromFireStore = await getUserProfile(obtenerUsuario().uid)
      setUserProfile(userFromFireStore)
      setIsLoading(false)


    } catch (error) {
      console.log(error)
    }
  }
  return (
    <UserProvider>

      <div className={"p-[10px]"} onClick={() => openModal()}>
        <div className="flex justify-between">
          <div className="flex h-[55px] gap-[15px] ">
            <DynamicIcon cat={category} />
            <div>
              <p className="text-[16px] text-azulMarino font-medium">{title.slice(0, 20)}</p>
              <p className="text-gray-300 text-[12px]">{description.slice(0, 20)}...</p>
            </div>
          </div>
          <div>
            {amounth > 0 ? (
              <p className="text-green-600 text-[16px] text-right">+{formatearNumero(amounth)}$</p>
            ) : (
              <p className="text-red-400 text-[16px] text-right">{formatearNumero(amounth)}$</p>
            )}
            <p className="text-gray-300 text-[12px] text-right">
              {fecha.getDate() +
                " " +
                meses[fecha.getMonth()] +
                " " +
                fecha.getFullYear()}
            </p>
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
              {tipo === 1 ?
                <p className='text-azulMarino text-[16px] font-medium '>Detalle de <b>ingreso</b></p>
                :
                <p className='text-azulMarino text-[16px] font-medium '>Detalle de <b>pago</b></p>
              }
            </Box>
            <form onSubmit={(e) => handleUpdate(e)}>
              <TextField onChange={(value) => handleGetText('fecha', value)} label={'Fecha'} defaultValue={updatedFields.fecha} type='date' />
              <TextField label={'Importe ($)'} onChange={(value) => handleGetText('importe', value)} defaultValue={updatedFields.importe} type='number' />
              <TextField onChange={(value) => handleGetText('titulo', value)} defaultValue={updatedFields.titulo} label={'Titulo'} type='text' />
              <TextField label={'Descripcion'} onChange={(value) => handleGetText('descripcion', value)} defaultValue={updatedFields.descripcion} type='text' />

              <div>
                <p className='text-GrisLabel text-[12px] mb-1'>Categoria</p>
                <select required value={updatedFields.categoria} onChange={({ target }) => handleGetText('categoria', target.value)} className='w-full focus:bg-white h-[48px] placeholder:font-light p-[10px] text-NegroInputs outline-1 outline-Gris rounded bg-[#F7F7F7]'>

                  {tipo === 1 ?

                    <>
                      <option >Salario</option>
                      <option>Freelance</option>
                      <option>Dinero extra</option>
                      <option>Plus</option>
                      <option>Otro</option>
                    </>
                    :
                    <>
                      <option >Comida</option>
                      <option>Entretenimiento</option>
                      <option>Transporte</option>
                      <option>Cultura</option>
                      <option>Regalos</option>
                      <option>Educacion</option>
                      <option>Ropa</option>
                      <option>Mantenimiento del hogar</option>
                      <option>Productos de belleza</option>
                      <option>Otro</option>
                    </>

                  }
                </select>
              </div>

              <div>
                <p className='text-GrisLabel text-[12px] mb-1'>Cuenta</p>
                <select required value={updatedFields.cuenta}
                  onChange={({ target }) => handleGetText('cuenta', target.value)} className='w-full focus:bg-white h-[48px] placeholder:font-light p-[10px] text-NegroInputs outline-1 outline-Gris rounded bg-[#F7F7F7]'>
                  <option >Cuentas</option>
                  <option>Efectivo</option>
                  <option>Tarjeta de credito</option>
                </select>
              </div>
              <div className='flex items-center justify-center gap-5 flex-col mt-[40px]'>
                <Button value={'Editar'} type='contained' />
              </div>
            </form>
            <div className='flex items-center justify-center mt-[10px]'>
              <Button onClick={() => handleDelete(id)} value={'Eliminar'} />

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
    </UserProvider>
  );
};

export default CardInOut;
