'use client'

import React, { useState } from 'react'
import Transacciones from '../components/Transacciones'
import ButtonTabs from '../components/ButtonTabs'
import CardObjetive from '../components/CardObjetive'
import Tabs from '../components/Tabs'
import { Box } from '@mui/material'
import useModal from '../customHooks/useModa'
import AddIcon from '@mui/icons-material/Add';
import Modal from '../components/Modal'
import TextField from '../components/TextField'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import Button from '../components/Button'


const Page = () => {
  const { isOpen, openModal, isClosing, closeModal } = useModal()
  const [optionModal, setOptionModal] = useState(0)
  return (
    <div className='bg-[#F9FAFC] pl-[20px] pt-[20px] pr-[20px]'>
      <Box padding={'15px 15px'} onClick={() => openModal()} component={'button'} position={'fixed'} bottom={'100px'} right={'20px'} display={'flex'} justifyContent={'center'} alignItems={'center'} width={'60px'} height={'60px'} borderRadius={'100%'} bgcolor={'#100D40'}>
        <AddIcon sx={{
          color: 'white',
          fontSize: '30px'
        }} />
      </Box>
      <p className='text-center mt-10 font-medium text-azulMarino text-[16px]'>Objetivos</p>
      <div className='mt-10 bg-white'>
        <Tabs>
          {['Todas', 'Completados', 'En progreso'].map((value, index) => <ButtonTabs indexTab={optionModal}
            onClick={() => setOptionModal(index)} isActive={index === optionModal} key={index} text={value} />)}
        </Tabs>
        <div className='mt-4'>
          {optionModal === 0 ? <Transacciones>
            <CardObjetive description={"Subscripcion mensual"} title={"Spotify Sub."} total={200} current={200} date={"11 Oct 2021"} />
            <CardObjetive description={"Subscripcion mensual"} title={"Spotify Sub."} total={200} current={50} date={"11 Oct 2021"} />

          </Transacciones>
            : optionModal === 1 ? <Transacciones>
              <CardObjetive description={"Subscripcion mensual"} title={"Spotify Sub."} total={200} current={50} date={"11 Oct 2021"} />

            </Transacciones>
              : <Transacciones>
                <CardObjetive description={"Subscripcion mensual"} title={"Spotify Sub."} total={200} current={50} date={"11 Oct 2021"} />
              </Transacciones>}
        </div>

        <Modal isOpen={isOpen} isClosing={isClosing} closeModal={closeModal} >

          <Box display={'flex'} component={'button'} onClick={() => closeModal()} flexDirection={'row'} marginBottom={'20px'} alignItems={'center'} gap={'10px'} >
            <KeyboardArrowLeftIcon />
            <p className='text-azulMarino text-[18px] font-medium '>Agregar Objetivo</p>
          </Box>

          <form>
            <div className='flex flex-col gap-4'>
              <TextField label={'Fecha de pago'} type='date'></TextField>

              <TextField label={'Titulo'} type='text'></TextField>
              <TextField label={'Descripcion'} type='text'></TextField>
              <TextField label={'Total objetivo'} type='number'></TextField>
              <div>
                <p className='text-GrisLabel text-[12px] mb-1'>Categoria</p>
                <select required className='w-full focus:bg-white h-[48px] placeholder:font-light p-[10px] text-NegroInputs outline-1 outline-Gris rounded bg-[#F7F7F7]'>
                  <option >Tarjeta de credito</option>
                  <option>Servicios de streaming</option>
                  <option>Internet</option>
                  <option>Agua</option>
                  <option>Electricidad</option>
                  <option>Otro</option>

                </select>
              </div>
              <div className='flex mt-5 items-center justify-center'>
                <Button value={'Agregar'} type='contained' />
              </div>
            </div>



          </form>


        </Modal>
      </div>
    </div>
  )
}

export default Page