'use client'

import BackPage from '@/app/components/BackPage'
import Button from '@/app/components/Button'
import SuccesfullModal from '@/app/components/SuccesfullModal'
import TextField from '@/app/components/TextField'
import useModal from '@/app/customHooks/useModa'
import { actualizarEmail } from '@/app/firebase/auth/updateEmail'
import { Backdrop, CircularProgress } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import { resolve } from 'styled-jsx/css'
const Page = () => {
  const { isOpen, closeModal, openModal } = useModal()
  const [isLoading, setIsLoading] = useState(false)

  const [newEmail, setNewEmail] = useState('')
  const [confirmEmail, setConfirmEmail] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    setIsLoading(true)
    try {
      if (newEmail === confirmEmail) {
        const res = await actualizarEmail(newEmail)
        console.log(res)
        openModal()
        setIsLoading(false)

      } else {
        setIsLoading(false)

        throw new Error('El correo no es el mismo')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='pl-[20px] mt-[20px] pr-[20px]'>
      <BackPage destino={'perfil'} paginaActual={'Cambiar correo electronico'} />

      <form className='flex flex-col gap-3' onSubmit={(e) => handleSubmit(e)}>
        <TextField defaultValue={newEmail} onChange={(value) => setNewEmail(value)} type='email' label={'Correo electronico nuevo'} />
        <TextField defaultValue={confirmEmail} onChange={(value) => setConfirmEmail(value)} type='email' label={'Confirmar correo electronico nuevo'} />

        <div className='flex items-center justify-center mt-4'>
          <Button value={'Confirmar cambio'} type='contained' />
        </div>
      </form>

      <SuccesfullModal closeModal={closeModal} isOpen={isOpen} text={"Correo electronico actualizado correctamente"} />
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