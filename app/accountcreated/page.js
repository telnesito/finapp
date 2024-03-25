'use client'
import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Button from '../components/Button'
const Page = () => {

  const router = useRouter()
  return (
    <div className='animate-fade-aparecer gap-7 p-7 flex flex-col items-center justify-center min-h-[700px] h-screen'>
      <h3 className='font-semibold text-azulMarino text-[24px]'>Cuenta creada</h3>
      <p className='text-center text-Gris font-light text-[14px]'>Tu cuenta ha sido registrada correctamente. Presiona continuar para iniciar sesión</p>
      <Image className='mb-[20px] mt-[20px]' alt='Cuenta creada' src={'cuentacreada.svg'} width={217} height={217} />
      <Button onClick={() => router.push('/home')} value={'Continuar'} type='contained' />

      <p className='text-center text-azulMarino font-light text-[12px]'>Al clickear continuar estará aceptando nuestros <br />

        <span className='cursor-pointer underline font-medium'>
          Terminos y Condiciones
        </span>
      </p>


    </div>
  )
}

export default Page