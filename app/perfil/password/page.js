'use client'
import React from 'react'
import { useRouter } from 'next/navigation';
import BackPage from '@/app/components/BackPage';

const Page = () => {
  const router = useRouter()

  return (
    <div className='pl-[20px] mt-[20px] pr-[20px]'>
      <BackPage destino={'perfil'} paginaActual={'Cambiar contraseña'} />


    </div>
  )
}

export default Page