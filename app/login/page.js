'use client'
import React, { useState } from 'react'
import Button from '../components/Button'
import TextField from '../components/TextField'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { fugazOne } from '../utils/fuentes'
import { iniciarSesion } from '../firebase/auth/login'
import useLoading from '../customHooks/useLoading'
import useModal from '../customHooks/useModa'
import { Backdrop, CircularProgress } from '@mui/material'
import ErrorModal from '../components/ErrorModal'
const Page = () => {

  const { closeModal, isOpen, openModal } = useModal()
  const [errorDetected, setErrorDetected] = useState("")
  const [isLoading, setIsLoading] = useState(false)


  const [credenciales, setCredenciales] = useState({
    email: '', password: ''
  })

  const handleLogin = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    const res = await iniciarSesion(credenciales.email, credenciales.password)

    if (res.uid) router.push('/home')
    else {
      setErrorDetected(res)
      openModal()
    }

    setIsLoading(false)

  }

  const router = useRouter()
  // Manejo del valor de los inputs
  const handleGetText = (name, value) => {
    setCredenciales({ ...credenciales, [name]: value });
  };

  return (
    <div>

      <div className=' bg-azulMarino w-full h-[300px]'>
        <div className="flex flex-col pl-[30px] pt-[40px]">
          <Image alt="Imagen circular con simbolo de dolar" className="relative left-[80px]" width={39} height={39} src={'./logoIcon.svg'}></Image>
          <h1 className={`text-Blanco text-[46px] ${fugazOne.className}`}>FINAPP</h1>
        </div>
        <div className='flex justify-between'>
          <Image alt="Imagen de login1" className="relative bottom-[35px]" width={100} height={100} src={'./layer1.svg'}></Image>

          <Image alt="Imagen de login2" className="relative bottom-[60px]" width={164} height={164} src={'./layer2.svg'}></Image>
        </div>
      </div>
      <form onSubmit={(e) => handleLogin(e)}>
        <div className='p-5 gap-[50px] min-h-[550px] flex flex-col items-center justify-center animate-fade-aparecer'>
          <p className='font-semibold text-[24px] text-azulMarino'>Bienvenido de vuelta!</p>

          <div className='flex flex-col gap-3 w-full max-w-[700px]'>
            <TextField defaultValue={credenciales.email} onChange={(value) => handleGetText('email', value)} type='email' label={'Correo electronico'} />
            <TextField defaultValue={credenciales.password} onChange={(value) => handleGetText('password', value)} type='password' label={'Contraseña'} />

            <p className='text-Gris text-right w-full text-[12px] '>Contraseña olvidada?</p>
          </div>

          <div className='flex flex-col md:flex-row gap-[15px]'>
            <Button value={'Iniciar sesion'} type='contained' />
          </div>

          <p className='text-azulMarino'>No tienes cuenta? <span onClick={() => router.push('/register')} className='text-azulMarino font-medium'>Registrate</span></p>
        </div>
      </form>

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}

      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <ErrorModal closeModal={closeModal} isOpen={isOpen} text={errorDetected} />
    </div>
  )
}

export default Page