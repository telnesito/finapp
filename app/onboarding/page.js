'use client'
import React from 'react'
import Image from 'next/image'
import Button from '../components/Button'
const page = () => {
  return (
    <section className='pl-7 pr-7 h-screen min-h-max flex justify-center items-center'>
      <div className='flex flex-col items-center justify-center gap-6'>
        <Image alt='Imagen de onboard 1' width={252} height={227} src={'./onboard1.svg'}>

        </Image>
        <h1 className='font-semibold text-center text-azulMarino text-[30px] '>Gestiona tu balance</h1>
        <p className='text-center text-Gris'>Registra fácilmente tu entrada y salida de dinero  junto con su descripción, cantidad y fecha</p>

        <div className=' sm:flex-col flex flex-col lg:flex-row'>
          <Button type='contained' value={'Siguiente'} />

          <Button type='text' value={'Saltar todo'} />
        </div>
      </div>
    </section>
  )
}

export default page