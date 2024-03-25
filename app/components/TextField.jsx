'use client'

import React from 'react'

const TextField = ({ label, onChange }) => {

  const handleChange = () => {
    onChange();
  };

  return (
    <div className='flex flex-col gap-1'>
      <label className='text-GrisLabel text-[12px]' htmlFor='input'>{label}</label>
      <input onChange={handleChange} name='input' id='input' className='active:bg-white p-[10px] text-NegroInputs outline-1 outline-Gris rounded bg-[#F7F7F7]' type='text' ></input>
    </div>
  )
}

export default TextField