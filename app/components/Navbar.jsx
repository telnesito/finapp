'use client'
import React from 'react'

import { NAVBAR } from '../utils/constantes';
const Navbar = () => {

  return (
    <div className='flex gap-[10px] fixed w-full h-[72px] items-center justify-evenly bottom-0 bg-white'>

      {NAVBAR.map(({ page, icon: Icon }, index) =>

        <button key={index} type='button' className='active:bg-[#00000010] transition-all w-[60px] p-2 rounded flex flex-col items-center '>
          <Icon className='text-azulMarino' size={'25px'} />
          <p className='text-[10px]'>{page}</p>
        </button>
      )}


    </div>

  )
}

export default Navbar