import Image from 'next/image'
import React from 'react'
import useModal from '../customHooks/useModa'
import { Box, Modal } from '@mui/material'
import TextField from './TextField'
import Button from './Button'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

const CardInOut = () => {

  const { closeModal, isOpen, openModal } = useModal()
  return (
    <div className={'p-[10px]'} onClick={() => openModal()}>
      <div className='flex justify-between'>
        <div className='flex h-[55px] gap-[15px] '>
          <div className='flex items-center justify-center rounded bg-[#F2F2F2] w-[40px] h-[40px]'>
            <Image width={15} height={20} alt='uparrow' src={'/songicon.svg'}></Image>
          </div>
          <div>
            <p className='text-[16px] text-azulMarino font-medium'>Spotify Subscr.</p>
            <p className='text-gray-300 text-[12px]'>Subscription</p>
          </div>

        </div>
        <div>
          <p className='text-red-400 text-[16px] text-right'>-$144.00</p>
          <p className='text-gray-300 text-[12px] text-right'>18 Sept 2019</p>
        </div>
      </div>
      {/* Divider */}
      <div className='h-[1px] mt-[5px] mb-[5px] bg-gray-100'>
      </div>

      <Modal sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }} open={isOpen} onClose={closeModal}>
        <div className='p-[20px] overflow-scroll w-11/12 h-5/6 bg-white'>


          <Box display={'flex'} component={'button'} onClick={() => closeModal()} flexDirection={'row'} marginBottom={'20px'} alignItems={'center'} gap={'10px'} >
            <KeyboardArrowLeftIcon />
            <p className='text-azulMarino text-[18px] font-medium '>Detalle para transaccion de <b>pago</b></p>
          </Box>
          <form>
            <TextField label={'Fecha'} defaultValue={'2019-09-18'} type='date' />
            <TextField label={'Importe'} defaultValue='144' type='number' />
            <TextField label={'Titulo'} defaultValue='Spotify Subscr.' type='text' />
            <TextField label={'Descripcion'} defaultValue='Subscription' type='text' />

            <div>
              <p className='text-GrisLabel text-[12px] mb-1'>Categoria</p>
              <select required defaultValue={'Entretenimiento'} className='w-full focus:bg-white h-[48px] placeholder:font-light p-[10px] text-NegroInputs outline-1 outline-Gris rounded bg-[#F7F7F7]'>
                <option >Comida</option>
                <option>Entretenimiento</option>
                <option>Transporte</option>
                <option>Cultura</option>
                <option>Regalos</option>
                <option>Educacion</option>
                <option>Ropa</option>
                <option>Mantenimiento del hogar</option>
                <option>Productos de belleza</option>
                <option>Otro</option>
              </select>
            </div>

            <div>
              <p className='text-GrisLabel text-[12px] mb-1'>Cuenta</p>
              <select required className='w-full focus:bg-white h-[48px] placeholder:font-light p-[10px] text-NegroInputs outline-1 outline-Gris rounded bg-[#F7F7F7]'>
                <option >Cuenta bancaria</option>
                <option>Efectivo</option>
                <option>Tarjeta de credito</option>
              </select>
            </div>
            <div className='flex items-center justify-center gap-5 flex-col mt-[40px]'>
              <Button value={'Editar'} type='contained' />
              <Button value={'Eliminar'} />
            </div>

          </form>
        </div>
      </Modal>
    </div>
  )
}

export default CardInOut