import React from 'react'

const Button = ({ value, type = 'outlined', onClick = () => true }) => {
  const handleClick = () => {
    onClick();
  };

  const styleButton = type === 'contained' ? 'text-Blanco bg-azulMarino' : type === 'outlined' ? 'border border-azulMarino' : 'text-azulMarino underline'

  return (
    <button type='submit' className={`rounded-full h-[56px] w-[327px] font-semibold  ${styleButton}`} onClick={handleClick}>{value}</button>
  )
}

export default Button

