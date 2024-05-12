import React from 'react'
import Button from './Button'
import { Modal } from '@mui/material'
import Image from 'next/image'

const ErrorModal = ({ isOpen, closeModal, openModal, text }) => {
  return (
    <Modal sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }} open={isOpen} onClose={closeModal}>
      <div className='p-[20px] overflow-scroll flex flex-col gap-3 items-center justify-center w-11/12 h-[600px] rounded-xl bg-white'>
        <Image alt='Mano con cartel marcando un error' width={300} height={300} src={'Error.svg'} />
        <div className='flex flex-col gap-2'>
          <p className='text-center text-azulMarino text-[24px] font-semibold '>Ha ocurrido un error</p>
          <p className='text-center mb-6'>{text}</p>

          <Button onClick={closeModal} type='contained' value={'Intentar de nuevo'} />
        </div>

      </div>
    </Modal>
  )
}

export default ErrorModal