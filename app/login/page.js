'use client'
import React from 'react'
import Button from '../components/Button'
import TextField from '../components/TextField'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { fugazOne } from '../utils/fuentes'
const Page = () => {

  const router = useRouter()

  return (
    <div>

      <div className=' bg-azulMarino w-full h-[300px]'>
        <div className="flex flex-col pl-[30px] pt-[40px]">
          <Image alt="Imagen circular con simbolo de dolar" className="relative left-[80px]" width={39} height={39} src={'./logoIcon.svg'}></Image>
          <h1 className={`text-Blanco text-[46px] ${fugazOne.className}`}>FINAPP</h1>
        </div>
        <div className='flex justify-between'>
          <Image alt="Imagen de login1" className="relative bottom-[35px]" width={100} height={100} src={'./layer1.svg'}></Image>

          <Image alt="Imagen de login2" className="relative bottom-[60px]" width={164} height={164} src={'./layer2.svg'}></Image>
        </div>
      </div>
      <div className='p-5 gap-[50px] min-h-[550px] flex flex-col items-center justify-center animate-fade-aparecer'>
        <p className='font-semibold text-[24px] text-azulMarino'>Bienvenido de vuelta!</p>

        <div className='flex flex-col gap-3 w-full max-w-[700px]'>
          <TextField type='email' label={'Correo electronico'} />
          <TextField type='password' label={'Contraseña'} />

          <p className='text-Gris text-right w-full text-[12px] '>Contraseña olvidada?</p>
        </div>

        <div className='flex flex-col md:flex-row gap-[15px]'>
          <Button onClick={() => router.push('/home')} value={'Iniciar sesion'} type='contained' />

        </div>

        <p className='text-azulMarino'>No tienes cuenta? <span onClick={() => router.push('/register')} className='text-azulMarino font-medium'>Registrate</span></p>
      </div>
    </div>
  )
}

export default Page