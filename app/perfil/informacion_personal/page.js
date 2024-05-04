'use client'

import BackPage from '@/app/components/BackPage'
import Button from '@/app/components/Button'
import TextField from '@/app/components/TextField'
import React from 'react'

const Page = () => {
  return (
    <div className='pl-[20px] mt-[20px] pr-[20px]'>
      <BackPage destino={'perfil'} paginaActual={'Cambiar informacion personal'} />

      <form className='flex flex-col gap-3' onSubmit={() => console.log('Hola mundo')}>
        <TextField type='file' label={'Foto de perfil'} />
        <TextField type='text' label={'Usuario'} />
        <TextField type='text' label={'Nombre'} />
        <TextField type='text' label={'Apellido'} />

        <div className='flex items-center justify-center mt-4'>
          <Button value={'Confirmar cambio'} type='contained' />
        </div>
      </form>
    </div>
  )
}

export default Page