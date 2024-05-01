'use client'

import React from 'react'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
const CardProfile = ({ Icon, text, onClick }) => {
  return (
    <button onClick={onClick} className='flex items-center drop-shadow-sm bg-white p-2 h-[80px] text-left rounded-2xl justify-between'>
      <div className='p-2 items-center flex justify-center h-[50px] w-[50px] rounded-full bg-[#F1EDFF]'>
        <Icon className='text-azulMarino text-[30px]' />
      </div>
      <p className='text-[#666666] w-[260px] font-normal text-[16px]'>{text}</p>
      <KeyboardArrowRightIcon className='text-Gris' />
    </button>
  )
}

export default CardProfile