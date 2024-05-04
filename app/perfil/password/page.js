'use client'
import React from 'react'
import { useRouter } from 'next/navigation';
import BackPage from '@/app/components/BackPage';
import TextField from '@/app/components/TextField';
import Button from '@/app/components/Button';

const Page = () => {
  const router = useRouter()

  return (
    <div className='pl-[20px] mt-[20px] pr-[20px]'>
      <BackPage destino={'perfil'} paginaActual={'Cambiar contraseña'} />

      <form className='flex flex-col gap-3' onSubmit={() => console.log('Hola mundo')}>
        <TextField type='password' label={'Contraseña antigua'} />
        <TextField type='password' label={'Contraseña nueva'} />
        <TextField type='password' label={'Confirmar contraseña nueva'} />

        <div className='flex items-center justify-center mt-4'>
          <Button value={'Confirmar cambio'} type='contained' />
        </div>
      </form>
    </div>
  )
}

export default Page