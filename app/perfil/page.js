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
        <div className='flex mt-[20px] gap-4 flex-col'>

          <CardProfile Icon={PersonIcon} text={'Cambiar informacion personal'} />

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