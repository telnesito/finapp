'use client'

import BackPage from '@/app/components/BackPage'
import Button from '@/app/components/Button'
import SuccesfullModal from '@/app/components/SuccesfullModal'
import TextField from '@/app/components/TextField'
import useModal from '@/app/customHooks/useModa'
import { actualizarPerfil } from '@/app/firebase/auth/updateProfile'
import { Backdrop, CircularProgress } from '@mui/material'
import React from 'react'
import { useState } from 'react'
const Page = () => {

  const { isOpen, closeModal, openModal } = useModal()
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState({
    nombre: '',
    apellido: ''

  })

  const handleGetText = (name, value) => {
    setUser({ ...user, [name]: value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setIsLoading(true)
      await actualizarPerfil(user)
      openModal()

      setIsLoading(false)

    } catch (error) {
      console.log(error)
    }

  }
  return (
    <div className='pl-[20px] mt-[20px] pr-[20px]'>
      <BackPage destino={'perfil'} paginaActual={'Cambiar informacion personal'} />

      <form onSubmit={(e) => handleSubmit(e)} className='flex flex-col gap-3' >
        {/* <TextField type='file' label={'Foto de perfil'} /> */}
        {/* <TextField type='text' label={'Usuario'} /> */}
        <TextField
          onChange={(value) => handleGetText('nombre', value)}
          defaultValue={user.nombre}
          type='text' label={'Nombre'} />
        <TextField
          onChange={(value) => handleGetText('apellido', value)}
          defaultValue={user.apellido}
          type='text' label={'Apellido'} />

        <div className='flex items-center justify-center mt-4'>
          <Button value={'Confirmar cambio'} type='contained' />
        </div>
      </form>

      <SuccesfullModal closeModal={closeModal} isOpen={isOpen} text={"Nombre del perfil actualizado correctamente"} />
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}

      >
        <CircularProgress color="inherit" />
      </Backdrop>

    </div>
  )
}

export default Page