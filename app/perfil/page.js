'use client'
import React from 'react'
import PersonIcon from '@mui/icons-material/Person';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import CardProfile from '../components/CardProfile';
const Page = () => {
  return (
    <div className='p-5 min-h-[760px] bg-[#F9FAFC]'>

      {/* Cuenta */}
      <div className='flex flex-col animate-fade-aparecer bg-[#F9FAFC]'>
        <p className='text-azulMarino text-[18px] font-medium mb-'>Cuenta</p>
        <div className='mt-[20px] mb-[20px]'>
          <div className='rounded-xl flex h-[80px] items-center justify-between drop-shadow-sm bg-white p-2'>
            <div className='p-2 items-center flex justify-center h-[50px] w-[50px] rounded-full bg-[#F1EDFF]'>
              <PersonIcon className='text-azulMarino text-[30px]' />
            </div>
            <div className='flex flex-col items-start'>
              <p className='text-azulMarino font-medium '>Carlos Ternera</p>
              <p className='text-[12px]'>Carlosternera46@gmail.com</p>
            </div>
            <p className='p-1 border-2 text-[14px] border-azulMarino rounded-3xl w-[80px] text-center'>Basic</p>
          </div>
        </div>

        <p className='text-azulMarino text-[18px] font-medium mb-'>Configuraciones</p>
        <div className='flex mt-[20px] gap-4 flex-col'>

          <CardProfile onClick={() => console.log('Hola mundo')} Icon={PersonIcon} text={'Cambiar informacion personal'} />

          <CardProfile Icon={LockIcon} text={'Cambiar contraseña'} />

          <CardProfile Icon={EmailIcon} text={'Cambiar correo electronico'} />

        </div>
        <p className='text-azulMarino mt-[20px] text-[18px] font-medium'>Mas configuraciones</p>

        <div className='flex flex-col mt-[20px]'>
          <CardProfile Icon={AccountBalanceIcon} text={'Vault de usuarios y contraseña '} />
        </div>


      </div>


    </div >
  )
}

export default Page