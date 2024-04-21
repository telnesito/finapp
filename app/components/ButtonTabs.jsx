'use client'
import React from 'react'

const ButtonTabs = ({ text, isActive, onClick }) => {


  const ACTIVETAB = 'p-2 transition-all w-1/3 active:transition-all bg-azulMarino text-white rounded'

  const INACTIVETAB = 'p-2 transition-all w-1/3 active:transition-all'



  return (
    <button onClick={onClick} disabled={isActive} className={`${isActive ? ACTIVETAB : INACTIVETAB}    `} type='button'>{text}</button>
  )
}

export default ButtonTabs