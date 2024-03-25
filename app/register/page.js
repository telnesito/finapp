'use client'

import React from 'react'
import TextField from '../components/TextField'
import Button from '../components/Button'
import { useRouter } from 'next/navigation'
const Page = () => {

  const router = useRouter()
  return (
    <div className='p-5 gap-[50px] min-h-[700px] flex flex-col items-center justify-center h-screen animate-fade-aparecer'>

      <p className='font-semibold text-[24px] text-azulMarino'>Bienvenido !</p>

      <div className='flex flex-col gap-3 w-full max-w-[700px]'>
        <TextField type='text' label={'Nombre completo'} />
        <TextField type='email' label={'Correo electronico'} />
        <TextField type='password' label={'Contraseña'} />
      </div>
      <div className='flex gap-2 items-start w-full max-w-[700px]'>
        <input id='check' name='check' type='checkbox'></input>
        <label className='text-azulMarino font-medium text-[12px]' htmlFor='check'>Ya leí y acepto los <span className='underline'>
          términos y condiciones
        </span></label>
      </div>

      <div className='flex flex-col md:flex-row gap-[15px]'>
        <Button onClick={() => router.push('/accountcreated')} value={'Crear cuenta'} type='contained' />
        <Button onClick={() => router.push('/')} value={'Ir al tutorial'} type='outlined' />
      </div>

      <p className='text-azulMarino'>Ya te has creado una cuenta ? <span onClick={() => router.push('/login')} className='text-azulMarino font-medium'>Inicia sesion</span></p>
    </div>
  )
}

export default Page