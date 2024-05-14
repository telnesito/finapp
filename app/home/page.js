'use client'
import React, { useEffect, useState } from 'react'
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
const Page = () => {


  const { isOpen, openModal, closeModal, isClosing } = useModal()
  const [optionModal, setOptionModal] = useState(0)
  const [userData, setUserData] = useState(obtenerUsuario())
  const { userProfile, setUserProfile } = useUser()
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
    const profile = async () => {
      const userFromFireStore = await getUserProfile(userData?.uid)
      setUserProfile(userFromFireStore)
    }
    profile()

  }, [userData])

  console.log(transacciones)
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
      {userProfile?.username ? <>

        <div className={` bg-azulMarino w-full h-[260px]`}>
          <Image className='absolute w-full' width={500} height={330} src={'/bgHome.svg'} alt='Hola'></Image>
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

        {/* Transacciones recientes */}
        <div className='p-5 min-h-[460px] flex flex-col animate-fade-aparecer bg-[#F9FAFC]'>
          <div className='flex justify-between'>
            <p className='text-azulMarino font-medium'>Transacciones recientes</p>
            <button onClick={() => router.push('historial')} className='text-azulMarino font-semibold'>Ver todas</button>
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
        {/* Objetivos */}
        <div className='pl-[20px] pr-[20px] min-h-[270px] flex flex-col animate-fade-aparecer bg-[#F9FAFC]'>
          <div className='flex justify-between'>
            <p className='text-azulMarino font-medium'>Lista de objetivos</p>
            <button onClick={() => router.push('objetivos')} className='text-azulMarino font-semibold'>Ver todas</button>

          </div>
          <Transacciones>
            <CardObjetive description={"Subscripcion mensual"} title={"Spotify Sub."} total={200} current={200} date={"11 Oct 2021"} />
            <CardObjetive description={"Subscripcion mensual"} title={"Spotify Sub."} total={200} current={50} date={"11 Oct 2021"} />

          </Transacciones>

        </div>

        <div className='pl-[20px] pr-[20px] min-h-[400px] flex flex-col animate-fade-aparecer bg-[#F9FAFC]'>
          <div className='flex justify-between'>
            <p className='text-azulMarino font-medium'>Lista de deudas</p>
            <button onClick={() => router.push('deudas')} className='text-azulMarino font-semibold'>Ver todas</button>

          </div>
          <Transacciones>
            <CardDebts description={'Subscripcion mensual'} title={'Spotify Sub.'} total={'-7.00'} date={'11 Oct 2021'} />
            <CardDebts description={'Mensualidad Cantv'} completada={true} title={'Internet.'} total={'50.00'} date={'25 Mayo 2024'} />

          </Transacciones>

        </div>

      </>
        :
        <SkeletonLoad />

      }

    </div>
  )
}

export default Page