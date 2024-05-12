'use client'
import React, { useState } from 'react'
import TextField from '../components/TextField'
import Button from '../components/Button'
import { useRouter } from 'next/navigation'
import { registrarUsuario } from '../firebase/auth/register'
import useModal from '../customHooks/useModa'
import { Backdrop, CircularProgress } from '@mui/material'
import ErrorModal from '../components/ErrorModal'

const Page = () => {
  const router = useRouter()

  const { isOpen, closeModal, openModal } = useModal()
  const [errorRecived, setErrorRecived] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [newUser, setNewUser] = useState({
    email: '', password: '', username: ''
  })
  // Manejo del valor de los inputs
  const handleGetText = (name, value) => {
    setNewUser({ ...newUser, [name]: value });
  };

  // Manejo del registro
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    const res = await registrarUsuario(newUser.email, newUser.password, newUser.username)
    console.log(res)
    setIsLoading(false)
    if (res.uid) router.push('accountcreated')
    else {
      // ErrorRecived es el objeto error que viene de firebase
      setErrorRecived(res.code)
      openModal()
    }
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div className='p-5 gap-[50px] min-h-[700px] flex flex-col items-center justify-center h-screen animate-fade-aparecer'>

        <p className='font-semibold text-[24px] text-azulMarino'>Bienvenido !</p>
        <div className='flex flex-col gap-3 w-full max-w-[700px]'>
          <TextField defaultValue={newUser.username} onChange={(value) => handleGetText('username', value)} type='text' label={'Nombre completo'} />
          <TextField defaultValue={newUser.email} onChange={(value) => handleGetText('email', value)} type='email' label={'Correo electronico'} />
          <TextField defaultValue={newUser.password} onChange={(value) => handleGetText('password', value)} type='password' label={'Contraseña'} />
        </div>
        <div className='flex gap-2 items-start w-full max-w-[700px]'>
          <input required id='check' name='check' type='checkbox'></input>
          <label className='text-azulMarino font-medium text-[12px]' htmlFor='check'>Ya leí y acepto los <span className='underline'>
            términos y condiciones
          </span></label>
        </div>

        <div className='flex flex-col md:flex-row gap-[15px]'>
          <Button value={'Crear cuenta'} type='contained' />
          <Button onClick={() => router.push('/')} value={'Ir al tutorial'} type='outlined' />
        </div>

        <p className='text-azulMarino'>Ya te has creado una cuenta ? <span onClick={() => router.push('/login')} className='text-azulMarino font-medium'>Inicia sesion</span></p>
      </div>

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}

      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <ErrorModal closeModal={closeModal} text={errorRecived} isOpen={isOpen} openModal={openModal} />
    </form>
  )
}

export default Page