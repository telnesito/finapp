'use client'

import BackPage from '@/app/components/BackPage'
import React from 'react'

const Page = () => {
  return (
    <div className='pl-[20px] mt-[20px] pr-[20px]'>
      <BackPage destino={'perfil'} paginaActual={'Cambiar informacion personal'} />
    </div>
  )
}

export default Page