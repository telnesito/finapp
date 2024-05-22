import React, { useState } from 'react'
import TextField from './TextField'
import Button from './Button'
import { Backdrop, CircularProgress } from '@mui/material'
import SuccesfullModal from './SuccesfullModal'
import { useUser } from '../customHooks/UserContext'
import { agregarIngreso } from '../firebase/firestore/AddIngreso'
import { obtenerUsuario } from '../firebase/auth/currentSesion'
import { getUserProfile } from '../firebase/firestore/getProfileFromDb'
import useModal from '../customHooks/useModa'

const Pagos = () => {
  const { userProfile, setUserProfile } = useUser()

  const { isOpen, openModal, closeModal } = useModal()
  const [isLoading, setIsLoading] = useState(false)
  const handleGetText = (name, value) => {
    setNewPago({ ...newPago, [name]: value });
  };

  const [newPago, setNewPago] = useState({
    fecha: '',
    importe: '',
    titulo: '',
    categoria: 'Comida',
    cuenta: 'Cuentas',
    descripcion: '',
    tipo: 2
  })

  const handleSubmitPago = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {


      const res = await agregarIngreso(newPago)
      const userFromFireStore = await getUserProfile(obtenerUsuario().uid)
      setUserProfile(userFromFireStore)
      setIsLoading(false)
      setNewPago({
        fecha: '',
        importe: '',
        titulo: '',
        categoria: 'Comida',
        cuenta: 'Cuentas',
        descripcion: '',
        tipo: 2
      })
      openModal()

    } catch (error) {
      console.log(error)
    }


  }

  return (
    <form onSubmit={(e) => handleSubmitPago(e)} className='animate-fade-aparecer mt-[15px] flex flex-col gap-2 '>
      <TextField onChange={(value) => handleGetText('fecha', value)} defaultValue={newPago.fecha} label={'Fecha'} type='date' />
      <TextField max={0} onChange={(value) => handleGetText('importe', value)} defaultValue={newPago.importe} label={'Importe'} type='number' />
      <TextField onChange={(value) => handleGetText('titulo', value)} defaultValue={newPago.titulo} label={'Titulo'} type='text' />
      <div>

        <p className='text-GrisLabel text-[12px] mb-1'>Categoria</p>
        <select value={newPago.categoria} onChange={({ target }) => handleGetText('categoria', target.value)} required className='w-full focus:bg-white h-[48px] placeholder:font-light p-[10px] text-NegroInputs outline-1 outline-Gris rounded bg-[#F7F7F7]'>
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
        </select>
      </div>

      <div>
        <p className='text-GrisLabel text-[12px] mb-1'>Cuenta</p>
        <select value={newPago.cuenta} onChange={({ target }) => handleGetText('cuenta', target.value)} required className='w-full focus:bg-white h-[48px] placeholder:font-light p-[10px] text-NegroInputs outline-1 outline-Gris rounded bg-[#F7F7F7]'>
          <option >Cuentas</option>
          <option>Efectivo</option>
          <option>Tarjeta de credito</option>
        </select>
      </div>
      <p className='text-GrisLabel text-[12px]'>Descripcion</p>
      <textarea required value={newPago.descripcion}
        onChange={({ target }) => handleGetText('descripcion', target.value)} className='w-full focus:bg-white  placeholder:font-light p-[10px] text-NegroInputs outline-1 outline-Gris rounded bg-[#F7F7F7]' placeholder='Descripcion' cols={'20'} rows={'2'} />

      <div className='mt-4 flex items-center w-full justify-center'>
        <Button value={'Guardar'} type='contained' />
      </div>
      <SuccesfullModal closeModal={closeModal} text={'Se ha registrado un pago correctamente'} isOpen={isOpen} />

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}

      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </form>
  )
}

export default Pagos