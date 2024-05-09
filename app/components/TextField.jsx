'use client'

import React from 'react'

const TextField = ({ defaultValue = '', label, type = 'text', onChange = () => console.log('Hola mundo') }) => {

  const handleChange = () => {
    onChange();
  };

  return (
    <div className='flex flex-col gap-1'>
      <label className='text-GrisLabel text-[12px]' htmlFor='input'>{label}</label>
      <input required placeholder={label} value={defaultValue} onChange={handleChange} name='input' id='input' className='focus:bg-white h-[48px] placeholder:font-light p-[10px] text-NegroInputs outline-1 outline-Gris rounded bg-[#F7F7F7]' type={type} ></input>
    </div>
  )
}

export default TextField