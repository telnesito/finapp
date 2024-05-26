'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Transacciones from '../components/Transacciones'
import useModal from '../customHooks/useModa'
import ButtonTabs from '../components/ButtonTabs'
import Tabs from '../components/Tabs'
import { TRANS_OPCIONES } from '../utils/constantes'
import Ingresos from '../components/Ingresos'
import Pagos from '../components/Pagos'
import Transferencias from '../components/Transferencias'
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useRouter } from 'next/navigation'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import CardInOut from '../components/CardInOut'
import CardObjetive from '../components/CardObjetive'
import CardDebts from '../components/CardDebts'
import { obtenerUsuario } from '../firebase/auth/currentSesion'
import { getUserProfile } from '../firebase/firestore/getProfileFromDb'
import SkeletonLoad from '../components/Skeleton'
import { useUser } from '../customHooks/UserContext'
import { obtenerTransacciones } from '../firebase/firestore/getTransaction'
import { obtenerObjetivos } from '../firebase/firestore/getObjetives'
import { obtenerDeudas } from '../firebase/firestore/getDeudas'
import { Modal } from '@mui/material'
const Page = () => {


  const { isOpen, openModal, closeModal, isClosing } = useModal()
  const [optionModal, setOptionModal] = useState(0)
  const [userData, setUserData] = useState(obtenerUsuario())

  const { userProfile, setUserProfile } = useUser()
  const [objetivos, setObjetivos] = useState([])
  const [transacciones, setTransacciones] = useState([])
  const [deudas, setDeudas] = useState([])
  const router = useRouter()

  useEffect(() => {
    if (!userData) {
      router.push('/login');
    } else {
      const unsub = obtenerTransacciones(userData.uid, (transaccionesData) => {
        setTransacciones(transaccionesData);
      });

      const obj = obtenerObjetivos(userData.uid, (objetivosData) => {
        setObjetivos(objetivosData);
      });

      const deudas = obtenerDeudas(userData.uid, (deudaData) => {
        setDeudas(deudaData);

        // Cleanup subscription on unmount
      })
    }
    const profile = async () => {
      const userFromFireStore = await getUserProfile(userData?.uid)
      setUserProfile(userFromFireStore)
    }
    profile()

  }, [userData])

  console.log(transacciones)
  return (
    <div className={`bg-[#F9FAFC] ${isOpen ? 'overflow-hidden' : ''} h-screen`}>
      <Modal open={isOpen} onClose={closeModal} className='flex items-center justify-center'>
        <div className='bg-white p-[20px] rounded-lg overflow-scroll w-11/12 h-5/6'>
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
        </div>
      </Modal>
      {userProfile?.username ? <>

        <div className={` bg-azulMarino w-full h-[260px]`}>
          <Image className='absolute w-svw' width={500} height={330} src={'/bgHome.svg'} alt='Hola'></Image>
          <div className="flex flex-col gap-[40px] pl-[30px] pt-[40px]">
            {userData &&
              <p className='text-white font-medium text-[18px]'>{userProfile.username}</p>

            }

            <div className='mr-[30px] flex items-center justify-between'>
              <div>
                <p className='text-white text-[14px]'>Balance disponible</p>
                <p className='text-white text-[36px] '>${userProfile.balance_general}</p>
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
              <ArrowDownwardIcon className='text-white' fontSize='small' />
            </div>
            <p className='text-white text-[14px] '>Te estas quedando limpio compadre</p>
          </div>
        </div>
        {transacciones.length === 0 && deudas.length === 0 && objetivos.length === 0 ? <div className='flex flex-col items-center justify-center mt-[50px] p-[20px]'>
          <Image alt='Mano con cartel marcando un error' width={300} height={300} src={'Error.svg'} />

          <p className='text-center text-azulMarino text-[20px] font-semibold '>Aun no has registrado ningun movimiento en FINAPP. Click en el icono + para empezar.</p>

        </div> :
          <div className='flex flex-col pb-[50px] h-auto'>

            {transacciones.length > 0 &&

              <div className='p-5 min-h-[460px] flex flex-col animate-fade-aparecer bg-[#F9FAFC]'>
                <div className='flex justify-between'>
                  <p className='text-azulMarino font-medium'>Transacciones recientes</p>
                  <button onClick={() => router.push('historial')} className='text-azulMarino font-semibold z-20'>Ver todas</button>
                </div>

                <Transacciones>
                  {transacciones
                    .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
                    .slice(0, 5)
                    .map(({ titulo, id, descripcion, fecha, categoria, importe, cuenta, tipo }, index) =>
                      <CardInOut id={id} tipo={tipo} account={cuenta} title={titulo} description={descripcion} date={fecha} amounth={importe} category={categoria} key={id} ></CardInOut>
                    )}
                </Transacciones>
              </div>
            }
            {/* Objetivos */}

            {objetivos.length > 0 &&
              <div className='pl-[20px] pr-[20px] pt-5 min-h-[270px] flex flex-col animate-fade-aparecer bg-[#F9FAFC]'>
                <div className='flex justify-between'>
                  <p className='text-azulMarino font-medium'>Lista de objetivos</p>
                  <button onClick={() => router.push('objetivos')} className='text-azulMarino font-semibold'>Ver todas</button>

                </div>
                <Transacciones>
                  {objetivos
                    .slice(0, 5)
                    .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
                    .map(({ descripcion, titulo, montoActual, meta, fecha, categoria, id, estado, porcentaje }) =>

                      <CardObjetive key={id} description={descripcion} total={meta} id={id} state={estado} title={titulo} category={categoria} current={montoActual} percentaje={porcentaje} date={fecha} />
                    )}
                </Transacciones>

              </div>

            }

            {deudas.length > 0 &&

              <div className='pl-[20px]  pt-5  pr-[20px] pb-[40px] flex flex-col animate-fade-aparecer bg-[#F9FAFC]'>
                <div className='flex justify-between'>
                  <p className='text-azulMarino font-medium'>Lista de deudas</p>
                  <button onClick={() => router.push('deudas')} className='text-azulMarino font-semibold'>Ver todas</button>

                </div>
                <Transacciones>
                  {deudas
                    .slice(0, 5)
                    .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
                    .map(({ descripcion, titulo, monto, fecha, categoria, id, completada }) =>

                      <CardDebts key={id} description={descripcion} total={monto} id={id} completada={completada} title={titulo} category={categoria} date={fecha} />
                    )}
                </Transacciones>

              </div>
            }
          </div>
        }

      </>
        :
        <SkeletonLoad />

      }

    </div>
  )
}

export default Page