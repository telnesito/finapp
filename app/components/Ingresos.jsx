'use client'

import React, { useState } from 'react'
import TextField from './TextField'
import Button from './Button'
import { agregarIngreso } from '../firebase/firestore/AddIngreso'
import useModal from '../customHooks/useModa'
import SuccesfullModal from './SuccesfullModal'
import { Backdrop, CircularProgress } from '@mui/material'
import { obtenerUsuario } from '../firebase/auth/currentSesion'
import { useUser } from '../customHooks/UserContext'
import { getUserProfile } from '../firebase/firestore/getProfileFromDb'

const Ingresos = () => {
  const { userProfile, setUserProfile } = useUser()

  const { isOpen, openModal, closeModal } = useModal()
  const [isLoading, setIsLoading] = useState(false)

  const [newIngreso, setNewIngreso] = useState({
    fecha: '',
    importe: '',
    titulo: '',
    categoria: 'Salario',
    cuenta: 'Cuentas',
    descripcion: ''
  })

  const handleGetText = (name, value) => {
    setNewIngreso({ ...newIngreso, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {

      const res = await agregarIngreso(newIngreso)
      const userFromFireStore = await getUserProfile(obtenerUsuario().uid)
      setUserProfile(userFromFireStore)
      setIsLoading(false)
      setNewIngreso({
        fecha: '',
        importe: '',
        titulo: '',
        categoria: 'Salario',
        cuenta: 'Cuentas',
        descripcion: ''
      })
      openModal()

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)} className='animate-fade-aparecer mt-[15px] flex flex-col gap-2 '>
      <TextField defaultValue={newIngreso.fecha} onChange={(value) => handleGetText('fecha', value)} label={'Fecha'} type='date' />
      <TextField defaultValue={newIngreso.importe} onChange={(value) => handleGetText('importe', value)} label={'Importe'} type='number' />
      <TextField defaultValue={newIngreso.titulo} onChange={(value) => handleGetText('titulo', value)} label={'Titulo'} type='text' />

      <div>
        <p className='text-GrisLabel text-[12px] mb-1'>Categoria</p>
        <select value={newIngreso.categoria} onChange={({ target }) => handleGetText('categoria', target.value)} required className='w-full focus:bg-white h-[48px] placeholder:font-light p-[10px] text-NegroInputs outline-1 outline-Gris rounded bg-[#F7F7F7]'>
          <option >Salario</option>
          <option>Freelance</option>
          <option>Dinero extra</option>
          <option>Plus</option>
          <option>Otro</option>
        </select>
      </div>

      <div>
        <p className='text-GrisLabel text-[12px] mb-1'>Cuenta</p>
        <select value={newIngreso.cuenta} onChange={({ target }) => handleGetText('cuenta', target.value)} required className='w-full focus:bg-white h-[48px] placeholder:font-light p-[10px] text-NegroInputs outline-1 outline-Gris rounded bg-[#F7F7F7]'>
          <option defaultChecked >Cuentas</option>
          <option>Efectivo</option>
          <option>Tarjeta de credito</option>
        </select>
      </div>
      <p className='text-GrisLabel text-[12px]'>Descripcion</p>
      <textarea value={newIngreso.descripcion} onChange={({ target }) => handleGetText('descripcion', target.value)} required className='w-full focus:bg-white  placeholder:font-light p-[10px] text-NegroInputs outline-1 outline-Gris rounded bg-[#F7F7F7]' placeholder='Descripcion' cols={'20'} rows={'4'} />
      <div className='mt-4 flex items-center w-full justify-center'>
        <Button value={'Guardar'} type='contained' />
      </div>
      <SuccesfullModal closeModal={closeModal} text={'Se ha registrado un ingreso correctamente'} isOpen={isOpen} />

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}

      >
        <CircularProgress color="inherit" />
      </Backdrop>

    </form>
  )
}

export default Ingresos