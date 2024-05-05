'use client'

import React, { useState } from 'react'
import Transacciones from '../components/Transacciones'
import ButtonTabs from '../components/ButtonTabs'
import Tabs from '../components/Tabs'
import BackPage from '../components/BackPage'
import CardInOut from '../components/CardInOut'

const Page = () => {
  const [optionModal, setOptionModal] = useState(0)
  return (
    <div className='bg-[#F9FAFC] pl-[20px] pt-[20px] pr-[20px]'>

      <p className='text-center mt-10 font-medium text-azulMarino text-[16px]'>Historial</p>
      <div className='mt-10 bg-white'>
        <Tabs>
          {['Todas', 'Ingresos', 'Pagos'].map((value, index) => <ButtonTabs indexTab={optionModal}
            onClick={() => setOptionModal(index)} isActive={index === optionModal} key={index} text={value} />)}
        </Tabs>
        <div className='mt-4'>
          <BackPage destino={'home'} paginaActual={'Transacciones'}></BackPage>
          {optionModal === 0 ? <Transacciones>
            <CardInOut />
            <CardInOut />
            <CardInOut />
            <CardInOut />
            <CardInOut />
          </Transacciones>
            : optionModal === 1 ? <Transacciones >
              <CardInOut />
              <CardInOut />
              <CardInOut />

            </Transacciones>
              : <Transacciones>
                <CardInOut />
                <CardInOut />
                <CardInOut />
                <CardInOut />

              </Transacciones>}
        </div>
      </div>
    </div>
  )
}

export default Page