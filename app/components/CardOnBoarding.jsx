'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import Button from './Button'
import { onBoarding } from '../utils/onBoardingText'
import { useRouter } from 'next/navigation'
const CardOnBoarding = () => {
  const [index, setIndex] = useState(0)
  const router = useRouter()

  const handlePrimary = () => {

    if (index !== 2) {
      setIndex((prev) => prev + 1)
    } else {
      router.push('/register')
    }
  }

  const handleSecondary = () => {

    if (index !== 2) {
      setIndex(2)
    } else {
      router.push('/login')
    }
  }
  return (
    <div className='flex flex-col items-center justify-center gap-6'>
      <Image alt='Imagen de onboard 1' width={252} height={227} src={onBoarding[index].image}>

      </Image>
      <h1 className='font-semibold text-center text-azulMarino text-[30px] '>{onBoarding[index].title}</h1>
      <p className='text-center text-Gris'>{onBoarding[0].descripcion}</p>

      <div className=' sm:flex-col flex flex-col lg:flex-row'>
        <Button type='contained' onClick={handlePrimary} value={onBoarding[index].primaryText} />

        <Button type='text' onClick={handleSecondary} value={onBoarding[index].secondaryText} />
      </div>
    </div>
  )
}

export default CardOnBoarding