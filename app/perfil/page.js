'use client'
import React, { useState } from 'react'
import PersonIcon from '@mui/icons-material/Person';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import LockIcon from '@mui/icons-material/Lock';
import { useRouter } from 'next/navigation'

import EmailIcon from '@mui/icons-material/Email';
import CardProfile from '../components/CardProfile';
import Button from '../components/Button';
import { cerrarSesion } from '../firebase/auth/logOut';
import { obtenerUsuario } from '../firebase/auth/currentSesion';
const Page = () => {
  const router = useRouter()
  const [userData,] = useState(obtenerUsuario())

  // if (!userData) router.push('/login')
  return (

    <div className='p-5 min-h-[760px] bg-[#F9FAFC]'>

      {/* Cuenta */}

      <div className='flex flex-col animate-fade-aparecer bg-[#F9FAFC]'>
        <p className='text-azulMarino text-[18px] font-medium mb-'>Cuenta</p>
        <div className='mt-[20px] mb-[20px]'>
          <div className='rounded-xl flex h-[80px] items-center justify-between drop-shadow-sm bg-white p-2'>
            {userData && <>

              <div className='p-2 items-center flex justify-center h-[50px] w-[50px] rounded-full bg-[#F1EDFF]'>
                <PersonIcon className='text-azulMarino text-[30px]' />
              </div>
              <div className='flex flex-col items-start'>
                <p className='text-azulMarino font-medium '>{userData.displayName}</p>
                <p className='text-[12px]'>{userData.email}</p>
              </div>
              <p className='p-1 border-2 text-[14px] border-azulMarino rounded-3xl w-[80px] text-center'>Basic</p>
            </>
            }
          </div>
        </div>


        <p className='text-azulMarino text-[18px] font-medium mb-'>Configuraciones</p>
        <div className='flex mt-[20px] gap-4 flex-col'>

          <CardProfile Icon={PersonIcon} onClick={() => router.push('perfil/informacion_personal')} text={'Cambiar informacion personal'} />

          <CardProfile Icon={LockIcon} onClick={() => router.push('perfil/password')} text={'Cambiar contraseña'} />

          <CardProfile Icon={EmailIcon} onClick={() => router.push('perfil/correo_electronico')} text={'Cambiar correo electronico'} />

        </div>
        <p className='text-azulMarino mt-[20px] text-[18px] font-medium'>Mas configuraciones</p>

        <div className='flex flex-col mt-[20px]'>
          <CardProfile Icon={AccountBalanceIcon} onClick={() => router.push('vault')} text={'Vault de usuarios y contraseña '} />
        </div>
      </div>

      <div className='flex items-center justify-center mt-[20px]'>
        <Button type='text' onClick={async () => {
          const res = await cerrarSesion()
          console.log(res)
          router.push('/login')
        }

        } value={'Cerrar sesion'} />
      </div>


    </div >
  )
}

export default Page