'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import BackPage from '@/app/components/BackPage';
import TextField from '@/app/components/TextField';
import Button from '@/app/components/Button';
import { actualizarContra } from '@/app/firebase/auth/updatePassword';
import SuccesfullModal from '@/app/components/SuccesfullModal';
import { Backdrop, CircularProgress } from '@mui/material';
import useModal from '@/app/customHooks/useModa';

const Page = () => {
  const router = useRouter()
  const { isOpen, closeModal, openModal } = useModal()
  const [isLoading, setIsLoading] = useState(false)
  const [newPassword, SetNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const handleSubmit = async (e) => {
    e.preventDefault()


    try {
      setIsLoading(true)
      if (newPassword === confirmPassword) {

        await actualizarContra(newPassword)
        openModal()
        setIsLoading(false)
      }
      else {
        console.log("No son iguales")
        setIsLoading(false)

      }

    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className='pl-[20px] mt-[20px] pr-[20px]'>
      <BackPage destino={'perfil'} paginaActual={'Cambiar contraseña'} />

      <form className='flex flex-col gap-3' onSubmit={(e) => handleSubmit(e)}>
        <TextField defaultValue={newPassword} onChange={(value) => SetNewPassword(value)} type='password' label={'Contraseña nueva'} />
        <TextField defaultValue={confirmPassword} onChange={(value) => setConfirmPassword(value)} type='password' label={'Confirmar contraseña nueva'} />

        <div className='flex items-center justify-center mt-4'>
          <Button value={'Confirmar cambio'} type='contained' />
        </div>
      </form>


      <SuccesfullModal closeModal={closeModal} isOpen={isOpen} text={"Contraseña actualizado correctamente"} />
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