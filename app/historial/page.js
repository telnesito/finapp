'use client'

import React, { useState } from 'react'
import Transacciones from '../components/Transacciones'
import { Tabs } from '@mui/material'
import { Button } from '@mui/base'
import ButtonTabs from '../components/ButtonTabs'
import BackPage from '../components/BackPage'

const Page = () => {
  const [optionModal, setOptionModal] = useState(0)
  return (
    <div className='bg-[#F9FAFC] pl-[20px] mt-[20px] pr-[20px]'>

      <p className='text-center mt-10 font-medium text-azulMarino text-[16px]'>Historial</p>
      <div className='mt-10 bg-white'>
        <Tabs>
          {['Todas', 'Ingresos', 'Pagos'].map((value, index) => <ButtonTabs indexTab={optionModal}
            onClick={() => setOptionModal(index)} isActive={index === optionModal} key={index} text={value} />)}
        </Tabs>
        <div className='mt-4'>
          <BackPage destino={'home'} paginaActual={'Transacciones'}></BackPage>
          {optionModal === 0 ? <Transacciones />
            : optionModal === 1 ? <Transacciones />
              : <Transacciones />}
        </div>
      </div>
    </div>
  )
}

export default Page