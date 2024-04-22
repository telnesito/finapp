'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import Transacciones from '../components/Transacciones'
import Modal from '../components/Modal'
import useModal from '../customHooks/useModa'
import ButtonTabs from '../components/ButtonTabs'
import Tabs from '../components/Tabs'
import { TRANS_OPCIONES } from '../utils/constantes'
import Ingresos from '../components/Ingresos'
import Pagos from '../components/Pagos'
import Transferencias from '../components/Transferencias'
import { AiOutlineArrowLeft } from "react-icons/ai";
const Page = () => {
  const { isOpen, openModal, closeModal, isClosing } = useModal()
  const [optionModal, setOptionModal] = useState(0)
  return (
    <div className={`bg-[#F9FAFC] ${isOpen ? 'overflow-hidden' : ''} h-screen`}>
      <Modal closeModal={closeModal} isClosing={isClosing} isOpen={isOpen}>
        <button onClick={closeModal} className='flex items-center gap-2 mb-3'>
          <AiOutlineArrowLeft />
          <p>
            {
              optionModal === 0 ? 'Ingresos' : optionModal === 1 ? 'Pagos' : 'Transferencias'
            }</p>
        </button>
        <Tabs>
          {TRANS_OPCIONES.map((value, index) => <ButtonTabs indexTab={optionModal}
            onClick={() => setOptionModal(index)} isActive={index === optionModal} key={index} text={value} />)}
        </Tabs>
        {optionModal === 0 ? <Ingresos />
          : optionModal === 1 ? <Pagos />
            : <Transferencias />}
      </Modal>
      <div className={` bg-azulMarino w-full h-[260px]`}>
        <Image className='absolute w-full' width={500} height={330} src={'/bgHome.svg'} alt='Hola'></Image>
        <div className="flex flex-col gap-[40px] pl-[30px] pt-[40px]">
          <p className='text-white font-medium text-[18px]'>Alexander Michael</p>

          <div className='mr-[30px] flex items-center justify-between'>
            <div>
              <p className='text-white text-[14px]'>Balance disponible</p>
              <p className='text-white text-[36px] '>$8.420,00</p>
            </div>
            <button type='button' onClick={openModal} className='z-10 flex items-center justify-center rounded-md active:bg-[#ffffff40] bg-[#ffffff30] w-[45px] h-[45px]'>
              <Image width={16} height={16} alt='abrir modal de opciones' src={'/plusicon.svg'}></Image>
            </button>
          </div>
        </div>

        <div className='mr-[30px] m-[15px] ml-[30px]  h-[1px] bg-[#ffffff15]'>
        </div>
        <div className='pl-[30px]  flex gap-[10px] items-center'>
          <div className='flex items-center justify-center rounded bg-[#ffffff20] w-[30px] h-[30px]'>
            <Image width={10} height={10} alt='uparrow' src={'/upArrow.svg'}></Image>
          </div>
          <p className='text-white text-[14px] '>Aumento de 4% desde el mes pasado</p>
        </div>
      </div>

      {/* Transacciones recientes */}
      <div className='p-5 min-h-[490px] flex flex-col animate-fade-aparecer bg-[#F9FAFC]'>
        <div className='flex justify-between'>
          <p className='text-azulMarino font-medium'>Transacciones recientes</p>
          <p className='text-azulMarino font-semibold'>Ver todas</p>
        </div>
        <Transacciones />
      </div>
      {/* Objetivos */}
      <div className='pl-[20px] pr-[20px] min-h-[600px] flex flex-col animate-fade-aparecer bg-[#F9FAFC]'>
        <div className='flex justify-between'>
          <p className='text-azulMarino font-medium'>Lista de deseos</p>
          <p className='text-azulMarino font-semibold'>Ver todas</p>
        </div>
        <Transacciones />
      </div>


    </div>
  )
}

export default Page