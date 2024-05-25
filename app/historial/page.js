'use client'

import React, { useEffect, useState } from 'react'
import Transacciones from '../components/Transacciones'
import ButtonTabs from '../components/ButtonTabs'
import Tabs from '../components/Tabs'
import BackPage from '../components/BackPage'
import CardInOut from '../components/CardInOut'
import { obtenerTransacciones } from '../firebase/firestore/getTransaction'
import { obtenerUsuario } from '../firebase/auth/currentSesion'
import { useRouter } from 'next/navigation'
import { useUser } from '../customHooks/UserContext'

const Page = () => {
  const [optionModal, setOptionModal] = useState(0)
  const [userData, setUserData] = useState(obtenerUsuario())
  const [transacciones, setTransacciones] = useState([])
  const router = useRouter()

  useEffect(() => {
    if (!userData) {
      router.push('/login');
    } else {
      const unsub = obtenerTransacciones(userData.uid, (transaccionesData) => {
        setTransacciones(transaccionesData);
      });

      // Cleanup subscription on unmount
    }

  }, [userData])


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
            {transacciones
              .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
              .map(({ titulo, id, descripcion, tipo, fecha, categoria, importe, cuenta }, index) =>
                <CardInOut tipo={tipo} id={id} account={cuenta} title={titulo} description={descripcion} date={fecha} amounth={importe} category={categoria} key={id} ></CardInOut>
              )}
          </Transacciones>
            : optionModal === 1 ? <Transacciones >
              {transacciones
                .filter(({ tipo }) => tipo === 1)
                .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
                .map(({ titulo, tipo, id, descripcion, fecha, categoria, importe, cuenta, }, index) =>
                  <CardInOut tipo={tipo} id={id} account={cuenta} title={titulo} description={descripcion} date={fecha} amounth={importe} category={categoria} key={id} ></CardInOut>
                )}
            </Transacciones>
              : <Transacciones>
                {transacciones
                  .filter(({ tipo }) => tipo === 2)
                  .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
                  .map(({ titulo, descripcion, fecha, categoria, id, tipo, importe, cuenta }, index) =>
                    <CardInOut account={cuenta} tipo={tipo} id={id} title={titulo} description={descripcion} date={fecha} amounth={importe} category={categoria} key={id} ></CardInOut>
                  )}
              </Transacciones>}
        </div>
      </div>
    </div>
  )
}

export default Page