'use client'

import BackPage from '@/app/components/BackPage'
import Button from '@/app/components/Button'
import TextField from '@/app/components/TextField'
import React from 'react'

const Page = () => {
  return (
    <div className='pl-[20px] mt-[20px] pr-[20px]'>
      <BackPage destino={'perfil'} paginaActual={'Cambiar correo electronico'} />

      <form className='flex flex-col gap-3' onSubmit={() => console.log('Hola mundo')}>
        <TextField type='email' label={'Correo electronico antiguo'} />
        <TextField type='email' label={'Correo electronico nuevo'} />
        <TextField type='email' label={'Confirmar correo electronico nuevo'} />

        <div className='flex items-center justify-center mt-4'>
          <Button value={'Confirmar cambio'} type='contained' />
        </div>
      </form>
    </div>
  )
}

export default Page