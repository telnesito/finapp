'use client'

import React, { useState } from 'react'
import Transacciones from '../components/Transacciones'
import ButtonTabs from '../components/ButtonTabs'
import CardDebts from '../components/CardDebts'
import Tabs from '../components/Tabs'

const Page = () => {
  const [optionModal, setOptionModal] = useState(0)
  return (
    <div className='bg-[#F9FAFC] pl-[20px] pt-[20px] pr-[20px]'>

      <p className='text-center mt-10 font-medium text-azulMarino text-[16px]'>Deudas</p>
      <div className='mt-10 bg-white'>
        <Tabs>
          {['Todas', 'Pagadas', 'Sin pagar'].map((value, index) => <ButtonTabs indexTab={optionModal}
            onClick={() => setOptionModal(index)} isActive={index === optionModal} key={index} text={value} />)}
        </Tabs>
        <div className='mt-4'>
          {optionModal === 0 ? <Transacciones>
            <CardDebts description={'Subscripcion mensual'} title={'Spotify Sub.'} total={'-7.00'} date={'11 Oct 2021'} />
            <CardDebts description={'Mensualidad Cantv'} completada={true} title={'Internet.'} total={'50.00'} date={'25 Mayo 2024'} />

          </Transacciones>
            : optionModal === 1 ? <Transacciones>
              <CardDebts description={'Mensualidad Cantv'} completada={true} title={'Internet.'} total={'50.00'} date={'25 Mayo 2024'} />

            </Transacciones>
              : <Transacciones>
                <CardDebts description={'Subscripcion mensual'} title={'Spotify Sub.'} total={'-7.00'} date={'11 Oct 2021'} />

              </Transacciones>}
        </div>
      </div>
    </div>
  )
}

export default Page